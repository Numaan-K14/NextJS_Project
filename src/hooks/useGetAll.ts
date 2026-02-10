import { UnknownData } from "@/interfaces/DataInterfces";
import {
  InfiniteQueryObserverResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { API } from "configs/api";
import { ResponseInterface } from "interfaces";
import { setApiHeaders } from "utils/setApiHeaders";


interface apiParams {
  [key: string]: string | number | boolean | undefined;
}



function getData(
  url: string,
  params?: apiParams | boolean,
  schemaName?: string,
): Promise<ResponseInterface> {
  setApiHeaders();

  if (schemaName) {
    API.defaults.headers.common["x-tenant-name"] = schemaName;
  }

  return API.get(url, {
    params: params ? params : {},
  });
}

interface GetAllOptions {
  key: string;
  params?: apiParams | boolean;
  schemaName?: string;
  enabled?: boolean;
  staleTime?: number;
  refetchInterval?: number;
  refetchIntervalInBackground?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchOnMount?: boolean;
  retryOnMount?: boolean;
  notifyOnChangeProps?: Array<keyof InfiniteQueryObserverResult> | "tracked";
  notifyOnChangePropsExclusions?: Array<keyof InfiniteQueryObserverResult>;

  onSuccess?: (data: ResponseInterface) => void;

  onError?: (err: unknown) => void;

  onSettled?: (
    data: UnknownData | undefined,
    error: UnknownData | null,
  ) => void;

  select?: (data: ResponseInterface) => UnknownData;

  suspense?: boolean;
  keepPreviousData?: boolean;

  placeholderData?: UnknownData;

  optimisticResults?: boolean;
}

export function useGetAll<TData = UnknownData, TError = UnknownData>(
  options: GetAllOptions,
): UseQueryResult<TData, TError> {
  const key = options?.params
    ? [options.key, JSON.stringify(options?.params)]
    : options?.key;

  return useQuery(
    key,
    () => getData(options.key, options?.params, options.schemaName),
    {
      retry: false,
      select: (data: ResponseInterface) => data?.data?.data,
      ...options,
    },
  );
}




