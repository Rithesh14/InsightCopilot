import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFilesAdded: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesAdded }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
    }
  };
  
  return (
    <div
      className={`upload-area flex flex-col items-center justify-center relative ${dragActive ? 'drag-over' : ''}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      role="region"
      aria-label="Drag and drop files here"
    >
      <Upload className="w-12 h-12 text-[var(--text-secondary)] mb-4" />
      <p className="text-[var(--text-secondary)] text-center">Drag & drop files here or click to browse</p>
      <p className="text-[var(--text-secondary)] text-sm mt-2">Supported formats: PDF, XLSX, JPG, PNG (max 10MB each)</p>
      <input
        type="file"
        multiple
        accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        ref={fileInputRef}
        aria-label="File upload input"
      />
    </div>
  );
};

export default FileUpload;