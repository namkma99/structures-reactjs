import { TodoList } from '@/features/todo';
import { Card, CardContent } from '@/components/ui/card';
import { useAppSelector } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';

export const HomePage = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="mb-1 text-4xl font-bold tracking-tight">Workspace</h1>
        <p className="text-muted-foreground">Modern React Boilerplate</p>
      </div>

      {user && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-2 p-4 font-medium text-primary">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-primary" />
            Welcome back, {user.name}!
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Active Projects</h2>
        <Card className="border-border p-6 shadow-sm">
          <TodoList />
        </Card>
      </div>
    </div>
  );
};
