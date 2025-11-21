"use client";
import { useGetMeQuery } from "@/lib/features/auth/auth-slice";
import Link from "next/link";
import { Button } from "../ui/button";

const SigninBtn = () => {
  const { data } = useGetMeQuery("");

  return (
    <>
      {!data?.data?.tenant ? (
        <Button
          variant="outline"
          className="border-border/50 hover:border-primary/50 hover:bg-primary/5 text-foreground font-semibold rounded-lg transition-all"
        >
          Sign In
        </Button>
      ) : (
        <Link href="/dashboard" className="w-full block">
          <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2">
            Go to Dashboard
          </Button>
        </Link>
      )}
    </>
  );
};

export default SigninBtn;
