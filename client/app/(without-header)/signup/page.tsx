import SignUpForm from "@/components/(without-header)/signup/signup-form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-foreground/60">
              Join thousands of job seekers building winning resumes
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8">
            <SignUpForm />

            <p className="text-center text-sm text-foreground/60 mt-6">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

          <p className="text-xs text-foreground/60 text-center mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </main>
    </div>
  );
};

export default Page;
