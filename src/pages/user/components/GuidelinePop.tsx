import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  //   DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { GuidelinesProps } from "@/interfaces/Userinterfaces";
import Image from "next/image";

export function Guidelines({
  open,
  onOpenChange,
  handleChange,
}: GuidelinesProps) {
  
  const Bullets = [
    {
      index: "1",
      label: "Stable internet connection required",
    },
    {
      index: "2",
      label: "Use a desktop or laptop (mobile not recommended)",
    },
    {
      index: "3",
      label: "Ensure microphone access if audio recording is enabled",
    },
    {
      index: "4",
      label: "Close unnecessary applications to prevent interruptions",
    },
    {
      index: "5",
      label: "Complete the assessment in one sitting when possible",
    },
    {
      index: "6",
      label: "Answer all questions honestly and completely",
    },
    {
      index: "7",
      label: "Do not seek external assistance or use reference materials",
    },
    {
      index: "8",
      label: "Maintain professional conduct throughout",
    },
    {
      index: "9",
      label: "Your responses are confidential and secure",
    },
    {
      index: "10",
      label: "Data is processed in accordance with privacy policies",
    },
    {
      index: "11",
      label: "Results are only accessible to authorized personnel",
    },
    {
      index: "12",
      label: "Do not share assessment content with others",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className={`px-6 py-5`}>
        <DialogHeader>
          <DialogTitle className={`py-2 text-xl font-bold`}>
            Guidelines
          </DialogTitle>
        </DialogHeader>
        <hr className="border-0.4 border-[#e8e7e7] w-full" />
        <div>
          {/* ------  Container Heading------------ */}
          <div className="border-2 border-[#BEDBFF] bg-[#EFF6FF] p-7 rounded-lg">
            <h1 className="text-[#1447E6] text-base font-normal leading-6">
              Rules & Regulations
            </h1>
            <p className="text-[#155DFC] text-sm font-normal leading-5">
              Please read carefully before starting your assessment
            </p>
            {/* ------------Bullet Icons-------------- */}
            <div className="mt-10">
              {Bullets.map((items, index) => (
                <BulletPoints key={index} label={items.label} />
              ))}
            </div>
          </div>
        </div>
        <hr className="border-0.4 border-[#e8e7e7] w-full" />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className={`font-semibold hover:border hover:border-[#e8e7e7]`}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleChange}
            type="submit"
            className={`bg-[#155ff2d4] hover:bg-[#004eeb] font-semibold`}
          >
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const BulletPoints = ({ label }: { label: string }) => {
  return (
    <ul className="mb-1.5">
      <li className="flex items-start gap-2">
        <Image
          src="icons/Bullet-Icon.png"
          alt=""
          className="mt-0.5 h-4 w-4 shrink-0"
          fill
        />

        <span className="text-sm  text-[#1e242d] font-normal">{label}</span>
      </li>
    </ul>
  );
};
