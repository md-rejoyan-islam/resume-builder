import { ArrowRight } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background via-background to-slate-900/10 dark:to-slate-950/50 border-t border-border/50 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-64 w-64 bg-linear-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 bg-linear-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 border-b border-border/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                Stay Updated
              </h3>
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
                Get tips, templates, and exclusive updates delivered to your
                inbox. Join thousands of professionals.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-card/50 border border-border/50 placeholder:text-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition"
              />
              <button className="px-6 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold flex items-center gap-2 transition-all hover:shadow-lg">
                <span className="hidden sm:inline">Subscribe</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-4">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
       
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-2 mb-4 hover:opacity-90 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-purple-600 shadow-lg">
                  <span className="text-sm font-bold text-white">DB</span>
                </div>
                <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DocBuilder
                </span>
              </Link>
              <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                Create professional career documents with AI-powered
                intelligence and beautiful templates.
              </p>
              <div className="flex gap-3">
                {[
                  {
                    icon: Twitter,
                    href: "https://twitter.com",
                    label: "Twitter",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  {
                    icon: Facebook,
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center text-foreground/60 hover:text-primary transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>

           
            <div>
              <h4 className="font-bold mb-5 text-foreground flex items-center gap-2">
                Product
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Features", href: "/features" },
                  { label: "Templates", href: "/templates" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "FAQ", href: "#" },
                  { label: "Changelog", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

       
            <div>
              <h4 className="font-bold mb-5 text-foreground">Company</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "About Us", href: "#" },
                  { label: "Blog", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Press Kit", href: "#" },
                  { label: "Contact", href: "#" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* Bottom Section */}
          <div className="text-center">
            <p className="text-sm text-foreground/60">
              © {currentYear} DocBuilder. All rights reserved. Made with ❤️ by
              the DocBuilder team.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
