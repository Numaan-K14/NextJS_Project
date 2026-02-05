export interface User {
  participant_id?: string;
}

export interface Competency {
  competency?: string;
  expected_behaviours?: { expected_behaviour?: string }[];
}

export interface PropQuestion {
  id?: string;
}

export interface QuestionnaireData {
  id?: string;
  questions?: {
    question?: string;
  };
  competency?: Competency;
  prop_ques_resp?: PropQuestion[];
}

export interface QuestionerId {
  partiAssessments?: {
    quessionnaire_id?: string;
  };
}

export interface UseCompetencyHandlersProps {
  Form: {
    reset: () => void;
  };
  quessionnaireData?: QuestionnaireData;
  QuestionerId?: QuestionerId;
  refetch: () => Promise<unknown>;
}

export type FormData = Record<string, string> & {
  answer?: string;
};

export interface ApiResponse {
  is_prop_ques_available?: boolean;
  total_question_count?: number;
}
