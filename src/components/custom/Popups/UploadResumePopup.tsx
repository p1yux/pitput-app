import React, { useState, useRef } from "react";
import { Plus, FileText, X, Check, Upload } from "lucide-react";

interface UploadResumePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadResumePopup: React.FC<UploadResumePopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please upload a PDF file");
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Upload Resume
        </h2>

        {!file ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging
                ? "border-green-500 bg-green-50"
                : "border-gray-300 hover:border-green-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            {/* Upload icon - circular green background with plus */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Plus size={32} className="text-green-600" />
            </div>

            <p className="text-gray-600 text-center mb-2">
              Drag & drop your resume here or click to browse
            </p>
            <p className="text-sm text-gray-500">Supports PDF format only</p>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
        ) : (
          <div className="border rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <FileText size={24} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • PDF
                </p>
              </div>
              <button
                onClick={removeFile}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
              file
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!file}
          >
            {file ? <Check size={18} /> : <Upload size={18} />}
            {file ? "Submit" : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadResumePopup;
