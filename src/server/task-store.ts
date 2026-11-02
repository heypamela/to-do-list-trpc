export interface Tarefa {
    id: number;
    titulo: string;
    descricao?: string;
    dataCriacao: Date;
}

const globalForTasks = globalThis as typeof globalThis & {
    tarefas?: Tarefa[];
    nextId?: number;
}

export const tarefas = globalForTasks.tarefas ?? (globalForTasks.tarefas = []);

export function gerarId(): number {
    globalForTasks.nextId ??= 1;

    return globalForTasks.nextId++;
}