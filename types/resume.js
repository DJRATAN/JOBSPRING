// Resume.js

// Represents a resume object
// Used for parsing, displaying, and scoring
// Optional: You can use JSDoc types for better developer experience

// Example object shape (for reference)
/*
{
  id: '',
  name: '',
  fileName: '',
  uploadDate: new Date(),
  content: '',
  file: File,
  base64Data: '',
  error: '',
  partial: false,
  processingMetadata: {
    processingTime: 0,
    parsingMethod: '',
    contentConfidence: 0
  }
}
*/

export const exampleResume = {
  id: '',
  name: '',
  fileName: '',
  uploadDate: new Date(),
  content: '',
};

// ResumeScoreDetail example shape
export const exampleResumeScoreDetail = {
  category: '',
  score: 0,
  matches: [],
  misses: [],
  feedback: '',
};

// ResumeScore example shape
export const exampleResumeScore = {
  resumeId: '',
  resumeName: '',
  fileName: '',
  overallScore: 0,
  keywordMatch: 0,
  skillsMatch: 0,
  experienceMatch: 0,
  educationMatch: 0,
  evaluationDetails: [],
  scoreDetails: [],
  partial: false,
  hadErrors: false,
};

// JobDescription example shape
export const exampleJobDescription = {
  id: '',
  title: '',
  company: '',
  department: '',
  description: '',
  skills: [],
  requirements: [],
  responsibilities: [],
  location: '',
  salary: '',
  experienceRequired: '',
  employmentType: '',
  applicationDeadline: new Date(),
  postDate: new Date(),
  contactInfo: '',
  preprocessed: false,
  processingTimestamp: '',
};

// ResumeAnalysisRequest example shape
export const exampleResumeAnalysisRequest = {
  jobDescription: exampleJobDescription,
  resumes: [exampleResume],
};

// FailedFile example shape
export const exampleFailedFile = {
  name: '',
  error: '',
};

// ScoreAnalysis example shape
export const exampleScoreAnalysis = {
  overallAssessment: '',
  strengths: [],
  weaknesses: [],
  recommendations: [],
};
