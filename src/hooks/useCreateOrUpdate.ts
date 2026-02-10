import { UnknownData } from "@/interfaces/DataInterfces";
import { useMutation } from "@tanstack/react-query";
import { API } from "configs/api";
import { ResponseInterface } from "interfaces";

import { VoidFunction } from "types/functionTypes";
import { onError } from "utils";
import { setApiHeaders } from "utils/setApiHeaders";

interface useCreateOrUpdateType<TVariables = UnknownData, TContext = unknown> {
  url: string;
  method?: "post" | "put";
  name?: string;
  refetch?: VoidFunction;
  onSuccess?: (
    data: ResponseInterface,
    variables: TVariables,
    context: TContext | undefined
  ) => Promise<unknown> | void;
}

export function useCreateOrUpdate<T = unknown>({
  url,
  method = "post",
  refetch,
  onSuccess,
}: useCreateOrUpdateType) {
  function sendData(data: T) {
    setApiHeaders();
    return API[method](url, data, {});
  }

  return useMutation(sendData, {
    onSuccess: (response, variables, context) => {
      onSuccess && onSuccess(response, variables, context);
      refetch && refetch();
    },
    onError: (data: UnknownData) => {
      onError(data);
    },
  });
}
