import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { AlertPopUpProps } from "@/interfaces/Userinterfaces";
import Image from "next/image";

export function AlertPopUp({
  open,
  setOpen,
  Icon,
  heading,
  Paragraph,
  action,
  cancel,
  PausedHandle,
  LogoutHandle,
}: AlertPopUpProps) {
  return (
    <>
      <Dialog open={open}>
        <DialogContent className="max-w-md p-0 border-none shadow-none bg-transparent">
          <div className="w-full  rounded-lg shadow-2xl py-6 px-8 bg-white">
            <Image
              src={`/icons/${Icon}.png`}
              alt={`${Icon} icon`}
              className="w-18 h-18"
              fill
            />
            <DialogTitle className="font-semibold text-xl leading-6 text-[#181D27] mt-5">
              {heading}
            </DialogTitle>

            <p className="font-normal text-md text-[#667085] mt-2 mb-8">
              {Paragraph}
            </p>

            <div className="flex justify-between">
              <button
                className="text-[#414651] font-semibold text-base leading-4 bg-white py-3.5 px-14 border border-[#D5D7DA] rounded-lg cursor-pointer hover:bg-[#e0dddd] transition-all"
                onClick={() => {
                  setOpen(false);
                  LogoutHandle();
                }}
              >
                {cancel}
              </button>
              <button
                className="text-white bg-[#3B7FE6] font-semibold text-base leading-4 py-3.5 px-12 rounded-lg cursor-pointer hover:bg-[#75a5ee] transition-all"
                onClick={PausedHandle}
              >
                {action}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
