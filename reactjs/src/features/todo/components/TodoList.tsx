import { useDeferredValue } from 'react';
import { useTodos } from '../hooks/use-todos';
import { useTodoViewStore } from '../stores/use-todo-view-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Search from 'lucide-react/dist/esm/icons/search';

export const TodoList = () => {
  const { data, isLoading, isError, error } = useTodos();
  const filter = useTodoViewStore((state) => state.filter);
  const setFilter = useTodoViewStore((state) => state.setFilter);
  const searchQuery = useTodoViewStore((state) => state.searchQuery);
  const setSearchQuery = useTodoViewStore((state) => state.setSearchQuery);
  const deferredSearchQuery = useDeferredValue(searchQuery.trim().toLowerCase());

  if (isLoading)
    return (
      <div className="animate-pulse p-8 text-center text-muted-foreground">Loading todos...</div>
    );
  if (isError)
    return (
      <div className="p-8 text-center text-destructive">Error: {(error as Error).message}</div>
    );

  const visibleTodos = [];

  for (const todo of data ?? []) {
    if (filter === 'completed' && !todo.completed) continue;
    if (filter === 'pending' && todo.completed) continue;
    if (deferredSearchQuery && !todo.title.toLowerCase().includes(deferredSearchQuery)) continue;

    visibleTodos.push(todo);
    if (visibleTodos.length === 10) break;
  }

  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl">Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-0">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'completed', 'pending'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
                className="h-8 px-3 capitalize"
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        <ul className="space-y-3">
          {visibleTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between rounded-xl border p-4 transition-all hover:bg-accent/50 ${
                todo.completed ? 'bg-muted/50 opacity-60' : 'border-border bg-card shadow-sm'
              }`}
            >
              <span
                className={todo.completed ? 'text-muted-foreground line-through' : 'font-medium'}
              >
                {todo.title}
              </span>
              <Badge variant={todo.completed ? 'secondary' : 'outline'} className="ml-2">
                {todo.completed ? 'Done' : 'ToDo'}
              </Badge>
            </li>
          ))}
          {visibleTodos.length === 0 ? (
            <li className="rounded-xl border-2 border-dashed py-8 text-center text-muted-foreground">
              No tasks matched your search.
            </li>
          ) : null}
        </ul>
      </CardContent>
    </Card>
  );
};
