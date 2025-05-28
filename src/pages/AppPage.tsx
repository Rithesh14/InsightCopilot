import { useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import AnalysisResults from '../components/AnalysisResults';
import CustomQuestion from '../components/CustomQuestion';

interface TableData {
  [key: string]: string | number;
}

interface AnswerData {
  query: string;
  answer: string;
  context: string;
}

interface OutputData {
  summary: string;
  tables?: TableData[][];
  answers?: AnswerData[];
}

const AppPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [output, setOutput] = useState<OutputData | null>(null);
  const [customAnswer, setCustomAnswer] = useState<AnswerData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  
  const handleFilesAdded = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
    setError('');
  };
  
  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  const handleProcessFiles = async () => {
    if (files.length === 0) {
      setError('Please upload at least one file.');
      return;
    }
    
    setLoading(true);
    setError('');
    setProgress(0);
    
    const formData = new FormData();
    
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} exceeds 10MB limit.`);
        setLoading(false);
        return;
      }
      formData.append('files', file);
    }
    
    try {
      // Mock API call for demonstration
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 10, 95);
          return newProgress;
        });
      }, 500);
      
      // Simulate API response
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setProgress(100);
      
      // Mock data
      const mockOutput: OutputData = {
        summary: "This document is a quarterly financial report for XYZ Corporation. It covers the period ending June 30, 2023. The report includes financial statements, management discussion, and analysis of operations. Key findings indicate a 12% revenue growth compared to the previous quarter, with significant expansion in the APAC region.",
        tables: [
          [
            { "Quarter": "Q1 2023", "Revenue": "$2.4M", "Growth": "8%" },
            { "Quarter": "Q2 2023", "Revenue": "$2.7M", "Growth": "12%" },
            { "Quarter": "Q3 2023 (Projected)", "Revenue": "$3.0M", "Growth": "11%" }
          ]
        ],
        answers: [
          {
            query: "What is the main topic of the document?",
            answer: "The main topic is the quarterly financial report for XYZ Corporation covering Q2 2023.",
            context: "Quarterly Financial Report - XYZ Corporation - Period Ending June 30, 2023"
          },
          {
            query: "What was the revenue growth?",
            answer: "The revenue growth was 12% compared to the previous quarter.",
            context: "Key financial highlights: Revenue increased by 12% compared to Q1 2023, reaching $2.7M for the quarter ending June 30, 2023."
          }
        ]
      };
      
      setOutput(mockOutput);
      setCustomAnswer(null);
      
    } catch (err) {
      setError('Failed to process files. Please try again later.');
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };
  
  const handleQuerySubmit = async (query: string) => {
    if (!query || !output) {
      setError('Please process files and enter a query.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      const mockAnswer: AnswerData = {
        query,
        answer: `Based on the document analysis, ${query.toLowerCase().includes('revenue') 
          ? 'the revenue for Q2 2023 was $2.7M, showing a 12% growth compared to Q1.' 
          : 'the document primarily discusses financial performance for Q2 2023, with specific focus on revenue growth, regional performance, and future projections.'}`,
        context: "Financial Report Q2 2023 - Page 3: Revenue analysis shows Q2 2023 performance at $2.7M with 12% growth. APAC region showed strongest performance with 18% growth year-over-year."
      };
      
      setCustomAnswer(mockAnswer);
    } catch (err) {
      setError('Failed to process your query. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-6 sm:p-8 lg:p-12 relative min-h-screen pb-20">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="card p-8 sm:p-10 lg:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">InsightCopilot: Document Analysis</h1>
        <p className="text-[var(--text-secondary)] mb-8 text-base sm:text-lg">
          Upload PDF, Excel, or image files to extract insights, view summaries, and ask questions.
        </p>
        
        <div className="card mb-8">
          <label className="block text-[var(--text-primary)] font-semibold mb-4 text-lg">Upload Files</label>
          <FileUpload onFilesAdded={handleFilesAdded} />
        </div>
        
        <FileList files={files} onRemoveFile={removeFile} />
        
        <button
          onClick={handleProcessFiles}
          disabled={loading || files.length === 0}
          className={`w-full btn-primary ${loading || files.length === 0 ? 'btn-disabled' : ''}`}
          data-tooltip="Process uploaded files to extract insights"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Processing...
            </span>
          ) : "Process Files"}
        </button>
        
        {loading && (
          <div className="mt-4">
            <div className="w-full bg-[var(--card-border)] rounded-full h-2">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}
        
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        
        <AnalysisResults output={output} />
        
        <CustomQuestion 
          onSubmit={handleQuerySubmit} 
          loading={loading} 
          disabled={!output}
          customAnswer={customAnswer}
        />
        
        <div className="mt-8 text-[var(--text-secondary)] text-sm">
          <p>Need help? Supported formats: PDF, XLSX, JPG, PNG (max 10MB each). Drag and drop files or click to browse.</p>
        </div>
      </div>
      
      <footer className="absolute bottom-6 text-[var(--text-secondary)] text-sm text-center w-full">
        <p>© {new Date().getFullYear()} InsightCopilot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AppPage;