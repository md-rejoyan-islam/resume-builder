"use client";
import { useGetMeQuery } from "@/lib/features/auth/auth-slice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CheckAuthInLayout = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetMeQuery("");
  const router = useRouter();

  useEffect(() => {
    const protocol = window?.location?.protocol;
    const hostname = window?.location?.hostname;
    const port = window?.location?.port ? `:${window.location.port}` : "";
    if (data && data.data && data.data.tenant) {
      router.push(`${protocol}//${data?.data?.tenant.name}.${hostname}${port}`);
    }
  }, [data, router]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default CheckAuthInLayout;
