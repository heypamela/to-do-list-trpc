'use client';

import { makeQueryClient } from "./query-client";
import { TRPCProvider, trpcClient } from "./client";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

export function TRPCReactProvider({
    children,
} : {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => makeQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
                {children}
            </TRPCProvider>
        </QueryClientProvider>
    );
}