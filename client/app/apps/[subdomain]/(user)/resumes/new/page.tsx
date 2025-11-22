"use client";

import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import Link from "next/link";

export default function ResumeCreatePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create Resume</h1>
        <p className="text-muted-foreground">
          Choose how you want to create your resume
        </p>
      </div>

      {/* Method Selection Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* From Scratch */}
        <Link href="/resumes/new/from-scratch">
          <div className="group cursor-pointer p-8 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 h-full">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Create from Scratch
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Build your resume step by step with our guided form. Add your
                  information and see a live preview.
                </p>
              </div>
              <div className="pt-4 w-full">
                <Button className="w-full">Start Building</Button>
              </div>
            </div>
          </div>
        </Link>

        {/* Upload PDF */}
        <Link href="/resumes/new/upload-pdf">
          <div className="group cursor-pointer p-8 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 h-full">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
                <Upload className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Upload PDF
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Already have a resume? Upload your PDF file and we&apos;ll
                  help you organize it.
                </p>
              </div>
              <div className="pt-4 w-full">
                <Button className="w-full" variant="outline">
                  Upload File
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
