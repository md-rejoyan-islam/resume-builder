"use client";

import { Button } from "@/components/ui/button";
import { FileText, Mail, Settings, Shield } from "lucide-react";
import { useState } from "react";

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "DocBuilder",
    siteDescription: "Professional document builder platform",
    supportEmail: "support@docbuilder.com",
    maintenanceMode: false,
    allowNewSignups: true,
    enableAnalytics: true,
  });

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "email", label: "Email Configuration", icon: Mail },
    { id: "security", label: "Security", icon: Shield },
    { id: "content", label: "Content", icon: FileText },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure platform-wide settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Site Description
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    siteDescription: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) =>
                  setSettings({ ...settings, supportEmail: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-3">
              {[
                {
                  key: "maintenanceMode",
                  label: "Maintenance Mode",
                  description: "Disable platform for all users except admins",
                },
                {
                  key: "allowNewSignups",
                  label: "Allow New Signups",
                  description: "Allow new users to create accounts",
                },
                {
                  key: "enableAnalytics",
                  label: "Enable Analytics",
                  description: "Track user behavior and platform metrics",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        settings[item.key as keyof typeof settings] as boolean
                      }
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <Button>Save Changes</Button>
              <Button variant="outline">Reset</Button>
            </div>
          </div>
        </div>
      )}

      {/* Email Configuration */}
      {activeTab === "email" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Configure SMTP settings for email notifications
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                SMTP Host
              </label>
              <input
                type="text"
                placeholder="smtp.gmail.com"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Port</label>
                <input
                  type="number"
                  placeholder="587"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Encryption
                </label>
                <select className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>TLS</option>
                  <option>SSL</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Sender Email
              </label>
              <input
                type="email"
                placeholder="noreply@docbuilder.com"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                SMTP Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                SMTP Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button>Test Email</Button>
              <Button>Save Configuration</Button>
            </div>
          </div>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Max Login Attempts
              </label>
              <input
                type="number"
                defaultValue="5"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Lockout Duration (minutes)
              </label>
              <input
                type="number"
                defaultValue="15"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="p-4 border border-border rounded-lg">
              <p className="font-medium mb-2">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground mb-4">
                Require 2FA for admin accounts
              </p>
              <Button variant="outline">Configure 2FA Policy</Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button>Update Security Settings</Button>
            </div>
          </div>
        </div>
      )}

      {/* Content Settings */}
      {activeTab === "content" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Terms & Conditions
              </label>
              <textarea
                rows={6}
                placeholder="Enter your terms and conditions here..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Privacy Policy
              </label>
              <textarea
                rows={6}
                placeholder="Enter your privacy policy here..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button>Update Content</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
