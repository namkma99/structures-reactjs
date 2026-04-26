import { HomePage } from "@/features/home/components/HomePage";
import { getTodos } from "@/features/todo/api/get-todos";

export default async function Page() {
  const todos = await getTodos();

  return <HomePage todos={todos} />;
}
