import { GoogleGenerativeAI } from '@google/generative-ai';
import { ExtractedCode, CodeSummary } from '../types/github';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  private createPrompt(extractedCode: ExtractedCode): string {
    const { repository, files } = extractedCode;
    
    // Create a condensed version of the code for analysis
    const codeSnippets = files.slice(0, 20).map(file => {
      const truncatedContent = file.content.length > 2000 
        ? file.content.substring(0, 2000) + '...[truncated]'
        : file.content;
      
      return `
File: ${file.path} (${file.language})
${truncatedContent}
---`;
    }).join('\n');

    return `
Analyze this GitHub repository and provide a comprehensive summary in JSON format.

Repository: ${repository.full_name}
Description: ${repository.description || 'No description provided'}
Primary Language: ${repository.language || 'Not specified'}
Stars: ${repository.stargazers_count}
Forks: ${repository.forks_count}

Code Files (${files.length} total files):
${codeSnippets}

Please provide a JSON response with the following structure:
{
  "overview": "A comprehensive overview of what this project does and its main purpose",
  "keyFeatures": ["feature1", "feature2", "feature3"],
  "techStack": ["technology1", "technology2", "technology3"],
  "projectStructure": "Description of how the project is organized",
  "gettingStarted": "Brief guide on how to get started with this project",
  "mainFiles": ["important_file1.js", "important_file2.py"],
  "complexity": "Low|Medium|High",
  "estimatedReadingTime": "X minutes"
}

Focus on:
1. The main functionality and purpose
2. Key technologies and frameworks used
3. Architecture and project structure
4. Important files and their roles
5. Overall complexity level
6. How someone could get started with this project

Provide only the JSON response, no additional text.`;
  }

  async summarizeCode(extractedCode: ExtractedCode): Promise<CodeSummary> {
    try {
      const prompt = this.createPrompt(extractedCode);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse the JSON response
      const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
      const summary = JSON.parse(cleanedText);
      
      // Validate the response structure
      const requiredFields = ['overview', 'keyFeatures', 'techStack', 'projectStructure', 'gettingStarted', 'mainFiles', 'complexity', 'estimatedReadingTime'];
      const missingFields = requiredFields.filter(field => !(field in summary));
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      return summary as CodeSummary;
    } catch (error) {
      console.error('Error generating summary:', error);
      
      // Fallback summary
      return {
        overview: `This is a ${extractedCode.repository.language || 'software'} project with ${extractedCode.files.length} files. ${extractedCode.repository.description || 'No description available.'}`,
        keyFeatures: ['Code analysis pending', 'Multiple file types detected'],
        techStack: [extractedCode.repository.language || 'Unknown'].filter(Boolean),
        projectStructure: `The project contains ${extractedCode.files.length} files organized across multiple directories.`,
        gettingStarted: 'Clone the repository and follow the README instructions.',
        mainFiles: extractedCode.files.slice(0, 5).map(f => f.path),
        complexity: 'Medium' as const,
        estimatedReadingTime: `${Math.ceil(extractedCode.files.length / 10)} minutes`
      };
    }
  }
}

export const geminiService = new GeminiService();