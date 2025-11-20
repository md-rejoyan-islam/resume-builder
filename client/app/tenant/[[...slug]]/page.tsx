"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TenantPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const router = useRouter();

  useEffect(() => {
    // Redirect root to dashboard
    if (!params.slug || params.slug.length === 0) {
      router.replace("/dashboard");
    }
  }, [params.slug, router]);

  // Import and render the actual tenant pages based on slug
  const slug = params.slug?.[0];

  // You can render different pages based on the slug
  // For now, this will be handled by the existing structure
  // Just render the content that the user is trying to access

  return (
    <div>
      {/* Tenant content will be rendered by the existing routes */}
      {/* This catch-all route handles the subdomain rewrite */}
    </div>
  );
}
