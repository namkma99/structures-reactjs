"use client";

import { useQuery } from "@tanstack/react-query";
import { RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { HealthResponse } from "@/features/system/types";

const fetchHealth = async (): Promise<HealthResponse> => {
  const response = await fetch("/api/health");

  if (!response.ok) {
    throw new Error("Health check failed.");
  }

  return response.json() as Promise<HealthResponse>;
};

export function SystemStatusCard() {
  const health = useQuery({
    queryKey: ["system", "health"],
    queryFn: fetchHealth,
    staleTime: 30_000,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <CardDescription>
          Client query island backed by a route handler.
        </CardDescription>
        <CardAction>
          <Button
            aria-label="Refresh status"
            disabled={health.isFetching}
            onClick={() => void health.refetch()}
            size="icon-sm"
            type="button"
            variant="ghost"
          >
            {health.isFetching ? <Spinner /> : <RefreshCwIcon />}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3 text-sm">
          <StatusRow label="Status" value={health.data?.status ?? "checking"} />
          <StatusRow label="Region" value={health.data?.region ?? "local"} />
          <StatusRow
            label="Checked"
            value={
              health.data?.checkedAt
                ? new Date(health.data.checkedAt).toLocaleTimeString()
                : "pending"
            }
          />
        </dl>
      </CardContent>
    </Card>
  );
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/40 flex items-center justify-between gap-4 rounded-lg px-3 py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
