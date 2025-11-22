"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, File, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function UploadPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }
    setError("");
    setFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      // Simulate upload - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Redirect to processing page
      // router.push(`/resumes/upload/process?fileId=${fileId}`);
    } catch {
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Upload Resume PDF</h1>
          <p className="text-muted-foreground">
            Upload your existing resume to get started
          </p>
        </div>
        <Link href="/resumes">
          <Button variant="outline">Back to Resumes</Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Upload Area */}
        <div className="space-y-6">
          {/* Upload Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative p-8 rounded-xl border-2 border-dashed transition-all duration-300 ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary hover:bg-primary/2"
            }`}
          >
            <label htmlFor="file-upload" className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">Drag and drop your PDF here</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse your computer
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum file size: 10MB
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* File Info */}
          {file && (
            <div className="p-4 rounded-lg bg-card border border-border space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <File className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setFile(null);
                  setError("");
                }}
              >
                Remove
              </Button>
            </div>
          )}

          {/* Upload Buttons */}
          <div className="flex gap-3">
            <Link href="/resumes" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
            <Button
              className="flex-1"
              disabled={!file || uploading}
              onClick={handleUpload}
            >
              {uploading ? "Uploading..." : "Upload & Continue"}
            </Button>
          </div>

          {/* Info Box */}
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>What happens next?</strong>
              <br />
              After uploading, we&apos;ll extract the information from your PDF
              and let you edit and organize it.
            </p>
          </div>
        </div>

        {/* Right Side - Preview/Information */}
        <div className="sticky top-4 space-y-6">
          {/* Information Card */}
          <div className="p-6 bg-card border border-border rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">About PDF Upload</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>We&apos;ll extract text and structure from your PDF</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>You can edit and reorganize all information</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Upload any PDF format - we&apos;ll handle the rest</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span>Maximum file size is 10MB</span>
              </li>
            </ul>
          </div>

          {/* File Preview */}
          {file && (
            <div className="p-6 bg-card border border-border rounded-lg space-y-4">
              <h3 className="font-semibold">File Ready</h3>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                <div className="text-green-600 dark:text-green-400">✓</div>
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Ready to upload
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="p-6 bg-card border border-border rounded-lg space-y-4">
            <h3 className="font-semibold">Tips for Best Results</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use a clear, well-formatted PDF</li>
              <li>• Ensure text is readable and not scanned as image</li>
              <li>• Single page or multi-page PDFs are supported</li>
              <li>• Standard resume formats work best</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
