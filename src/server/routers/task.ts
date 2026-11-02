import { z } from 'zod';
import { TRPCError } from '@trpc/server';

import { router, publicProcedure } from '../trpc';
import { tarefas, gerarId } from '../task-store';

interface Tarefas {
    id: number;
    titulo: string;
    descricao?: string;
    dataCriacao: Date;
}

export const tarefasRouter = router ({
    listar: publicProcedure.query(() => {
        return tarefas;
    }),

    criar : publicProcedure
    .input(
        z.object({
            titulo: z.string().trim().min(1, 'Título é obrigatório'),
            descricao: z.string().optional(),
        })
    ).mutation(({ input }) => {
        const novaTarefa: Tarefas = {
            id: gerarId(),
            titulo: input.titulo,
            descricao: input.descricao,
            dataCriacao: new Date(),
        };

        tarefas.push(novaTarefa);

        return novaTarefa;
    }),
    
    atualizar: publicProcedure
        .input(
            z.object({
                id: z.number(),
                titulo: z.string().trim().min(1).optional(),
                descricao: z.string().optional(),
            })
        ).mutation(({ input }) => {
            const tarefa = tarefas.find(
                (tarefa) => tarefa.id === input.id
            );

            if(!tarefa){
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Tarefa não foi encontrada',
                });
            }

            if (input.titulo !== undefined){
                tarefa.titulo = input.titulo;
            }

            if (input.descricao !== undefined){
                tarefa.descricao = input.descricao;
            }

            return tarefa;
        }),

    excluir: publicProcedure
        .input(
            z.object({
                id: z.number(),
            })
        ).mutation(({ input }) => {
            const indice = tarefas.findIndex(
                (tarefa) => tarefa.id === input.id
            );

            if (indice === -1){
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Tarefa não foi encontrada',
                });
            }

            const [tarefaExcluida] = tarefas.splice(indice, 1);

            return tarefaExcluida;
        }),
});