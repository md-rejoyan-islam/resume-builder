"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Clock,
  Download,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const recentActivity = [
    {
      id: 1,
      user: "Sarah Johnson",
      action: "Created new resume",
      time: "2 hours ago",
      type: "create",
    },
    {
      id: 2,
      user: "Mike Chen",
      action: "Downloaded cover letter",
      time: "3 hours ago",
      type: "download",
    },
    {
      id: 3,
      user: "Emily Davis",
      action: "Updated profile",
      time: "5 hours ago",
      type: "update",
    },
    {
      id: 4,
      user: "John Smith",
      action: "Signed disclosure",
      time: "1 day ago",
      type: "sign",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage platform activity
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Total Users"
          value="1,240"
          change={{ value: 12, type: "increase" }}
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          title="Documents Created"
          value="8,540"
          change={{ value: 28, type: "increase" }}
        />
        <StatCard
          icon={<Download className="w-6 h-6" />}
          title="Downloads"
          value="3,210"
          change={{ value: 5, type: "decrease" }}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Active Sessions"
          value="342"
          change={{ value: 18, type: "increase" }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold mb-4">User Growth (Last 7 Days)</h3>
          <div className="space-y-3">
            {[
              { day: "Mon", users: 120 },
              { day: "Tue", users: 145 },
              { day: "Wed", users: 160 },
              { day: "Thu", users: 155 },
              { day: "Fri", users: 200 },
              { day: "Sat", users: 180 },
              { day: "Sun", users: 165 },
            ].map((item) => (
              <div key={item.day} className="flex items-center gap-3">
                <span className="w-12 text-sm font-medium">{item.day}</span>
                <div className="flex-1 bg-muted rounded h-6 relative overflow-hidden">
                  <div
                    className="bg-linear-to-r from-blue-600 to-purple-600 h-full rounded"
                    style={{ width: `${(item.users / 200) * 100}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-right text-muted-foreground">
                  {item.users}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Features */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-bold mb-4">Most Used Features</h3>
          <div className="space-y-3">
            {[
              { feature: "Resume Builder", usage: 85 },
              { feature: "Cover Letter", usage: 72 },
              { feature: "Templates", usage: 68 },
              { feature: "Export/Download", usage: 62 },
              { feature: "Disclosures", usage: 45 },
            ].map((item) => (
              <div key={item.feature} className="flex items-center gap-3">
                <span className="flex-1 text-sm">{item.feature}</span>
                <div className="w-24 bg-muted rounded h-6 relative overflow-hidden">
                  <div
                    className="bg-linear-to-r from-green-600 to-emerald-600 h-full rounded"
                    style={{ width: `${item.usage}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-right text-muted-foreground">
                  {item.usage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <Link href="/dashboard/admin/analytics">
            <Button variant="link">View All</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {activity.type === "create" && "✨"}
                  {activity.type === "download" && "📥"}
                  {activity.type === "update" && "✏️"}
                  {activity.type === "sign" && "✓"}
                </div>
                <div>
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
