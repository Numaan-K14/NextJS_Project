"use client";
import { useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useQuery } from "@/hooks/useQuerry";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CustomHeading } from "@/components/User/CustomHeading";
import { CompetencyCard } from "@/components/User/CompetencyCard";
import { Guidelines } from "@/components/User/GuidelinePop";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export default function Landing() {
  const router = useRouter();
  const [guide, setGuide] = useState(false);

  // --competency card--
  // const { data: Competency } = useQuery({
  //   queryKey: [
  //     `/competency/participant-dashboard/${user?.participant_id}/${user?.client_id}`,
  //   ],
  //   select: (Competency: any) => Competency?.data?.data,
  //   enabled: !!user?.participant_id,
  // });
  // // --competency questionaireID--
  // const { data: QuestionerId } = useQuery({
  //   queryKey: [
  //     `/cbi/participant-assessment/${user?.participant_id}/${user?.client_id}/${user?.["participants.cohort_id"]}`,
  //   ],
  //   select: (QuestionerId: unknown) => QuestionerId?.data?.data,
  //   enabled: !!user?.participant_id,
  // });
  
  type ApiResponse<T> = {
    data: {
      data: T;
    };
  };

  interface Competency {
    id: number;
    competency: string;
    description: string;
  }
  interface QuestionerId {
    id: number;
    participant_id: number;
    client_id: number;
    cohort_id: number;
    questionnaire_id: number;
  }


  const { data: Competency } = useQuery<ApiResponse<Competency>, Error>({
    queryKey: [
      `/competency/participant-dashboard/${user?.participant_id}/${user?.client_id}`,
    ],
    select: (response) => response.data.data,
    enabled: !!user?.participant_id,
  });

  // -- competency questionnaire ID --
  const { data: QuestionerId } = useQuery<ApiResponse<QuestionerId>, Error>({
    queryKey: [
      `/cbi/participant-assessment/${user?.participant_id}/${user?.client_id}/${user?.["participants.cohort_id"]}`,
    ],
    select: (response) => response.data.data,
    enabled: !!user?.participant_id,
  });


  return (
    <>
      <CustomHeading
        heading="Welcome to the Competency Based Interview Portal"
        description="Assess your professional skills across key competencies"
      />
      <section className="p-8 flex flex-col gap-8">
        <div className="flex flex-col items-center space-y-2 mt-2 ">
          <Image src="/icons/Container.png" alt="Container" width={40} height={40}  />
          <h1 className="text-[#2F6DD1] text-4xl font-bold">
            Competency-Based Interview Portal
          </h1>
          <p className="text-base font-normal leading-6 text-[#181D27]">
            Assess your professional skills across six key competencies with
            AI-powered questions and personalized feedback
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {user &&
            Array.isArray(Competency) &&
            Competency.map((item, index) => (
              <CompetencyCard
                key={item.id}
                number={index + 1}
                label={item.competency}
                paragraph={item.description}
              />
            ))}
        </div>
        <Guidelines
          open={guide}
          onOpenChange={setGuide}
          handleChange={() =>
            router.push("/Competency", { state: QuestionerId })
          }
        />
        {Competency && (
          <button
            onClick={() => setGuide(true)}
            className="text-base font-semibold  bg-[#3B7FE6] text-white py-2 px-4 rounded-md flex justify-center items-center gap-1 m-auto hover:bg-[#75a5ee] transition-all"
          >
            Start Assessment <IoArrowForwardOutline />
          </button>
        )}
      </section>
    </>
  );
}
