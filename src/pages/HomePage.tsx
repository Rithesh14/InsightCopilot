import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/app');
    }, 500); // Simulate loading for smooth transition
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ 
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.4) 0%, transparent 50%)
        `,
        animation: 'backgroundShift 20s ease-in-out infinite'
      }}></div>
      
      <div className="welcome-card z-10 max-w-3xl w-full mx-4">
        <div className="flex justify-center mb-6">
          <Book className="w-16 h-16 text-white/80" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Welcome to <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">InsightCopilot</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 text-center mb-10 max-w-2xl mx-auto">
          Transform your documents into actionable insights. Upload PDFs, Excel files, or images and unlock powerful AI-driven analysis, summaries, and intelligent answers.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <div className="feature-item">
            <span className="feature-icon">📄</span>
            <span>Smart Document Analysis</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span>Data Extraction</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span>AI-Powered Insights</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <button
            onClick={handleRedirect}
            disabled={isLoading}
            className="cta-button"
            aria-label="Go to document analysis tool"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4" />
                  <path className="opacity-75\" fill="currentColor\" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Loading...
              </span>
            ) : (
              <>
                <span>Get Started</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
          <p className="text-white/60 text-sm mt-4">
            Supports PDF, XLSX, JPG, PNG files up to 10MB
          </p>
        </div>
      </div>
      
      <footer className="absolute bottom-6 text-white/60 text-sm text-center w-full">
        <p>© {new Date().getFullYear()} InsightCopilot. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;