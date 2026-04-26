import { describe, expect, it } from "vitest";
import { loginSchema } from "@/features/auth/schemas/login-schema";

describe("loginSchema", () => {
  it("accepts a valid login payload", () => {
    expect(
      loginSchema.safeParse({
        email: "user@example.com",
        password: "password123",
      }).success
    ).toBe(true);
  });

  it("rejects invalid email and short password", () => {
    expect(
      loginSchema.safeParse({ email: "invalid", password: "short" }).success
    ).toBe(false);
  });
});
