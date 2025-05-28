import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TableData {
  [key: string]: string | number;
}

interface AnswerData {
  query: string;
  answer: string;
  context: string;
}

interface AnalysisResultsProps {
  output: {
    summary: string;
    tables?: TableData[][];
    answers?: AnswerData[];
  } | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ output }) => {
  const [openSections, setOpenSections] = useState({
    summary: true,
    tables: false,
    questions: false
  });
  
  if (!output) return null;
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>
      
      <div className="card animate-in">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => toggleSection('summary')}
        >
          <h3 className="text-lg font-semibold">Summary</h3>
          {openSections.summary ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSections.summary && (
          <div className="p-6 mt-2">
            <p className="text-[var(--text-primary)]">{output.summary}</p>
          </div>
        )}
      </div>
      
      <div className="card animate-in">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => toggleSection('tables')}
        >
          <h3 className="text-lg font-semibold">Extracted Tables</h3>
          {openSections.tables ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSections.tables && (
          <div className="mt-2">
            {output.tables && output.tables.length > 0 ? output.tables.map((table, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-lg font-semibold mb-2">Table {index + 1}</h4>
                <div className="table-container">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {Object.keys(table[0] || {}).map((col) => (
                          <th key={col} className="border border-[var(--card-border)] p-3 text-left bg-white bg-opacity-10 font-semibold text-[var(--text-primary)]">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(row).map((cell, cellIndex) => (
                            <td key={cellIndex} className="border border-[var(--card-border)] p-3 text-left text-[var(--text-primary)]">
                              {String(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )) : <p className="text-[var(--text-secondary)]">No tables extracted.</p>}
          </div>
        )}
      </div>
      
      <div className="card animate-in">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => toggleSection('questions')}
        >
          <h3 className="text-lg font-semibold">Predefined Questions</h3>
          {openSections.questions ? <ChevronUp /> : <ChevronDown />}
        </div>
        
        {openSections.questions && (
          <div className="mt-2">
            {output.answers && output.answers.map((ans, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold text-[var(--text-primary)]">Q: {ans.query}</p>
                <p className="text-[var(--text-secondary)]">A: {ans.answer}</p>
                <details className="mt-2">
                  <summary className="text-blue-400 cursor-pointer">View Context</summary>
                  <p className="text-[var(--text-secondary)] bg-[var(--card-bg)] p-2 rounded">{ans.context}</p>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;