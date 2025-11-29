import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function SubdomainLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner className="w-[30vw]  text-primary" size={80} />
    </div>
  );
}
