import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => href === pathname;

  return (
    <Link
      key={href}
      href={href}
      className={clsx(
        "relative transition-colors duration-200 group",
        isActive(href)
          ? "text-foreground font-semibold"
          : "text-foreground/60 font-medium hover:text-foreground",
        className
      )}
      onClick={onClick}
    >
      {label}
      {isActive(href) && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-t-full" />
      )}
    </Link>
  );
};

export default Navlink;
