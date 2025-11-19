"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DisclosuresPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const disclosures = [
    {
      id: 1,
      title: "Background Check Disclosure 2024",
      type: "Background Check",
      date: "Nov 12, 2024",
      status: "Signed",
      views: 5,
    },
    {
      id: 2,
      title: "Financial Disclosure Form",
      type: "Financial",
      date: "Nov 5, 2024",
      status: "Signed",
      views: 3,
    },
    {
      id: 3,
      title: "Conflict of Interest Disclosure",
      type: "Conflict of Interest",
      date: "Oct 30, 2024",
      status: "Draft",
      views: 0,
    },
  ];

  const columns = [
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (status: unknown) => {
        const statusStr = status as string;
        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusStr === "Signed"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
            }`}
          >
            {statusStr === "Signed" ? "✓" : "📝"} {statusStr}
          </span>
        );
      },
    },
    { key: "views", label: "Views" },
    { key: "date", label: "Last Modified" },
  ];

  const filteredDisclosures = disclosures.filter(
    (disclosure) =>
      disclosure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disclosure.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Disclosures</h1>
          <p className="text-muted-foreground mt-2">
            Manage your disclosure documents
          </p>
        </div>
        <Link href="/dashboard/disclosures/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Disclosure
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search disclosures..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredDisclosures}
        onView={(item) => console.log("View:", item)}
        onEdit={(item) => console.log("Edit:", item)}
        onDelete={(item) => console.log("Delete:", item)}
      />

      {/* Empty State */}
      {filteredDisclosures.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <h3 className="text-lg font-semibold mb-2">No disclosures found</h3>
          <p className="text-muted-foreground mb-4">
            Create disclosure documents for employment or compliance
          </p>
          <Link href="/dashboard/disclosures/new">
            <Button>Create Your First Disclosure</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DisclosuresPage;
