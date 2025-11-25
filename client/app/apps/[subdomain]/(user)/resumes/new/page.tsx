import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Copy, FileText, Sparkles, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create New Resume | Professional Resume Builder",
  description: "Create professional resumes from scratch, use existing templates, or generate with AI. Build your perfect resume in minutes.",
};

export default function ResumeCreatePage() {
  return (
    <div className="min-h-screen space-y-12 pb-12">
      {/* Clean Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Create Professional Resumes
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          Choose Your Method
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
          Select how you'd like to create your resume and get started in seconds
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* From Scratch Card */}
        <Link href="/resumes/new/from-scratch" className="group">
          <Card className="relative h-full p-6 sm:p-8 bg-card/40 dark:border-accent/10 border-accent/30  hover:dark:border-accent/20 rounded-2xl hover:border-accent/50 hover:shadow-xl shadow-none hover:shadow-accent/10 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <CardContent className="relative space-y-5 p-0">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-primary rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="p-2 rounded-full bg-muted group-hover:bg-primary transition-all">
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Build From Scratch
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Create a fully customized resume with complete control over every detail.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Full Customization
                </span>
              </div>

              <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl shadow-none transition-all rounded-xl font-medium">
                Get Started
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>

            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </Card>
        </Link>

        {/* From Existing Card */}
        <Link href="/resumes/new/from-existing" className="group">
          <Card className="relative h-full p-6 sm:p-8 bg-card/40 dark:border-accent/10 border-accent/30  hover:dark:border-accent/20 rounded-2xl hover:border-accent/50 hover:shadow-xl shadow-none  hover:shadow-accent/10 transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <CardContent className="relative space-y-5 p-0">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-primary rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Copy className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="p-2 rounded-full bg-muted group-hover:bg-primary transition-all">
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  From Existing
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Start with one of your existing resumes and customize it for a new application.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <Copy className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  Quick & Easy
                </span>
              </div>

              <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-accent-foreground shadow-lg hover:shadow-xl shadow-none transition-all rounded-xl font-medium">
                Choose Template
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>

            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </Card>
        </Link>

        {/* AI Powered Card - Coming Soon */}
        <div className="group relative">
          <Card className="relative h-full p-6 sm:p-8 bg-card/40 border-2 border-dashed dark:border-accent/10 border-accent/30  hover:dark:border-accent/20 rounded-2xl shadow-none overflow-hidden">
            <div className="absolute top-6 right-6 px-3 py-1 bg-primary text-accent-foreground text-xs font-bold rounded-full">
              SOON
            </div>

            <CardContent className="relative space-y-5 opacity-60 p-0">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-muted rounded-xl shadow-lg">
                  <Sparkles className="w-6 h-6 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  AI Powered
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Generate a professional resume instantly using AI based on your experience.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-muted rounded-lg">
                  <Sparkles className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  AI Generation
                </span>
              </div>

              <Button variant="outline" disabled className="w-full h-11 border-2 rounded-xl font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Coming Soon
              </Button>
            </CardContent>

            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-muted/20 rounded-full blur-2xl"></div>
          </Card>
        </div>
      </div>

      {/* Features Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="group p-5 sm:p-6 bg-card/40 dark:border-accent/10 border-accent/30  hover:dark:border-accent/20 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 shadow-none">
          <CardContent className="flex items-start gap-4 p-0">
            <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
              <FileText className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-semibold text-foreground">Templates</h4>
              <p className="text-sm text-muted-foreground">Standard formats</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group p-5 sm:p-6 bg-card/40 dark:border-accent/10 border-accent/30  hover:dark:border-accent/20 rounded-xl hover:border-accent/50 hover:shadow-lg transition-all duration-300 shadow-none">
          <CardContent className="flex items-start gap-4 p-0">
            <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
              <Zap className="w-5 h-5 text-accent group-hover:text-accent-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-semibold text-foreground">Fast</h4>
              <p className="text-sm text-muted-foreground">Create in minutes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group p-5 sm:p-6 bg-card/40 dark:border-accent/10 border-accent/30  hover:dark:border-accent/20 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 shadow-none sm:col-span-2 lg:col-span-1">
          <CardContent className="flex items-start gap-4 p-0">
            <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
              <Sparkles className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-semibold text-foreground">Professional</h4>
              <p className="text-sm text-muted-foreground">Stand out from others</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
