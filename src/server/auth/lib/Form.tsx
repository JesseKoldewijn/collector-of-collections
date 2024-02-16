"use client";

import React, { useEffect } from "react";
import { useFormState } from "react-dom";

import { cn } from "@/utils/cn";

import type { ActionResult } from "./Actions";

/* eslint-disable @typescript-eslint/no-explicit-any */

type FormProps = {
  action: (prevState: any, formData: FormData) => Promise<ActionResult>;
  externalCaptureState?: (state: ActionResult) => void;
  displayErrors?: boolean;
} & Omit<React.HTMLProps<HTMLFormElement>, "action">;

export const Form = ({
  action,
  externalCaptureState,
  displayErrors,
  className,
  children,
  ...rest
}: FormProps) => {
  const [state, formAction] = useFormState(action, {
    error: null,
  });

  useEffect(() => {
    if (externalCaptureState) {
      externalCaptureState(state);
    }
  });

  return (
    <form action={formAction} className={className} {...rest}>
      {children}

      {displayErrors !== false && state && (
        <span
          className={cn(
            "flex w-full max-w-sm items-center justify-center truncate whitespace-nowrap pb-2 text-center text-red-600",
          )}
        >
          {state.error}
        </span>
      )}
    </form>
  );
};
