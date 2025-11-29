import SignUpForm from "@/components/(without-header)/signup/signup-form";

export const metadata = {
  title: "Sign Up - Create Your Account on ResumeBuilder",
  description:
    "Join ResumeBuilder today and start creating professional resumes and cover letters with ease. Sign up now to access our powerful tools and templates.",
};

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <main className="flex items-center justify-center w-full">
        <div className="w-full max-w-md ">
          {/* Card Container */}
          <SignUpForm />
        </div>
      </main>
    </div>
  );
};

export default Page;
