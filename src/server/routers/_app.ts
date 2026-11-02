import { router } from '../trpc';
import { tarefasRouter } from './task';

export const appRouter = router({
    tarefas: tarefasRouter,
});

export type AppRouter = typeof appRouter;