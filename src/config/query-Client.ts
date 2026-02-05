import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError(error) {
        console.log(error);
        // Check if error is an AxiosError with a response property
        if (
          typeof error === "object" &&
          error !== null &&
          "response" in error &&
          (error as any).response?.data?.msg
        ) {
          toast.error((error as any).response.data.msg);
        } else {
          toast.error("Something went wrong");
        }
      },
    },
  },
});
