import { create } from 'zustand';

export const useResumeStore = create((set, get) => ({
  // Current job state
  currentResumeScores: [],
  currentErroredFiles: [],
  currentJobTitle: '',
  currentJobCompany: '',
  currentResumeCount: 0,

  // History of all job analyses
  jobAnalyses: [],

  // Current job actions
  setResumeScores: (scores) => set({ currentResumeScores: scores }),
  setErroredFiles: (erroredFiles) => set({ currentErroredFiles: erroredFiles }),
  setJobInfo: (title, company) => set({ currentJobTitle: title, currentJobCompany: company }),
  setResumeCount: (count) => set({ currentResumeCount: count }),

  // Save current job analysis to history
  addJobAnalysis: () => {
    const {
      currentResumeScores,
      currentErroredFiles,
      currentJobTitle,
      currentJobCompany,
      currentResumeCount,
    } = get();

    if (currentResumeScores.length > 0) {
      const newJobAnalysis = {
        jobId: `job-${Date.now()}`,
        jobTitle: currentJobTitle,
        jobCompany: currentJobCompany,
        resumeScores: [...currentResumeScores],
        erroredFiles: [...currentErroredFiles],
        resumeCount: currentResumeCount,
        timestamp: new Date(),
      };

      set((state) => ({
        jobAnalyses: [...state.jobAnalyses, newJobAnalysis],
      }));
    }
  },

  // Clear current job data
  clearCurrentJob: () =>
    set({
      currentResumeScores: [],
      currentErroredFiles: [],
      currentJobTitle: '',
      currentJobCompany: '',
      currentResumeCount: 0,
    }),

  // Clear all job history
  clearAllJobs: () =>
    set({
      jobAnalyses: [],
      currentResumeScores: [],
      currentErroredFiles: [],
      currentJobTitle: '',
      currentJobCompany: '',
      currentResumeCount: 0,
    }),
}));
