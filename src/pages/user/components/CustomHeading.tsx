import { Timer } from "@/components/Custom/TImer";
import type { CustomHeadingProps } from "@/interfaces/Userinterfaces";
import { cn } from "@/lib/utils";

export function CustomHeading({
  heading,
  description,
  className,
  timer,
}: CustomHeadingProps) {
  return (
    <div>
      <header
        className={cn("flex justify-between items-center p-8", className)}
      >
        <div className="space-y-2">
          <h1 className="text-[#181D27] font-semibold text-3xl leading-9.5 ">
            {heading}
          </h1>
          <p className="font-normal text-base text-[#535862] leading-6 ">
            {description}
          </p>
        </div>
        {timer && <Timer />}
      </header>
      <hr className="border border-[#8E9FC11F] w-full" />
    </div>
  );
}
