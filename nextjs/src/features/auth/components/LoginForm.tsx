"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  loginSchema,
  type LoginSchema,
} from "@/features/auth/schemas/login-schema";
import { useAppStore } from "@/stores/use-app-store";

export function LoginForm() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    setUser({ email: data.email, name: data.email.split("@")[0] ?? "User" });
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field data-invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="email"
            placeholder="you@example.com"
            type="email"
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={Boolean(errors.password)}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            aria-invalid={Boolean(errors.password)}
            autoComplete="current-password"
            id="password"
            placeholder="********"
            type="password"
            {...register("password")}
          />
          <FieldError errors={[errors.password]} />
        </Field>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Sign in
        </Button>
      </FieldGroup>
    </form>
  );
}
