import React from 'react';
import { getTodoDetail } from '@/lib/todo';
import TaskDetailCard from './TaskDetailCard';
import TaskNotFound from './TaskNotFound';

type DetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TodoDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const todo = await getTodoDetail(id);

  if (!todo) {
    return <TaskNotFound id={id} />;
  }

  return <TaskDetailCard todo={todo} />;
}