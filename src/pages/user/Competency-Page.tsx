import { useLocation } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { GoDotFill } from "react-icons/go";
import { LuPause } from "react-icons/lu";
import { IoArrowForwardOutline } from "react-icons/io5";
import { Loader } from "lucide-react";
import { useCompetencyHandlers } from "@/hooks/useCompetencyHandlers";
import { CustomHeading } from "./components/CustomHeading";
import { CustomTextArea } from "./components/CustomTextARea";
import { AlertPopUp } from "./components/Alert-pop";
import { Submittedsucessfully } from "./components/Submitted-sucessfully";
import { useQuery } from "@/hooks/useQuerry";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export function CompetencyPage() {
  const location = useLocation();
  const QuestionerId = location.state;
  const Form = useForm();

  const { data: quessionnaireData, refetch } = useQuery<any>({
    queryKey: [
      `/cbi/${QuestionerId?.partiAssessments?.quessionnaire_id}/${user?.participant_id}`,
    ],
    select: (data: any) => data?.data?.data,
    enabled: !!user?.participant_id && !!QuestionerId,
  });

  const {
    onSubmit,
    PausedHandle,
    LogoutHandle,
    pauseMutate,
    isPending,
    apiResponse,
    openPop,
    setOpenPop,
    isTrueFlag,
    completed,
    loader,
    // lockedIndex,
  } = useCompetencyHandlers({
    Form,
    quessionnaireData,
    QuestionerId,
    refetch,
  });

  return (
    <>
      {loader && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <Loader className="w-20 h-20 animate-spin" />
        </div>
      )}

      <CustomHeading
        heading={
          apiResponse?.is_prop_ques_available === false
            ? "Review Your Answers"
            : `Section ${quessionnaireData?.sequence} of ${QuestionerId?.sections}`
        }
        description={
          apiResponse?.is_prop_ques_available === false
            ? "Here are your responses for the competency. You cannot modify these answers, but you can review them before continuing."
            : "Assess your professional skills across key competencies"
        }
        className="sticky top-0 z-10"
      />

      <section className="p-6 overflow-y-auto h-[80vh]">
        <div className="p-6 bg-white rounded-xl">
          <FormProvider {...Form}>
            <form className="flex flex-col gap-6">
              <div className="relative pl-5">
                {apiResponse?.is_prop_ques_available === true && (
                  <>
                    <GoDotFill className="absolute left-0 top-2 text-[#7F56D9]" />
                    <div className="absolute border-l-2 border-[#E4E7EC] left-1.75 top-7 h-full" />
                  </>
                )}

                <h1 className="text-[18px] font-semibold text-[#181D27]">
                  Core Question
                </h1>
                <p className="text-base text-[#181D27] mb-4">
                  This is the main question for this competency.
                </p>
                <CustomTextArea
                  Question={quessionnaireData?.questions?.question}
                  name="answer"
                  required
                  disabled={quessionnaireData?.response || isPending}
                  defaultValue={quessionnaireData?.response ?? null}
                  placeholder="Write something here..."
                />
              </div>

              {isTrueFlag &&
                quessionnaireData?.prop_ques_resp?.map(
                  (item: any, index: any) => (
                    <div key={item?.id || index} className="relative pl-5">
                      {apiResponse?.is_prop_ques_available === true && (
                        <>
                          <GoDotFill className="absolute left-0 top-2 text-[#7F56D9]" />

                          {item?.response && (
                            <div className="absolute border-l-2 border-[#E4E7EC] left-1.75 top-7 h-full" />
                          )}
                        </>
                      )}

                      <span className="text-[#535862] font-bold text-lg block mb-2">
                        Follow Up Question {index + 1}
                      </span>

                      <CustomTextArea
                        Question={item?.question_text}
                        name={`answer_${index}`}
                        required
                        disabled={
                          item?.response ||
                          isPending ||
                          apiResponse?.is_prop_ques_available == false
                        }
                        defaultValue={item?.response ?? null}
                        placeholder="Write something here..."
                      />
                    </div>
                  ),
                )}
            </form>
          </FormProvider>
        </div>

        {apiResponse?.is_prop_ques_available === false && !openPop && (
          <div className="p-2 my-4 bg-white border border-[#D5D7DA] rounded-xl text-sm text-[#4d5a72]">
            Your response is submitted. Please select continue to proceed to the
            next section.
          </div>
        )}

        {!apiResponse?.total_question_count && (
          <div className="flex justify-end py-8">
            {apiResponse?.is_prop_ques_available === false ? (
              <div className="flex gap-4">
                <button
                  onClick={() => pauseMutate()}
                  className="text-base font-semibold leading-5 bg-white py-3 px-5 rounded-md flex items-center gap-1 hover:bg-[#c3cbd8]"
                >
                  <LuPause /> Pause Interview
                </button>

                <button
                  onClick={PausedHandle}
                  className="text-base font-semibold leading-5 bg-[#3B7FE6] text-white py-3 px-5 rounded-md flex items-center gap-1 hover:bg-[#75a5ee]"
                >
                  Continue <IoArrowForwardOutline />
                </button>
              </div>
            ) : (
              <button
                disabled={isPending}
                onClick={Form.handleSubmit(onSubmit)}
                className="text-base font-semibold leading-5 bg-[#3B7FE6] text-white py-3 px-5 rounded-md flex justify-center items-center gap-1 hover:bg-[#75a5ee] transition-all  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  "Submitting..."
                ) : (
                  <span className=" flex justify-center items-center gap-1">
                    Submit <IoArrowForwardOutline />
                  </span>
                )}
              </button>
            )}
          </div>
        )}
      </section>

      <AlertPopUp
        open={openPop}
        setOpen={setOpenPop}
        Icon="PausedIcon"
        heading="Interview Paused"
        Paragraph="Your Interview has been paused. You can resume it at any time."
        cancel="Sign Out"
        action="Resume Now"
        LogoutHandle={LogoutHandle}
        PausedHandle={PausedHandle}
      />

      <Submittedsucessfully
        open={completed}
        answeredQues={apiResponse?.total_question_count ?? 0}
        sections={quessionnaireData?.sequence}
        LogoutHandle={LogoutHandle}
      />
    </>
  );
}
