"use client";

import ActivatePage from "@/components/(without-header)/activate/activate-page";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 p-4">
        <main className="flex items-center justify-center w-full">
          <div className="w-full max-w-md">
            {/* Card Container */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-slate-800">
              <ActivatePage token={token} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
