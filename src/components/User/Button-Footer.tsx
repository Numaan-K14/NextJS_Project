import type { ButtonFooterProps } from "@/interfaces/Userinterfaces";
import { IoArrowForwardOutline } from "react-icons/io5";
import { LuPause } from "react-icons/lu";



export function ButtonFooter({
  apiResponse,
  setOpenPop,
  PausedHandle,
  isPending,
  handleSubmit,
}: ButtonFooterProps) {
  return (
    <main className="bg-white p-5 bottom-0 sticky  left-0 w-full z-10 border ">
      <div className="flex justify-end">
        {apiResponse && apiResponse?.is_prop_ques_available === false ? (
          <div className="flex gap-4">
            <button
              onClick={() => setOpenPop(true)}
              className="text-base font-semibold leading-5 outline-1 outline-[#c3cbd8] bg-white py-3 px-5 rounded-md flex justify-center items-center gap-1  hover:bg-[#c3cbd8] transition-all"
            >
              <LuPause />
              Pause Your Interview
            </button>

            <button
              onClick={PausedHandle}
              className="text-base font-semibold leading-5 bg-[#3B7FE6] text-white py-3 px-5 rounded-md flex justify-center items-center gap-1  hover:bg-[#75a5ee] transition-all"
            >
              Continue <IoArrowForwardOutline />
            </button>
          </div>
        ) : (
          <button
            disabled={isPending}
            // onClick={Form.handleSubmit(onSubmit)}
            onClick={handleSubmit}
            className="text-base font-semibold leading-5 bg-[#3B7FE6] text-white py-3 px-5 rounded-md hover:bg-[#75a5ee] transition-all  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <span>Submitting...</span>
              </>
            ) : (
              <span className=" flex justify-center items-center gap-1">
                Submit <IoArrowForwardOutline />
              </span>
            )}
          </button>
        )}
      </div>
    </main>
  );
}
