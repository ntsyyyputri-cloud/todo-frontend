'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import TodoForm from './TodoForm';
import TodoList from './TodoList';

import { Button } from '@/app/components/ui/button';
import { authService } from '@/services/authService';
import { todoService } from '@/services/todoService';
import { ApiError } from '@/services/api';
import { Todo } from '@/types/todo';

export default function TodoApp() {
  const router = useRouter();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data todo saat halaman pertama kali dibuka
  useEffect(() => {
    const token = authService.getToken();

    if (!token) {
      router.replace('/login');
      return;
    }

    const loadTodos = async () => {
      try {
        setLoading(true);

        const data = await todoService.getTodos();

        const formatted: Todo[] = data.map((item) => ({
          id: item.id,
          title: item.todo,
          completed: Boolean(item.completed),
          createdAt: new Date().toISOString().split('T')[0],
        }));

        setTodos(formatted);
      } catch (err) {
        if (
          err instanceof ApiError &&
          (err.status === 401 || err.status === 403)
        ) {
          authService.logout();
          router.replace('/login');
          return;
        }

        const message =
          err instanceof Error
            ? err.message
            : 'Gagal mengambil data tugas';

        alert(message);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [router]);

  // Menambahkan tugas baru
  const handleAddTodo = async (title: string) => {
    try {
      const created = await todoService.createTodo({
        todo: title,
      });

      const newTodo: Todo = {
        id: created.id,
        title: created.todo,
        completed: Boolean(created.completed),
        createdAt: new Date().toISOString().split('T')[0],
      };

      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan';

      alert(`Gagal menambah tugas: ${message}`);
    }
  };

  // Mengubah status selesai / belum selesai
  const handleToggleTodo = async (id: number) => {
    const target = todos.find((todo) => todo.id === id);

    if (!target) return;

    const nextCompleted = !target.completed;

    // Update tampilan terlebih dahulu
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: nextCompleted,
            }
          : todo
      )
    );

    try {
      await todoService.updateTodo(id, {
        task: target.title,
        is_completed: nextCompleted,
      });
    } catch (err) {
      // Jika backend gagal, kembalikan status sebelumnya
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: target.completed,
              }
            : todo
        )
      );

      const message =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan';

      alert(`Gagal memperbarui status: ${message}`);
    }
  };

  // Menghapus tugas
  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);

      setTodos((prev) =>
        prev.filter((todo) => todo.id !== id)
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Terjadi kesalahan';

      alert(`Gagal menghapus tugas: ${message}`);
    }
  };

  // Logout
  const handleLogout = () => {
    authService.logout();
    router.replace('/login');
  };

  return (
    <div>
      {/* Form tambah tugas */}
      <TodoForm onAddTodo={handleAddTodo} />

      {/* Daftar tugas */}
      {loading ? (
        <div className="text-center p-8 text-gray-400 text-sm">
          Memuat data...
        </div>
      ) : (
        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      )}

      {/* Tombol logout */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
        <Button
          type="button"
          onClick={handleLogout}
          variant="destructive"
          size="sm"
          className="text-xs font-medium"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}