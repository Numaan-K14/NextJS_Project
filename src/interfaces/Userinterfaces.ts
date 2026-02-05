export interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AlertPopUpProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  Icon: string;
  heading: string;
  Paragraph: string;
  action: string;
  cancel: string;
  PausedHandle: () => void;
  LogoutHandle: () => void;
}

export interface ButtonFooterProps {
  apiResponse: unknown;
  setOpenPop: (open: boolean) => void;
  PausedHandle: () => void;
  isPending: boolean;
  handleSubmit: () => void;
};

export interface CompetencyCardProps {
  number: string | number;
  label: string;
  paragraph: string;
};

export interface CustomHeadingProps {
  heading: string;
  description: string;
  button?: string;
  timer?: boolean;
  className: string;
};

export interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  Question: string;
  required?: boolean;
  name: string;
}

export interface GuidelinesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleChange: () => void;
}

export interface SubmittedSuccessfullyProps {
  open: boolean;
  setOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sections: number | string;
  answeredQues: number | string;
  LogoutHandle: () => void;
};