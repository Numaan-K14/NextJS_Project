import type { CompetencyCardProps } from "@/interfaces/Userinterfaces";

export function CompetencyCard({ number, label, paragraph }: CompetencyCardProps) {
  return (
    <>
      <div className="border border-[#0000001A]  bg-white p-5 rounded-xl ">
        <div className="flex justify-center items-center gap-2 mb-3">
          <span className="rounded-full bg-[#D8E7FC80] text-base font-normal leading-6 px-3 py-1 text-[#3B7FE6] ">
            {number}
          </span>
          <h1 className="font-normal text-lg leading-7 text-[#0A0A0A]">
            {label}
          </h1>
        </div>

        <p className="text-[#717182] leading-5 text-base font-normal">
          {paragraph}
        </p>
      </div>
    </>
  );
}
