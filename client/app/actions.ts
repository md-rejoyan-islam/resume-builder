"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const logout = async () => {
  const response = NextResponse.next();

  response.cookies.delete("accessToken");

  const cookieStore = await cookies();
  cookieStore.delete({
    name: "accessToken",
    path: "/",
    domain: `.${process.env.ROOT_DOMAIN}`,
  });
  cookieStore.delete({
    name: "refreshToken",
    path: "/",
    domain: `.${process.env.ROOT_DOMAIN}`,
  });
  cookieStore.delete("role");
  cookieStore.delete("tenantId");
  cookieStore.delete("tenantName");

  return {
    success: true,
    message: "Logged out successfully",
  };
};

export const getUserById = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getCookie("accessToken")}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  const result = await res.json();
  return result.data;
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie ? cookie.value : null;
};

export const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    domain: `.${process.env.ROOT_DOMAIN || "redpro.local"}`,
    path: "/",
  });
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

export const saveLoginCookies = async (data: {
  accessToken: string;
  refreshToken: string;
  role: string;
  tenantId: string;
  tenantName: string;
}) => {
  await setCookie("accessToken", data.accessToken);
  await setCookie("refreshToken", data.refreshToken);
  await setCookie("role", data.role);
  await setCookie("tenantId", data.tenantId);
  await setCookie("tenantName", data.tenantName);
};

export const getAllAuthCookies = async () => {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get("accessToken")?.value,
    refreshToken: cookieStore.get("refreshToken")?.value,
    role: cookieStore.get("role")?.value,
    tenantId: cookieStore.get("tenantId")?.value,
    tenantName: cookieStore.get("tenantName")?.value,
  };
};
