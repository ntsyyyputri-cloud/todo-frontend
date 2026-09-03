'use client';

import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/types/todo';

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
};

export default function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (!todos || todos.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500">
          Belum ada tugas. Yuk, tambahkan tugas pertama!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* bagian judul */}
      <div className="flex items-center justify-between mb-4"></div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}