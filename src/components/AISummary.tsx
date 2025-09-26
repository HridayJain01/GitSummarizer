import React from 'react';
import { CodeSummary } from '../types/github';

interface Summaries {
  technicalSummary: CodeSummary;
  nonTechnicalSummary: string;
}

export const AISummary: React.FC<{ summaries: Summaries | null }> = ({ summaries }) => {
  if (!summaries) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Roadmap of Project</h3>
        <p className="text-gray-600">No summary available. Try generating again.</p>
      </div>
    );
  }

  const { technicalSummary, nonTechnicalSummary } = summaries;
  const {
    overview = 'Not available',
    keyFeatures = [],
    techStack = [],
    projectStructure = 'Not available',
    gettingStarted = 'Not available',
    mainFiles = [],
    complexity = 'Unknown',
    estimatedReadingTime = 'Unknown',
    futureScope = 'Not available',
  } = technicalSummary;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Summary of Project</h3>

      {/* Overview */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Overview</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {overview}
        </p>
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Key Features</h4>
        {keyFeatures.length > 0 ? (
          <ul className="list-disc pl-6 text-sm text-gray-800">
            {keyFeatures.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No key features provided.</p>
        )}
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Tech Stack</h4>
        {techStack.length > 0 ? (
          <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
            {techStack.join(', ')}
          </p>
        ) : (
          <p className="text-sm text-gray-600">No tech stack specified.</p>
        )}
      </div>

      {/* Project Structure */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Project Structure</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {projectStructure}
        </p>
      </div>

      {/* Getting Started */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Getting Started</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {gettingStarted}
        </p>
      </div>

      {/* Main Files */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Main Files</h4>
        {mainFiles.length > 0 ? (
          <ul className="list-disc pl-6 text-sm text-gray-800">
            {mainFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No main files listed.</p>
        )}
      </div>

      {/* Complexity */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Complexity</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {complexity}
        </p>
      </div>

      {/* Estimated Reading Time */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Estimated Reading Time</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {estimatedReadingTime}
        </p>
      </div>

      {/* Future Scope */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Future Scope</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {futureScope}
        </p>
      </div>

      <hr className="my-8" />

      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700">Non-Technical Summary</h4>
        <p className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-wrap">
          {nonTechnicalSummary}
        </p>
      </div>
    </div>
  );
};