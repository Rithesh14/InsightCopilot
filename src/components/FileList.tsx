import { X } from 'lucide-react';
import { FileText, Image } from 'lucide-react';

interface FileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null;
  
  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div key={index} className="card p-4 flex items-center justify-between animate-in">
            <div className="flex items-center space-x-4">
              {file.type.includes("image") ? (
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src={URL.createObjectURL(file)} alt={file.name} className="max-w-[80px] max-h-[80px] object-cover rounded-lg" />
                </div>
              ) : (
                <div className="w-12 h-12 flex items-center justify-center">
                  {file.type.includes("pdf") ? (
                    <FileText className="w-12 h-12 text-[var(--text-secondary)]" />
                  ) : (
                    <FileText className="w-12 h-12 text-[var(--text-secondary)]" />
                  )}
                </div>
              )}
              <div>
                <p className="text-[var(--text-primary)] font-medium">{file.name}</p>
                <p className="text-[var(--text-secondary)] text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={() => onRemoveFile(index)}
              className="text-red-400 hover:text-red-300"
              aria-label={`Remove ${file.name}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;