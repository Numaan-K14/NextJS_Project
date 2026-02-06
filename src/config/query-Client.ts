import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

type ApiError = {
  msg?: string;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError(error: unknown) {
        if (error instanceof Error) {
          const axiosError = error as AxiosError<ApiError>;

          const message =
            axiosError.response?.data?.msg ??
            axiosError.message ??
            "Something went wrong";

          toast.error(message);
        } else {
          toast.error("Something went wrong");
        }
      },
    },
  },
});

// import { QueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//     mutations: {
//       onError(error) {
//         console.log(error);
//         // Check if error is an AxiosError with a response property
//         if (
//           typeof error === "object" &&
//           error !== null &&
//           "response" in error &&
//           (error as any).response?.data?.msg
//         ) {
//           toast.error((error as any).response.data.msg);
//         } else {
//           toast.error("Something went wrong");
//         }
//       },
//     },
//   },
// });