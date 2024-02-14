"use client";

import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";

import type { ActionResult } from "./Actions";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function Form({
  children,
  action,
}: {
  children: React.ReactNode;
  action: (prevState: any, formData: FormData) => Promise<ActionResult>;
}) {
  const [state, formAction] = useFormState(action, {
    error: null,
  });

  return (
    <form action={formAction}>
      <div className="flex w-full max-w-sm flex-col gap-2 rounded-md border-2 border-neutral-100 px-4 py-2">
        {children}

        {state.error && (
          <span className="flex w-full max-w-sm items-center justify-center truncate whitespace-nowrap pb-2 text-center text-red-600">
            {state.error}
          </span>
        )}
      </div>
    </form>
  );
}
