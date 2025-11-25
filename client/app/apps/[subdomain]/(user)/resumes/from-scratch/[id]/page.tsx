"use client";

import { ResumeNavigation } from "@/components/resume-builder/ResumeNavigation";
import { ResumeSidebar } from "@/components/resume-builder/ResumeSidebar";
import { ResumeStepHeader } from "@/components/resume-builder/ResumeStepHeader";
import { ResumeTipsPanel } from "@/components/resume-builder/ResumeTipsPanel";
import { StepRenderer } from "@/components/resume-builder/StepRenderer";
import { Button } from "@/components/ui/button";
import { stepsConfig } from "@/lib/resume-steps";
import { cn } from "@/lib/utils";
import {
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Circular Progress Component (Mobile Header)
const CircularProgress = ({ value, size = 40, strokeWidth = 4 }: { value: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-slate-200 dark:text-slate-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-orange-500 transition-all duration-300 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-primary">{value}%</span>
    </div>
  );
};

export default function ResumeBuilderPage() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState("contact");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [countries, setCountries] = useState<{ name: string; code: string }[]>([]);

  const [formData, setFormData] = useState<any>({
    firstName: "Md",
    lastName: "Isla",
    jobTitle: "Software Engineer",
    email: "rejoyan@gmail.com",
    phone: "01568-816822",
    country: "",
    city: "Dhaka",
    state: "",
    postalCode: "3114",
    // Add other fields as needed or let them be added dynamically
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2");
        const data = await response.json();
        const formattedCountries = data
          .map((c: any) => ({ name: c.name.common, code: c.cca2 }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentStepConfig = stepsConfig.find(s => s.id === currentStep) || stepsConfig[0];

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#f8f9fa] dark:bg-background font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-card border-b border-border p-4 flex items-center justify-between z-20 shrink-0  ">
        <Link href="/resumes" className="flex items-center gap-2 font-bold text-xl text-primary">
          resume<span className="text-orange-500">genius</span>
        </Link>
        <div className="flex items-center gap-4">
          <CircularProgress value={55} size={32} strokeWidth={3} />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-white dark:bg-card border-r border-border shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-bold text-lg">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {stepsConfig.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => {
                          setCurrentStep(step.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-50 text-primary dark:bg-primary/10"
                            : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-accent/10"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                          isActive
                            ? "bg-primary text-white border-primary"
                            : "bg-white border-slate-200 text-slate-400 dark:bg-card dark:border-border"
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>
                        {step.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Left Sidebar - Desktop Navigation */}
      <ResumeSidebar 
        steps={stepsConfig} 
        currentStep={currentStep} 
        onStepChange={setCurrentStep} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative bg-[#f8f9fa] dark:bg-background">
        <div className="flex-1 overflow-y-auto p-4 lg:p-12 pb-32 scroll-smooth">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Form Section */}
            <div className="lg:col-span-2 space-y-8">
              <ResumeStepHeader 
                title={currentStepConfig.title} 
                description={currentStepConfig.description} 
              />

              <StepRenderer 
                stepId={currentStep}
                formData={formData}
                handleInputChange={handleInputChange}
                photoPreview={photoPreview}
                handlePhotoUpload={handlePhotoUpload}
                fileInputRef={fileInputRef}
                countries={countries}
              />

              <ResumeNavigation />
            </div>

            {/* Right Sidebar - Tips */}
            <ResumeTipsPanel 
              title={`${currentStepConfig.label} Tips`}
              tips={currentStepConfig.tips} 
              didYouKnow={currentStepConfig.didYouKnow} 
            />
          </div>
         
        </div>
      </main>
    </div>
  );
}
