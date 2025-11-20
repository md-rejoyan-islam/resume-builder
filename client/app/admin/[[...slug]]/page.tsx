"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage({ params }: { params: { slug?: string[] } }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect root to dashboard
    if (!params.slug || params.slug.length === 0) {
      router.replace("/admin/dashboard");
    }
  }, [params.slug, router]);

  // Import and render the actual admin pages based on slug
  // The middleware rewrites the request, so this component
  // just ensures proper navigation for the admin subdomain

  return (
    <div>
      {/* Admin content will be rendered by the existing routes */}
      {/* This catch-all route handles the subdomain rewrite */}
    </div>
  );
}
