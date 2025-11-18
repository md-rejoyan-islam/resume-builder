import { Input } from "@/components/ui/input";

const InputField = ({
  props,
  error,
  errorMessage,
  icon,
}: {
  props: React.ComponentProps<typeof Input>;
  error: boolean;
  errorMessage?: string;
  icon: React.ReactNode;
}) => {
  return (
    <div>
      <div className="relative">
        {icon}
        <Input
          type="email"
          placeholder="you@example.com"
          {...props}
          className={`pl-10 h-11 ${error ? "border-red-500" : ""}`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
