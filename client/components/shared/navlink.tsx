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
        isActive(href)
          ? "text-foreground  font-semibold"
          : "text-foreground/60 font-medium ",
        className
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navlink;
