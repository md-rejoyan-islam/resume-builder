import ForgotPasswordPage from "@/components/(without-header)/forgot/forgot-page";

export const metadata = {
  title: "Forgot Password - Reset Your ResumeBuilder Account",
  description:
    "Forgot your password? Reset it easily on ResumeBuilder and regain access to your account to continue creating professional resumes and cover letters.",
};

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <main className="flex items-center justify-center w-full">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-slate-800">
            <ForgotPasswordPage />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
