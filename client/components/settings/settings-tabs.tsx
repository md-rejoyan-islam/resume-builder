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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useUpdateMeWithAvatarMutation,
} from "@/lib/features/auth/auth-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  Camera,
  Check,
  Edit,
  Loader2,
  Lock,
  Settings,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ProfileFormData {
  first_name: string;
  last_name: string;
  phone: string;
}

// Zod schema for password change
const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

export function SettingsTabs() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("personal");

  // RTK Query hooks
  const { data: userData, isLoading: isLoadingUser } = useGetMeQuery("");
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [updateMeWithAvatar, { isLoading: isUploadingAvatar }] =
    useUpdateMeWithAvatarMutation();

  // Profile States - only used for edit modal
  const [profileChanges, setProfileChanges] = useState<ProfileFormData>({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // React Hook Form for password change
  const passwordForm = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Profile Picture States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);

  // Account States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Get user data
  const user = userData?.data;

  // Handle Profile Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Backend allows max 300KB for avatar
      if (file.size > 300 * 1024) {
        toast.error("File size should be less than 300KB");
        return;
      }
      // Store the file for upload
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = async () => {
    if (selectedFile) {
      try {
        await updateMeWithAvatar({
          avatar: selectedFile,
        }).unwrap();

        setSelectedFile(null);
        setImagePreview(null);
        setIsPictureModalOpen(false);
        toast.success("Profile picture updated successfully!");
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        toast.error(err?.data?.message || "Failed to upload profile picture");
      }
    }
  };

  // Handle Profile Edit
  const handleOpenEditModal = () => {
    if (user) {
      setProfileChanges({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
      });
    }
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async () => {
    if (!profileChanges.first_name || !profileChanges.last_name) {
      toast.error("First name and last name are required");
      return;
    }

    try {
      await updateMe({
        first_name: profileChanges.first_name,
        last_name: profileChanges.last_name,
        phone: profileChanges.phone,
      }).unwrap();

      setIsEditModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  // Handle Password Change
  const onPasswordSubmit = async (data: PasswordChangeFormData) => {
    try {
      await changePassword({
        old_password: data.currentPassword,
        new_password: data.newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      passwordForm.reset();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to change password");
    }
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

  // Loading state
  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="mb-2">
          <TabsList className="inline-flex w-auto gap-1 bg-card border border-border p-1 h-12 rounded-md">
            <TabsTrigger
              value="personal"
              className="gap-2 w-fit px-4 py-5 rounded-md cursor-pointer data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
            >
              <User className="w-4 h-4" />
              <span className="font-medium">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-2 px-4 py-5 rounded-md cursor-pointer data-[state=active]:bg-primary data-[state=active] dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
            >
              <Lock className="w-4 h-4" />
              <span className="font-medium">Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="gap-2 px-4 py-5 rounded-md cursor-pointer data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Account</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Personal & Profile */}
        <TabsContent
          value="personal"
          className="space-y-6 animate-in fade-in duration-300"
        >
          <div className="bg-card border border-border rounded-md p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
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
                  <div className="w-full aspect-square rounded-md border-2 border-dashed border-border bg-muted/30 flex items-center justify-center overflow-hidden relative group">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl font-bold text-primary">
                            {user?.first_name?.charAt(0)}
                            {user?.last_name?.charAt(0)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          No image uploaded
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
                              Upload a new profile picture. Max file size: 300KB
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div
                              className="border-2 border-dashed border-primary/30 rounded-md p-8 text-center bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
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
                                  <div className="w-24 h-24 rounded-md border border-border overflow-hidden mx-auto">
                                    <img
                                      src={imagePreview}
                                      alt="Preview"
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
                                      PNG, JPG, WEBP up to 300KB
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            {imagePreview && (
                              <div className="flex gap-3">
                                <Button
                                  onClick={handleImageChange}
                                  disabled={isUploadingAvatar}
                                  className="flex-1 rounded-md gap-2"
                                >
                                  {isUploadingAvatar ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      Uploading...
                                    </>
                                  ) : (
                                    <>
                                      <Check className="w-4 h-4" />
                                      Apply Picture
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setImagePreview(null);
                                    setSelectedFile(null);
                                    if (fileInputRef.current) {
                                      fileInputRef.current.value = "";
                                    }
                                  }}
                                  disabled={isUploadingAvatar}
                                  className="flex-1 rounded-md gap-2"
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
                      {user?.first_name || "Not set"}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Last Name
                    </p>
                    <p className="font-semibold text-lg mt-2">
                      {user?.last_name || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Email Address
                  </p>
                  <p className="font-semibold text-base mt-2">
                    {user?.email || "Not set"}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Phone
                  </p>
                  <p className="font-semibold text-base mt-2">
                    {user?.phone || "Not set"}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Role
                  </p>
                  <p className="font-semibold text-base mt-2 capitalize">
                    {user?.role || "User"}
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
                      className="w-full rounded-md gap-2 py-6 text-base font-semibold"
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
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={profileChanges.first_name}
                            onChange={(e) =>
                              setProfileChanges({
                                ...profileChanges,
                                first_name: e.target.value,
                              })
                            }
                            className="rounded-md h-10"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold mb-2 block">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={profileChanges.last_name}
                            onChange={(e) =>
                              setProfileChanges({
                                ...profileChanges,
                                last_name: e.target.value,
                              })
                            }
                            className="rounded-md h-10"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold mb-2 block">
                          Email
                        </label>
                        <Input
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="rounded-md bg-muted/50 h-10 cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Email cannot be changed
                        </p>
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
                          className="rounded-md h-10"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSaveProfile}
                          disabled={isUpdating}
                          className="flex-1 rounded-md"
                        >
                          {isUpdating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={isUpdating}
                          className="flex-1 rounded-md"
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
          className="space-y-6 animate-in fade-in duration-300"
        >
          <div className="bg-card border border-border rounded-md p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Security & Password</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Manage your password and security settings
                </p>
              </div>
            </div>

            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="max-w-2xl space-y-6"
              >
                {/* Current Password */}
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your current password"
                          className="rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        For security purposes, enter your current password first
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Create a strong password (min 8 characters)"
                          className="rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Use a mix of uppercase, lowercase, numbers and symbols
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-enter your new password"
                          className="rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-full md:w-auto rounded-md py-6 font-semibold"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Changing Password...
                    </>
                  ) : (
                    "Change Password"
                  )}
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
              </form>
            </Form>
          </div>
        </TabsContent>

        {/* Tab 3: Account Settings */}
        <TabsContent
          value="account"
          className="space-y-6 animate-in fade-in duration-300"
        >
          <div className="bg-card border border-border rounded-md p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
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
              <div className="bg-muted/30 border border-border/50 rounded-md p-6">
                <h3 className="font-semibold mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Account Created
                      </p>
                      <p className="font-semibold mt-1">
                        {formatDate(user?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Last Login
                      </p>
                      <p className="font-semibold mt-1">
                        {formatDate(user?.last_login)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Account Status
                      </p>
                      <p className="font-semibold mt-1 flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            user?.is_active ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        {user?.is_active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Account Section */}
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-md p-6">
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
                    className="rounded-md gap-2"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                ) : (
                  <div className="space-y-4 p-4 bg-red-100/50 dark:bg-red-900/20 rounded-md border border-red-200/50 dark:border-red-900/30">
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
                        className="flex-1 rounded-md"
                        disabled={true}
                        onClick={() => {
                          toast.success(
                            "Account deletion initiated. You will be logged out shortly."
                          );
                        }}
                      >
                        Yes, Delete My Account
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-md border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Account Options */}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
