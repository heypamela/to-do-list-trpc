import { getQueryClient, trpc } from "@/trpc/server";

import TaskList from "./task-list";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.query(trpc.tarefas.listar.queryOptions());

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TaskList />
      </HydrationBoundary>
    </main>
  );
}
