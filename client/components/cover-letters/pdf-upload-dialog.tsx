"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadPdfCoverLetterMutation } from "@/lib/features/cover-letter/cover-letter-slice";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  FileText,
  Loader2,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface CoverLetterPdfUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CoverLetterPdfUploadDialog({
  open,
  onOpenChange,
}: CoverLetterPdfUploadDialogProps) {
  const router = useRouter();
  const [uploadPdfCoverLetter, { isLoading: isUploading }] =
    useUploadPdfCoverLetterMutation();

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<string>("");

  const resetState = useCallback(() => {
    setSelectedFile(null);
    setUploadSuccess(false);
    setError(null);
    setIsDragging(false);
    setProcessingStep("");
  }, []);

  const handleClose = useCallback(() => {
    if (!isUploading) {
      resetState();
      onOpenChange(false);
    }
  }, [resetState, onOpenChange, isUploading]);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return false;
    }

    // Check file size (max 20MB)
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size must be less than 20MB");
      return false;
    }

    return true;
  };

  const handleFileSelect = useCallback(
    async (file: File) => {
      setError(null);

      if (!validateFile(file)) {
        return;
      }

      setSelectedFile(file);
      setProcessingStep("Uploading PDF...");

      try {
        // Create FormData with the PDF file
        const formData = new FormData();
        formData.append("pdf", file);

        setProcessingStep("Extracting cover letter data with AI...");

        // Call the API
        const result = await uploadPdfCoverLetter(formData).unwrap();

        setProcessingStep("Cover letter created successfully!");
        setUploadSuccess(true);

        // Navigate to the cover letter builder after a short delay

        onOpenChange(false);
        router.push(`/cover-letters/${result.data._id}/new`);
      } catch (err) {
        console.error("PDF upload error:", err);
        const errorMessage =
          err && typeof err === "object" && "data" in err
            ? (err.data as { message?: string })?.message ||
              "Failed to process PDF"
            : "Failed to process PDF. Please try again.";
        setError(errorMessage);
        setProcessingStep("");
      }
    },
    [uploadPdfCoverLetter, onOpenChange, router]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Upload Your Cover Letter
          </DialogTitle>
          <DialogDescription>
            Upload your existing cover letter PDF. We&apos;ll use AI to extract
            your information automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Upload Area */}
          {!selectedFile && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    "p-4 rounded-full transition-colors",
                    isDragging
                      ? "bg-primary/10 text-primary"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  )}
                >
                  <Upload className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {isDragging ? "Drop your PDF here" : "Drag & drop your PDF"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or click to browse
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                    PDF
                  </span>
                  <span>Max 20MB</span>
                </div>
              </div>
            </div>
          )}

          {/* File Preview */}
          {selectedFile && (
            <div className="border rounded-xl p-4 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "p-2.5 rounded-lg",
                    uploadSuccess
                      ? "bg-emerald-100 dark:bg-emerald-900/30"
                      : "bg-primary/10"
                  )}
                >
                  {uploadSuccess ? (
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-primary" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>

                {isUploading && !uploadSuccess && (
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                )}

                {!isUploading && !uploadSuccess && !error && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSelectedFile(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Progress/Status */}
              {(isUploading || uploadSuccess) && processingStep && (
                <div className="mt-3">
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        uploadSuccess
                          ? "bg-emerald-500 w-full"
                          : "bg-primary w-2/3 animate-pulse"
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {isUploading && !uploadSuccess && (
                      <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                    )}
                    <p
                      className={cn(
                        "text-xs",
                        uploadSuccess
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {processingStep}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs text-red-600 dark:text-red-400 underline"
                  onClick={() => {
                    setSelectedFile(null);
                    setError(null);
                    setProcessingStep("");
                  }}
                >
                  Try another file
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
