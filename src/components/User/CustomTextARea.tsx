import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CustomTextAreaProps } from "@/interfaces/Userinterfaces";
import { useFormContext } from "react-hook-form";

export function CustomTextArea({ Question, required, name, ...props }: CustomTextAreaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];
  return (
    <div className={`space-y-4`}>
      <Label className="text-[#181D27] text-xl font-semibold leading-7.5">
        {Question}
      </Label>
      <Textarea
        {...register(name, {
          required: required && !props.disabled,
        })}
        {...props}
        className={`border rounded-md p-2 outline-none",
          ${
            hasError ? "border-red-500 focus:border-red-500" : "border-gray-300"
          }
        `}
      />
    </div>
  );
}
