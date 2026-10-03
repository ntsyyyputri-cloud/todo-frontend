import React from 'react';
import Link from 'next/link';
import { Todo } from '@/types/todo';

type TaskDetailCardProps = {
  todo: Todo;
};

export default function TaskDetailCard({ todo }: TaskDetailCardProps) {
  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-dark-70">
      <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
        <header className="mb-4 border-b border-gray-100 pb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-dark-130">
            Detail Tugas
          </h1>

          <Link
            href="/"
            className="text-xs font-semibold bg-gray-200 hover:bg-gray-300 text-dark-70 border border-gray-200 px-3.5 py-2 rounded-lg transition shadow-xs"
          >
            ← Kembali ke Daftar
          </Link>
        </header>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              ID Tugas
            </label>

            <div className="mt-1">
              <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-md">
                #{todo.id}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Judul Tugas
            </label>

            <h2 className="text-xl font-bold text-dark-130 mt-0.5">
              {todo.title}
            </h2>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </label>

            <div className="mt-1">
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-md ${
                  todo.completed
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {todo.completed ? '✓ Selesai' : '⌛ Belum Selesai'}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tanggal Dibuat
            </label>

            <p className="text-gray-500 text-sm mt-1">
              {todo.createdAt}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}