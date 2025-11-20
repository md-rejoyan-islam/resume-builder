"use client";

import { Button } from "@/components/ui/button";
import { Lock, Shield, User } from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate product manager with 5+ years of experience",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    documentReminders: true,
    applicationStatus: true,
    marketingEmails: false,
  });

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and security
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Profile Information</h2>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                value={profile.first_name}
                onChange={(e) =>
                  setProfile({ ...profile, first_name: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={profile.last_name}
                onChange={(e) =>
                  setProfile({ ...profile, last_name: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{profile.first_name} {profile.last_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{profile.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bio</p>
              <p className="font-medium">{profile.bio}</p>
            </div>
            <div className="pt-4">
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          </div>
        )}
      </div>

      {/* Notification Settings
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Notification Preferences</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              key: "emailUpdates",
              label: "Email Updates",
              description:
                "Receive updates about new features and improvements",
            },
            {
              key: "documentReminders",
              label: "Document Reminders",
              description: "Get reminded when documents are due",
            },
            {
              key: "applicationStatus",
              label: "Application Status",
              description: "Notifications about your job applications",
            },
            {
              key: "marketingEmails",
              label: "Marketing Emails",
              description: "Promotional content and special offers",
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
                    notifications[item.key as keyof typeof notifications]
                  }
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
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
      </div> */}

      {/* Security Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <p className="font-medium mb-2">Password</p>
            <p className="text-sm text-muted-foreground mb-4">
              Last changed 2 months ago
            </p>
            <Button variant="outline" className="gap-2">
              <Lock className="w-4 h-4" />
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-6">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
          Danger Zone
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Irreversible actions for your account
        </p>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
