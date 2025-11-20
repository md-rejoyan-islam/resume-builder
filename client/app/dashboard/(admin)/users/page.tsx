"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      id: 1,
      first_name: "Sarah",
      last_name: "Johnson",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      status: "Active",
      role: "User",
      joinDate: "Oct 15, 2024",
      documents: 12,
    },
    {
      id: 2,
      first_name: "Mike",
      last_name: "Chen",
      name: "Mike Chen",
      email: "mike@example.com",
      status: "Active",
      role: "User",
      joinDate: "Sep 20, 2024",
      documents: 8,
    },
    {
      id: 3,
      first_name: "Emily",
      last_name: "Davis",
      name: "Emily Davis",
      email: "emily@example.com",
      status: "Inactive",
      role: "User",
      joinDate: "Aug 10, 2024",
      documents: 5,
    },
    {
      id: 4,
      first_name: "John",
      last_name: "Smith",
      name: "John Smith",
      email: "john@example.com",
      status: "Active",
      role: "Admin",
      joinDate: "Jul 5, 2024",
      documents: 0,
    },
    {
      id: 5,
      first_name: "Lisa",
      last_name: "Wong",
      name: "Lisa Wong",
      email: "lisa@example.com",
      status: "Active",
      role: "User",
      joinDate: "Jun 22, 2024",
      documents: 15,
    },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (role: unknown) => {
        const roleStr = role as string;
        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              roleStr === "Admin"
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
            }`}
          >
            {roleStr}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (status: unknown) => {
        const statusStr = status as string;
        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusStr === "Active"
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
            }`}
          >
            {statusStr === "Active" ? "●" : "○"} {statusStr}
          </span>
        );
      },
    },
    { key: "documents", label: "Documents" },
    { key: "joinDate", label: "Join Date" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage platform users and permissions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length },
          {
            label: "Active",
            value: users.filter((u) => u.status === "Active").length,
          },
          {
            label: "Inactive",
            value: users.filter((u) => u.status === "Inactive").length,
          },
          {
            label: "Total Documents",
            value: users.reduce((sum, u) => sum + u.documents, 0),
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-lg p-4"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        onView={(item) => console.log("View:", item)}
        onEdit={(item) => console.log("Edit:", item)}
        onDelete={(item) => console.log("Delete:", item)}
      />
    </div>
  );
};

export default AdminUsersPage;
