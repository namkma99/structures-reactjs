import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges tailwind classes predictably", () => {
    expect(cn("px-2", "px-4", false && "hidden")).toBe("px-4");
  });
});
