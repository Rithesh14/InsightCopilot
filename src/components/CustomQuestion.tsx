import { useState, useRef, useEffect } from 'react';

interface CustomQuestionProps {
  onSubmit: (query: string) => void;
  loading: boolean;
  disabled: boolean;
  customAnswer: {
    query: string;
    answer: string;
    context: string;
  } | null;
}

const CustomQuestion: React.FC<CustomQuestionProps> = ({ 
  onSubmit, 
  loading, 
  disabled,
  customAnswer
}) => {
  const [query, setQuery] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const suggestedQuestions = [
    "What is the main topic of the document?",
    "Can you summarize the key points?",
    "What are the main data points in the tables?",
    "Who is the author or creator of the document?",
    "What are the key dates mentioned?"
  ];
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [query]);
  
  const handleSubmit = () => {
    if (query.trim()) {
      onSubmit(query);
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setQuery(question);
  };
  
  return (
    <>
      <div className="mt-10 card">
        <label className="block text-[var(--text-primary)] font-semibold mb-4 text-lg" htmlFor="query-input">
          Ask a Custom Question
        </label>
        <textarea
          id="query-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your question (e.g., What are the key findings?)"
          className="w-full glass-input mb-4 min-h-[100px]"
          aria-label="Custom question input"
          ref={textareaRef}
        />
        <div className="mb-4">
          <p className="text-[var(--text-primary)] font-semibold mb-2">Suggested Questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="px-3 py-1 bg-blue-500 bg-opacity-20 hover:bg-opacity-40 text-[var(--text-primary)] rounded-full text-sm transition duration-200 transform hover:scale-105"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || disabled || !query}
          className={`w-full btn-primary ${loading || disabled || !query ? 'btn-disabled' : ''}`}
          data-tooltip="Submit your custom question"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Answering...
            </span>
          ) : "Submit Query"}
        </button>
      </div>

      {customAnswer && (
        <div className="mt-10 card animate-in">
          <h2 className="text-2xl font-semibold mb-6">Custom Question</h2>
          <div className="p-6">
            <p className="font-semibold text-[var(--text-primary)]">Q: {customAnswer.query}</p>
            <p className="text-[var(--text-secondary)]">A: {customAnswer.answer}</p>
            <details className="mt-2">
              <summary className="text-blue-400 cursor-pointer">View Context</summary>
              <p className="text-[var(--text-secondary)] bg-[var(--card-bg)] p-2 rounded">{customAnswer.context}</p>
            </details>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomQuestion;