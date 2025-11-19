"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Plus, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
  const recentDocuments = [
    {
      id: 1,
      title: "Senior Product Manager - Resume",
      type: "Resume",
      date: "2 days ago",
      status: "completed",
    },
    {
      id: 2,
      title: "Tech Lead Cover Letter",
      type: "Cover Letter",
      date: "1 week ago",
      status: "completed",
    },
    {
      id: 3,
      title: "UX Designer Resume",
      type: "Resume",
      date: "2 weeks ago",
      status: "draft",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome Back! 👋</h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s what you&apos;ve been working on lately
          </p>
        </div>
        <Link href="/dashboard/resumes/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Document
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Total Documents"
          value="12"
          change={{ value: 20, type: "increase" }}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Applications Sent"
          value="28"
          change={{ value: 15, type: "increase" }}
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Profile Views"
          value="1,240"
          change={{ value: 8, type: "decrease" }}
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Saved Templates"
          value="8"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/resumes/new" className="group">
          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Create Resume</h3>
            <p className="text-sm text-muted-foreground">
              Start building a professional resume
            </p>
            <div className="mt-4 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              Create
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/cover-letters/new" className="group">
          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Create Cover Letter</h3>
            <p className="text-sm text-muted-foreground">
              Write an impressive cover letter
            </p>
            <div className="mt-4 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              Create
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <Link href="/dashboard/disclosures/new" className="group">
          <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">Create Disclosure</h3>
            <p className="text-sm text-muted-foreground">
              Prepare disclosure documents
            </p>
            <div className="mt-4 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              Create
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Documents */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Documents</h2>
          <Link href="/dashboard/resumes">
            <Button variant="link">View All</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {recentDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{doc.title}</p>
                <p className="text-sm text-muted-foreground">
                  {doc.type} • Modified {doc.date}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    doc.status === "completed"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                  }`}
                >
                  {doc.status === "completed" ? "✓ Completed" : "Draft"}
                </span>
                <Link href={`/dashboard/resumes/${doc.id}`}>
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
