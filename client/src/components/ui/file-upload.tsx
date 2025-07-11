import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileText, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

interface FileUploadProps {
  onFilesUploaded: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: Record<string, string[]>;
  className?: string;
}

export function FileUpload({ 
  onFilesUploaded, 
  maxFiles = 5, 
  acceptedTypes = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'text/plain': ['.txt']
  },
  className 
}: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((fileInfo, index) => {
      const file = acceptedFiles[index];
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileInfo.id ? { ...f, status: 'success', progress: 100 } : f)
          );
        } else {
          setUploadedFiles(prev => 
            prev.map(f => f.id === fileInfo.id ? { ...f, progress } : f)
          );
        }
      }, 200 + Math.random() * 300);
    });

    onFilesUploaded(acceptedFiles);
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxFiles,
    multiple: true
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors",
          isDragActive 
            ? "border-trust-blue bg-blue-50" 
            : "border-gray-300 hover:border-trust-blue hover:bg-gray-50"
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-12 w-12 text-professional-gray mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-dark-text mb-2">
          Upload Forsikringsdokumenter
        </h3>
        <p className="text-professional-gray mb-6">
          {isDragActive 
            ? "Slip dine filer her..." 
            : "Træk og slip dine PDF eller DOC filer her, eller klik for at gennemse"
          }
        </p>
        <Button 
          type="button"
          className="bg-trust-blue text-white hover:bg-blue-700"
        >
          Vælg Filer
        </Button>
        <p className="text-sm text-professional-gray mt-4">
          Maksimal filstørrelse: 10MB • Understøttede formater: PDF, DOC, DOCX, TXT
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center flex-1">
                <FileText className="h-5 w-5 text-trust-blue mr-3 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-dark-text truncate">{file.name}</p>
                  <p className="text-sm text-professional-gray">{formatFileSize(file.size)}</p>
                  {file.status === 'uploading' && (
                    <Progress value={file.progress} className="mt-2 h-2" />
                  )}
                </div>
              </div>
              
              <div className="flex items-center ml-4">
                {file.status === 'success' && (
                  <>
                    <span className="text-sm text-success-green mr-3">Uploadet</span>
                    <CheckCircle className="h-5 w-5 text-success-green mr-2" />
                  </>
                )}
                {file.status === 'uploading' && (
                  <span className="text-sm text-professional-gray mr-3">
                    {Math.round(file.progress)}%
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
