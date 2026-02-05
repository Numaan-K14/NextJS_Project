import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { SubmittedSuccessfullyProps } from "@/interfaces/Userinterfaces";
import Image from "next/image";

export function Submittedsucessfully({
  open,
  sections,
  answeredQues,
  LogoutHandle,
}: SubmittedSuccessfullyProps) {
  return (
    <Dialog open={open}>
      <DialogContent
        className={`max-w-122 p-0 border-none shadow-none bg-transparent`}
      >
        <section className="bg-white p-6 rounded-2xl shadow-2xl">
          <div className="flex pt-6 gap-5 flex-col items-center">
            <Image
              fill
              src="/icons/Thumb.png"
              alt="Logo"
              className="w-12 h-12"
            />

            <div className="flex flex-col gap-1">
              <p className="font-semibold text-[18px] leading-7 text-center">
                Assessment Successfully Submitted
              </p>
              <div className="text-[14px] leading-5 text-[#535862] text-center">
                Thank you for completing the assessment.
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-34 h-34 border border-[#E9EAEB] p-4 rounded-xl flex flex-col items-center gap-1">
                <Image
                  fill
                  src="/icons/stack_icon.png"
                  alt="Logo"
                  className="w-8 h-8"
                />
                <div className="text-center">
                  <p className="text-[#414651] text-[14px]">{sections}</p>
                  <p className="text-[13px] text-[#535862]">
                    Section completed
                  </p>
                </div>
              </div>

              <div className="w-34 h-34 border border-[#E9EAEB] p-4 rounded-xl flex flex-col items-center gap-1">
                <Image
                  fill
                  src="/icons/stack_icon.png"
                  alt="Logo"
                  className="w-8 h-8"
                />
                <div className="text-center">
                  <p className="text-[#414651] text-[14px]">
                    {answeredQues ?? "-"}
                  </p>
                  <p className="text-[13px] text-[#535862]">
                    Questions Answered
                  </p>
                </div>
              </div>

              <div className="w-34 h-34 border border-[#E9EAEB] p-4 rounded-xl flex flex-col items-center gap-1">
                <Image
                  fill
                  src="/icons/stack_icon.png"
                  alt="Logo"
                  className="w-8 h-8"
                />
                <div className="text-center">
                  <p className="text-[#414651] text-[14px]">
                    {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-[13px] text-[#535862]">Completion Date</p>
                </div>
              </div>
            </div>

            <div className="border border-[#7DB0F4] bg-[rgba(216,231,252,0.25)] p-4 rounded-xl text-[14px] font-medium leading-5 text-[#173777] text-center">
              Report and feedback will be provided by your HR or direct
              supervisor.
            </div>

            <button
              onClick={LogoutHandle}
              className="bg-[#3B7FE6] py-2.5 px-13 font-semibold text-[16px] text-white rounded-xl"
            >
              Sign Out
            </button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
