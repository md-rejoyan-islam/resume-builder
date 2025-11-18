import SignInForm from "@/components/(without-header)/signin/signin-form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:min-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-foreground/60">
              Sign in to your ResumeBuilder account
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8">
            <SignInForm />

            <p className="text-center text-sm text-foreground/60 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
