import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axios } from "@/config/axios";
import { toast } from "sonner";
import type {
  ApiResponse,
  FormData,
  UseCompetencyHandlersProps,
  User,
} from "@/interfaces/HandlerInterfaces";
import { useRouter } from "next/navigation";

export function useCompetencyHandlers({
  Form,
  quessionnaireData,
  QuestionerId,
  refetch,
}: UseCompetencyHandlersProps) {
  const router = useRouter();

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const [probCount, setProbCount] = useState<number>(0);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [openPop, setOpenPop] = useState<boolean>(false);
  const [isTrueFlag, setIsTrueFlag] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  // const [lockedIndex, setLockedIndex] = useState<number>(-1);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: unknown) => axios.post("/cbi", payload),
    onSuccess: async (res: { data: { data: ApiResponse } }) => {
      const response: ApiResponse | undefined = res?.data?.data;
      setApiResponse(response ?? null);

      if (response?.is_prop_ques_available === true) {
        setIsTrueFlag(true);
        setProbCount((p) => p + 1);
        await refetch();
      }
    },
  });

  const onSubmit = (data: FormData): void => {
    const converstion_of_prop_question = (
      quessionnaireData?.prop_ques_resp ?? []
    )
      .map((item, index) => [
        { role: "assistant", id: item?.id ?? "" },
        { role: "user", text: data[`answer_${index}`] ?? "" },
      ])
      .flat();
    const payload = {
      conversation: [
        {
          role: "assistant",
          id: quessionnaireData?.id,
          text: quessionnaireData?.questions?.question,
        },
        { role: "user", text: data?.answer },
        ...converstion_of_prop_question,
      ],
      competency_name: quessionnaireData?.competency?.competency,
      remaining_time: 96,
      probe_count: probCount,
      expected_behaviors:
        quessionnaireData?.competency?.expected_behaviours?.map(
          (i) => i?.expected_behaviour,
        ),
      questionnaire_id: QuestionerId?.partiAssessments?.quessionnaire_id,
      participant_id: user?.participant_id,
    };
    mutate(payload);
  };

  const { mutate: pauseMutate } = useMutation({
    mutationFn: () =>
      axios.put(
        `/cbi/${QuestionerId?.partiAssessments?.quessionnaire_id}/${user?.participant_id}`,
      ),
    onSuccess: (response: { data?: { message?: string } }) => {
      toast.success(response?.data?.message || "Paused");
      setOpenPop(true);
    },
  });

  const PausedHandle = (): void => {
    Form.reset();
    setApiResponse(null);
    setProbCount(0);
    setIsTrueFlag(false);
    setOpenPop(false);
    refetch();
  };

  const LogoutHandle = (): void => {
    localStorage.clear();
    setLoader(true);
    setCompleted(false);

    setTimeout(() => {
      toast.success("Logged out successfully");
      router.push("/");
    }, 1000);
  };

  useEffect(() => {
    if (apiResponse?.total_question_count) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompleted(true);
    }
  }, [apiResponse]);

  return {
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
    setCompleted,
    // lockedIndex,
  };
}


//  const onSubmit = (data: FormData): void => {
//    const converstion_of_prop_question = (
//      quessionnaireData?.prop_ques_resp ?? []
//    )
//      .map((item, index) => [
//        { role: "assistant", id: item?.id ?? "" },
//        { role: "user", text: data[`answer_${index}`] ?? "" },
//      ])
//      .flat();
//    const payload = {
//      conversation: [
//        {
//          role: "assistant",
//          id: quessionnaireData?.id,
//          text: quessionnaireData?.questions?.question,
//        },
//        { role: "user", text: data?.answer },
//        ...converstion_of_prop_question,
//      ],
//      competency_name: quessionnaireData?.competency?.competency,
//      remaining_time: 96,
//      probe_count: probCount,
//      expected_behaviors:
//        quessionnaireData?.competency?.expected_behaviours?.map(
//          (i) => i?.expected_behaviour,
//        ),
//      questionnaire_id: QuestionerId?.partiAssessments?.quessionnaire_id,
//      participant_id: user?.participant_id,
//    };
//    mutate(payload);
//  };