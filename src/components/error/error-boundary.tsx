"use client";

import { Button, Card } from "@/components/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as Sentry from "@sentry/nextjs";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";

interface ErrorFallbackProps extends FallbackProps {
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Card className="flex flex-col gap-2 border-red-200 bg-red-50 p-4">
      <h2 className="font-semibold text-red-800">
        데이터를 불러오지 못했습니다
      </h2>
      <p className="text-sm text-red-600">{error.message}</p>
      <Button
        onClick={resetErrorBoundary}
        className="mt-2 bg-red-100 px-3 py-1 text-red-800 hover:bg-red-200"
      >
        다시 시도
      </Button>
    </Card>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        queryClient.clear();
        router.refresh();
      }}
      onError={(error: Error, info: React.ErrorInfo) => {
        Sentry.captureException(error, {
          extra: {
            componentStack: info.componentStack ?? "Unknown stack",
          },
        });
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
