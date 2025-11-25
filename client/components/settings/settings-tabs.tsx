"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Camera,
  Check,
  Edit,
  Lock,
  Settings,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  bio: string;
  avatar?: string;
  createdAt?: string;
}

export function SettingsTabs() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("personal");

  // Profile States
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate product manager with 5+ years of experience",
    avatar: undefined,
    createdAt: "2023-06-15",
  });

  const [profileChanges, setProfileChanges] = useState<ProfileData>(profile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Password States
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Profile Picture States
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);

  // Account States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle Profile Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = () => {
    if (imagePreview) {
      setProfileImage(imagePreview);
      setImagePreview(null);
      setIsPictureModalOpen(false);
      setPasswordSuccess("Profile picture updated successfully!");
      setTimeout(() => setPasswordSuccess(""), 3000);
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  // Handle Profile Edit
  const handleOpenEditModal = () => {
    setProfileChanges(profile);
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = () => {
    if (!profileChanges.first_name || !profileChanges.last_name) {
      setPasswordError("First name and last name are required");
      return;
    }
    setProfile(profileChanges);
    setIsEditModalOpen(false);
    setPasswordSuccess("Profile updated successfully!");
    setTimeout(() => setPasswordSuccess(""), 3000);
  };

  const handleCancelEdit = () => {
    setProfileChanges(profile);
    setIsEditModalOpen(false);
    setPasswordError("");
  };

  // Handle Password Change
  const handleChangePassword = () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (!passwordForm.currentPassword) {
      setPasswordError("Current password is required");
      return;
    }
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Simulate API call
    setPasswordSuccess("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setTimeout(() => setPasswordSuccess(""), 3000);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {passwordError && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 flex gap-3 items-start animate-in fade-in slide-in-from-top-4 duration-300">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
          <p className="text-red-700 dark:text-red-300 text-sm">
            {passwordError}
          </p>
        </div>
      )}

      {passwordSuccess && (
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 flex gap-3 items-start animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
          <p className="text-green-700 dark:text-green-300 text-sm">
            {passwordSuccess}
          </p>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-2">
          <TabsList className="inline-flex w-auto gap-1 bg-card border border-border p-1 h-12 rounded-xl">
            <TabsTrigger
              value="personal"
              className="gap-2 w-fit px-4 py-5 rounded-md cursor-pointer   data-[state=active]:bg-primary 
              
              dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
            >
              <User className="w-4 h-4" />
              <span className="font-medium">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-2 px-4  py-5 rounded-md cursor-pointer data-[state=active]:bg-primary data-[state=active]
              dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
            >
              <Lock className="w-4 h-4" />
              <span className="font-medium">Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="gap-2 px-4 py-5 rounded-md cursor-pointer data-[state=active]:bg-primary
              dark:data-[state=active]:bg-primary
              data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
            >
            <Settings className="w-4 h-4" />
            <span className="font-medium">Account</span>
          </TabsTrigger>
        </TabsList>
        </div>

        {/* Tab 1: Personal & Profile */}
        <TabsContent
          value="personal"
          className="space-y-6 animate-in fade-in duration-300 "
        >
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Profile Information</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage your personal information and profile picture
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Picture Section */}
              <div className="lg:col-span-1 flex flex-col">
                <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
                  PROFILE PICTURE
                </h3>
                <div className="flex-1 flex flex-col">
                  <div className="w-full aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center overflow-hidden relative group">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt="Profile"
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <User className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">
                          No image
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Dialog
                        open={isPictureModalOpen}
                        onOpenChange={setIsPictureModalOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-white text-black hover:bg-gray-200 gap-2"
                          >
                            <Camera className="w-4 h-4" />
                            Change
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Update Profile Picture</DialogTitle>
                            <DialogDescription>
                              Upload a new profile picture. Max file size: 5MB
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div
                              className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                              {imagePreview ? (
                                <div className="space-y-4">
                                  <div className="w-24 h-24 rounded-xl border border-border overflow-hidden mx-auto">
                                    <Image
                                      src={imagePreview}
                                      alt="Preview"
                                      width={96}
                                      height={96}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-sm mb-2">
                                      Preview your image
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Click &quot;Apply&quot; to save
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <Upload className="w-12 h-12 text-primary/60 mx-auto" />
                                  <div>
                                    <p className="font-semibold">
                                      Drop your image here
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      or click to select
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      PNG, JPG up to 5MB
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {imagePreview && (
                              <div className="flex gap-3">
                                <Button
                                  onClick={handleImageChange}
                                  className="flex-1 rounded-xl gap-2"
                                >
                                  <Check className="w-4 h-4" />
                                  Apply Picture
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setImagePreview(null);
                                    if (fileInputRef.current) {
                                      fileInputRef.current.value = "";
                                    }
                                  }}
                                  className="flex-1 rounded-xl gap-2"
                                >
                                  <X className="w-4 h-4" />
                                  Cancel
                                </Button>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  {profileImage && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleImageRemove}
                      className="mt-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Picture
                    </Button>
                  )}
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  PERSONAL DETAILS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      First Name
                    </p>
                    <p className="font-semibold text-lg mt-2">
                      {profile.first_name}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Last Name
                    </p>
                    <p className="font-semibold text-lg mt-2">
                      {profile.last_name}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Email Address
                  </p>
                  <p className="font-semibold text-base mt-2">
                    {profile.email}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Phone
                  </p>
                  <p className="font-semibold text-base mt-2">
                    {profile.phone}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Bio
                  </p>
                  <p className="font-semibold text-base mt-2 line-clamp-2">
                    {profile.bio}
                  </p>
                </div>

                {/* Edit Profile Modal Button */}
                <Dialog
                  open={isEditModalOpen}
                  onOpenChange={setIsEditModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={handleOpenEditModal}
                      className="w-full rounded-xl gap-2 py-6 text-base font-semibold"
                    >
                      <Edit className="w-5 h-5" />
                      Edit Profile Information
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        Edit Profile Information
                      </DialogTitle>
                      <DialogDescription>
                        Update your personal details
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-semibold mb-2 block">
                            First Name
                          </label>
                          <Input
                            value={profileChanges.first_name}
                            onChange={(e) =>
                              setProfileChanges({
                                ...profileChanges,
                                first_name: e.target.value,
                              })
                            }
                            className="rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold mb-2 block">
                            Last Name
                          </label>
                          <Input
                            value={profileChanges.last_name}
                            onChange={(e) =>
                              setProfileChanges({
                                ...profileChanges,
                                last_name: e.target.value,
                              })
                            }
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-2 block">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={profileChanges.email}
                          onChange={(e) =>
                            setProfileChanges({
                              ...profileChanges,
                              email: e.target.value,
                            })
                          }
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-2 block">
                          Phone
                        </label>
                        <Input
                          type="tel"
                          value={profileChanges.phone}
                          onChange={(e) =>
                            setProfileChanges({
                              ...profileChanges,
                              phone: e.target.value,
                            })
                          }
                          className="rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-2 block">
                          Bio
                        </label>
                        <textarea
                          value={profileChanges.bio}
                          onChange={(e) =>
                            setProfileChanges({
                              ...profileChanges,
                              bio: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSaveProfile}
                          className="flex-1 rounded-xl"
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="flex-1 rounded-xl"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Security & Password */}
        <TabsContent
          value="security"
          className="space-y-6 animate-in fade-in duration-300 "
        >
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Security & Password</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage your password and security settings
                </p>
              </div>
            </div>

            <div className="max-w-2xl space-y-6">
              {/* Current Password */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  For security purposes, enter your current password first
                </p>
              </div>

              {/* New Password */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Create a strong password (min 8 characters)"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use a mix of uppercase, lowercase, numbers and symbols
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  placeholder="Re-enter your new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="rounded-xl"
                />
              </div>

              <Button
                onClick={handleChangePassword}
                className="w-full md:w-auto rounded-xl py-6 font-semibold"
              >
                Change Password
              </Button>

              {/* Security Tips */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Security Tips
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use a password at least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Add numbers and special characters</li>
                  <li>• Never share your password with anyone</li>
                  <li>• Change your password regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Account Settings */}
        <TabsContent
          value="account"
          className="space-y-6 animate-in fade-in duration-300 "
        >
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Account Settings</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage your account information and deletion
                </p>
              </div>
            </div>

            <div className="max-w-2xl space-y-6">
              {/* Account Information */}
              <div className="bg-muted/30 border border-border/50 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Account Created
                      </p>
                      <p className="font-semibold mt-1">
                        {formatDate(profile.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Account Section */}
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-6">
                <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Danger Zone
                </h3>
                <p className="text-sm text-red-700/80 dark:text-red-300/80 mb-4">
                  Deleting your account is permanent and cannot be undone. All
                  your data will be permanently removed from our servers.
                </p>

                {!showDeleteConfirm ? (
                  <Button
                    variant="destructive"
                    className="rounded-xl gap-2"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                ) : (
                  <div className="space-y-4 p-4 bg-red-100/50 dark:bg-red-900/20 rounded-xl border border-red-200/50 dark:border-red-900/30">
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      Are you absolutely sure?
                    </p>
                    <p className="text-sm text-red-700/90 dark:text-red-300/90">
                      This action cannot be undone. This will permanently delete
                      your account and all associated data.
                    </p>
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="destructive"
                        className="flex-1 rounded-xl"
                        onClick={() => {
                          setPasswordSuccess(
                            "Account deletion initiated. You will be logged out shortly."
                          );
                          setTimeout(() => setShowDeleteConfirm(false), 2000);
                        }}
                      >
                        Yes, Delete My Account
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Account Options */}
              <div className="bg-muted/30 border border-border/50 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Additional Options</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl justify-start"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl justify-start"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    View Login Activity
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl justify-start"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Manage Connected Apps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
