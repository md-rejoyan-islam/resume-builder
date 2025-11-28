"use client";
import { logout } from "@/app/actions";
import {
  useGetMeQuery,
  useLogoutMutation,
} from "@/lib/features/auth/auth-slice";
import { ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const AuthenticateBtns = () => {
  const { data, error } = useGetMeQuery("");

  const [clientLogout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    await clientLogout();
    // refresh the page to update the UI
    window.location.href = window.location.href;
  };

  const getDashboardUrl = () => {
    const rootDomain = window?.location?.hostname;
    const protocol = window?.location?.protocol;
    const port = window?.location?.port ? `:${window.location.port}` : "";
    return `${protocol}//${data?.data?.tenant.name}.${rootDomain}${port}`;
  };

  const getInitials = () => {
    const firstName = data?.data?.first_name || "";
    const lastName = data?.data?.last_name || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <>
      {!data?.data?.tenant || error ? (
        <>
          <Link href="/signin" className="hidden sm:inline-flex">
            <button className="border-border/50 cursor-pointer hover:border-primary/50 hover:bg-primary/5 text-foreground font-semibold rounded-lg transition-all">
              Sign In
            </button>
          </Link>
          <Link href="/pricing" className="hidden sm:block">
            <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full hover:opacity-80 transition-opacity cursor-pointer">
              <Avatar>
                <AvatarImage
                  src={data?.data?.avatar}
                  alt={`${data?.data?.first_name} ${data?.data?.last_name}`}
                />
                <AvatarFallback className="bg-linear-to-br from-blue-600 to-purple-600 text-white font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-1">
              <div className="font-semibold">
                {data?.data?.first_name} {data?.data?.last_name}
              </div>
              <div className="text-xs font-normal text-muted-foreground capitalize">
                {data?.data?.role}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href={getDashboardUrl()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4" />
                Go to Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default AuthenticateBtns;
