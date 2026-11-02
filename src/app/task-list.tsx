'use client';

import { useState } from "react";
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import TaskForm from "./task-form";

export default function TaskList(){
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const [tarefaSelecionada, setTarefaSelecionada] = useState<{
        id: number;
        titulo: string;
        descricao?: string;
        dataCriacao: string;
    } | null>(null);

    const { data, isLoading, error } = useQuery(
        trpc.tarefas.listar.queryOptions()
    );

    const excluirTarefa = useMutation(
        trpc.tarefas.excluir.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: trpc.tarefas.listar.queryKey(),
                });

                alert('Tarefa realizada com sucesso!');
            },
            onError: (error) => {
                alert(`Erro ao excluir tarefa: ${error.message}`);
            },
        })
    );

    if(isLoading){
        return <p>Carregando as tarefas...</p>;
    }

    if(error){
        return <p>Erro ao carregar: {error.message}</p>;
    }

    return (
        <main className="min-h-screen bg-purple-700 p-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">

                {/*Nova Tarefa*/}
                <section className="rounded-xl border-2 border-black bg-purple-300 p-6">
                    <h1 className="mb-8 text-center text-3xl font-bold text-black">Nova Tarefa</h1>
                
                    <TaskForm
                        key={tarefaSelecionada?.id ?? 'nova'}
                        tarefa={tarefaSelecionada ?? undefined}
                        onCancel={() => setTarefaSelecionada(null)}
                    />
                </section>

                {/*Lista de Tarefas*/}
                <section className="rounded-xl border-2 border-black bg-purple-300 p-6">
                    <h1 className="mb-8 text-center text-3xl font-bold text-black">Listas de Tarefas</h1>
                    
                    {data?.length === 0 ? (
                        <p className="text-center text-gray-700">
                            Nenhuma tarefa para fazer.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-5">
                            {data?.map((tarefa) => (
                                <div
                                    key={tarefa.id}
                                    className="flex flex-col gap-3 rounded-lg border border-black/30 bg-purple-200 p-4 sm:flex-row sm:items-center"
                                >
                                    {/* Informações da tarefa */}
                                    <div className="flex-1 space-y-2">
                                        <div className="rounded-md bg-gray-100 p-3 text-black">
                                            <strong>{tarefa.titulo}</strong>
                                        </div>

                                        <div className="min-h-16 rounded-md bg-gray-100 p-3 text-black">
                                            {tarefa.descricao || 'Sem descrição'}
                                        </div>
                                    </div>

                                    {/* Botões */}
                                    <div className="flex flex-row gap-2 sm:flex-col">
                                        <button
                                            onClick={() => setTarefaSelecionada(tarefa)}
                                            className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-900"
                                        >
                                            Editar Tarefa
                                        </button>

                                        <button
                                            onClick={() => excluirTarefa.mutate({ id: tarefa.id })}
                                            disabled={excluirTarefa.isPending}
                                            className="rounded-full bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-900 disabled:opacity-50"
                                        >
                                            Concluir Tarefa
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}