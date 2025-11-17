import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-purple-600">
                <span className="text-sm font-bold text-white">DB</span>
              </div>
              <span className="text-lg font-bold">DocBuilder</span>
            </Link>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Create professional career documents in minutes with AI-powered
              tools and beautiful templates.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/templates"
                  className="text-foreground/60 hover:text-foreground transition"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-foreground/60 hover:text-foreground transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-foreground/60 hover:text-foreground transition"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-foreground/60 hover:text-foreground transition"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/signin"
                  className="text-foreground/60 hover:text-foreground transition"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-foreground/60 hover:text-foreground transition"
                >
                  Start Free
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-foreground/60 hover:text-foreground transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-foreground/60 hover:text-foreground transition"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/60">
            © 2025 ResumeBuilder. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/"
              className="text-foreground/60 hover:text-foreground transition"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="text-foreground/60 hover:text-foreground transition"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="text-foreground/60 hover:text-foreground transition"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
