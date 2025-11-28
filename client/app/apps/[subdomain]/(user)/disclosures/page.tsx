"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { TableActions } from "@/components/dashboard/table-actions";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DisclosuresPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [disclosures, setDisclosures] = useState([
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
  ]);

  const handleDelete = (id: number | string) => {
    setDisclosures(disclosures.filter((disclosure) => disclosure.id !== id));
  };

  const filteredDisclosures = disclosures.filter(
    (disclosure) =>
      disclosure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disclosure.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headers = [
    "Title",
    "Type",
    "Status",
    "Views",
    "Last Modified",
    "Actions",
  ];

  const tableData = filteredDisclosures.map((disclosure) => [
    disclosure.title,
    disclosure.type,
    <span
      key={disclosure.id}
      className={`text-xs font-medium px-3 py-1 rounded-full ${
        disclosure.status === "Signed"
          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
          : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
      }`}
    >
      {disclosure.status === "Signed" ? "✓" : "📝"} {disclosure.status}
    </span>,
    disclosure.views,
    disclosure.date,
    <TableActions
      key={disclosure.id}
      id={disclosure.id}
      title={disclosure.title}
      detailsLink={`/disclosure/${disclosure.id}`}
      onDelete={handleDelete}
    />,
  ]);

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
        <Link href="/disclosures/new">
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
        headers={headers}
        data={tableData}
        totalItems={filteredDisclosures.length}
        itemsPerPage={10}
        currentPage={1}
      />

      {/* Empty State */}
      {filteredDisclosures.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <h3 className="text-lg font-semibold mb-2">No disclosures found</h3>
          <p className="text-muted-foreground mb-4">
            Create disclosure documents for employment or compliance
          </p>
          <Link href="/disclosures/new">
            <Button>Create Your First Disclosure</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DisclosuresPage;
