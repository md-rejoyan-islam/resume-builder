import { SettingsTabs } from "@/components/settings/settings-tabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Professional Resume Builder",
  description: "Manage your account settings, profile information, security preferences, and more.",
};

export default function SettingsPage() {
  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2 text-base">
            Manage your account, security, and preferences
          </p>
        </div>

        {/* Tabs Component */}
        <SettingsTabs />
      </div>
    </div>
  );
}
