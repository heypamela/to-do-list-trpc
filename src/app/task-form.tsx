'use client';

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

interface TaskFormProps {
    tarefa?: {
        id: number;
        titulo: string;
        descricao?: string;
        dataCriacao: string;
    };
    onCancel?: () => void;
}

export default function TaskForm({ tarefa, onCancel }: TaskFormProps){
    const [titulo, setTitulo] = useState(tarefa?.titulo ?? '');
    const [descricao, setDescricao] = useState(tarefa?.descricao ?? '');

    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const criarTarefa = useMutation(
        trpc.tarefas.criar.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: trpc.tarefas.listar.queryKey(),
                });

                setTitulo('');
                setDescricao('');

                alert('Tarefa salva com sucesso!');
            },
            onError: (error) => {
                alert('Erro ao salvar essa tarefa: ' + error.message);
            },
        })
    );

    const atualizarTarefa = useMutation(
        trpc.tarefas.atualizar.mutationOptions({
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: trpc.tarefas.listar.queryKey(),
                });

                onCancel?.();

                alert('Atualização feita!')
            },
            onError: (error) => {
                alert(`Erro ao atualizar: ${error.message}`);
            },
        })
    );

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();

                if (!titulo.trim()) {
                    alert('Título é obrigatório!');
                    return;
                }

                if (tarefa) {
                    atualizarTarefa.mutate({
                        id: tarefa.id,
                        titulo,
                        descricao: descricao || undefined,
                    });
                } else {
                    criarTarefa.mutate({
                        titulo,
                        descricao: descricao || undefined,
                    });
                }
            }}
            className="flex flex-col gap-6"
        >
            {/* Campo Título */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-3">
                <label
                    htmlFor="titulo"
                    className="font-semibold text-black"
                >
                    Título
                </label>

                <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    placeholder="Digite o título da sua tarefa"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full rounded-lg border border-gray-400 bg-gray-100 p-3 text-black outline-none focus:border-purple-700"
                />
            </div>

            {/* Campo Descrição */}
            <div className="grid grid-cols-[100px_1fr] items-start gap-3">
                <label
                    htmlFor="descricao"
                    className="pt-3 font-semibold text-black"
                >
                    Descrição
                </label>

                <textarea
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva sua tarefa (opcional)"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="min-h-36 w-full resize-y rounded-lg border border-gray-400 bg-gray-100 p-3 text-black outline-none focus:border-purple-700"
                />
            </div>

            {/* Botões */}
            <div className="flex flex-wrap gap-3 pl-[113px]">
                <button
                    type="submit"
                    disabled={criarTarefa.isPending || atualizarTarefa.isPending}
                    className="rounded-full bg-purple-700 px-8 py-3 font-semibold text-white transition hover:bg-purple-900 disabled:opacity-50"
                >
                    {criarTarefa.isPending || atualizarTarefa.isPending
                        ? 'Salvando...'
                        : tarefa
                            ? 'Atualizar tarefa'
                            : 'Salvar'}
                </button>

                {tarefa && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full bg-gray-500 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}