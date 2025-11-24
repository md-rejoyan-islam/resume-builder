"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { TableActions } from "@/components/dashboard/table-actions";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

import { useState } from "react";

const CoverLettersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coverLetters, setCoverLetters] = useState([
    {
      id: 1,
      title: "Tech Lead Position - TechCorp",
      company: "TechCorp",
      date: "Nov 14, 2024",
      status: "Completed",
      views: 12,
    },
    {
      id: 2,
      title: "Senior Manager - DigitalXYZ",
      company: "DigitalXYZ",
      date: "Nov 8, 2024",
      status: "Completed",
      views: 8,
    },
    {
      id: 3,
      title: "Product Designer - StartUp Inc",
      company: "StartUp Inc",
      date: "Nov 1, 2024",
      status: "Draft",
      views: 0,
    },
  ]);

  const handleDelete = (id: number | string) => {
    setCoverLetters(coverLetters.filter((letter) => letter.id !== id));
  };

  const handleEdit = (id: number | string, newTitle: string) => {
    setCoverLetters(
      coverLetters.map((letter) =>
        letter.id === id ? { ...letter, title: newTitle } : letter
      )
    );
  };

  const filteredLetters = coverLetters.filter(
    (letter) =>
      letter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headers = [
    "Title",
    "Company",
    "Status",
    "Views",
    "Last Modified",
    "Actions",
  ];

  const tableData = filteredLetters.map((letter) => [
    letter.title,
    letter.company,
    <span
      key={letter.id}
      className={`text-xs font-medium px-3 py-1 rounded-full ${
        letter.status === "Completed"
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
      }`}
    >
      {letter.status === "Completed" ? "✓" : "📝"} {letter.status}
    </span>,
    letter.views,
    letter.date,
    <TableActions
      key={letter.id}
      id={letter.id}
      title={letter.title}
      viewLink={`/cover-letter/${letter.id}`}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />,
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Cover Letters</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your cover letters
          </p>
        </div>
        <Link href="/cover-letters/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Cover Letter
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search cover letters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Table */}
      <DataTable
        headers={headers}
        data={tableData}
        totalItems={filteredLetters.length}
        itemsPerPage={10}
        currentPage={1}
      />

      {/* Empty State */}
      {filteredLetters.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <h3 className="text-lg font-semibold mb-2">No cover letters found</h3>
          <p className="text-muted-foreground mb-4">
            Start creating cover letters for your job applications
          </p>
          <Link href="/cover-letters/new">
            <Button>Create Your First Cover Letter</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoverLettersPage;
