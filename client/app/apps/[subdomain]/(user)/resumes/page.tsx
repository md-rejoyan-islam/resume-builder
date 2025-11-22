"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { TableActions } from "@/components/dashboard/table-actions";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ResumesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "Senior Product Manager Resume",
      template: "Modern Blue",
      date: "Nov 15, 2024",
      status: "Completed",
      views: 24,
    },
    {
      id: 2,
      title: "Tech Lead Resume",
      template: "Professional",
      date: "Nov 10, 2024",
      status: "Completed",
      views: 18,
    },
    {
      id: 3,
      title: "UX Designer Resume",
      template: "Creative",
      date: "Nov 5, 2024",
      status: "Draft",
      views: 0,
    },
    {
      id: 4,
      title: "Full Stack Developer",
      template: "Modern Blue",
      date: "Oct 28, 2024",
      status: "Completed",
      views: 42,
    },
  ]);

  const handleDelete = (id: number | string) => {
    setResumes(resumes.filter((resume) => resume.id !== id));
  };

  const handleEdit = (id: number | string, newTitle: string) => {
    setResumes(
      resumes.map((resume) =>
        resume.id === id ? { ...resume, title: newTitle } : resume
      )
    );
  };

  const filteredResumes = resumes.filter(
    (resume) =>
      resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize all your resumes
          </p>
        </div>
        <Link href="/resumes/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Resume
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search resumes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Table */}
      <DataTable
        headers={[
          "#",
          "Title",
          "Template",
          "Status",
          "Views",
          "Last Modified",
          "Actions",
        ]}
        data={filteredResumes.map((resume, index) => [
          index + 1,
          resume.title,
          resume.template,
          <span
            key={resume.id}
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              resume.status === "Completed"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
            }`}
          >
            {resume.status === "Completed" ? "✓" : "📝"} {resume.status}
          </span>,
          resume.views,
          resume.date,
          <TableActions
            key={resume.id}
            id={resume.id}
            title={resume.title}
            viewLink={`/resume/${resume.id}`}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />,
        ])}
        totalItems={filteredResumes.length}
        itemsPerPage={10}
        currentPage={1}
      />

      {/* Empty State */}
      {filteredResumes.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <h3 className="text-lg font-semibold mb-2">No resumes found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or create a new resume
          </p>
          <Link href="/dashboard/resumes/new">
            <Button>Create Your First Resume</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResumesPage;
