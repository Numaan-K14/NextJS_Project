"use client";

import { queryClient } from "@/config/query-Client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";


export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}
