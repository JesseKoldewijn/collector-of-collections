"use client";

import { useEffect, useRef, useState } from "react";
import { LuFingerprint } from "react-icons/lu";

import { cn } from "@/utils/cn";

type CaptureButtonProps = {
  biometricsRpOptions: PublicKeyCredentialRpEntity;
  challangeKey: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const CaptureButton = ({
  className,
  biometricsRpOptions,
  challangeKey,
  ...rest
}: CaptureButtonProps) => {
  const biometricsInput = useRef<HTMLInputElement>(null);

  const [supported, setSupported] = useState(false);

  // https://webauthn.guide/
  const onCapture = async () => {
    if (!biometricsInput.current) {
      console.error("biometrics inputfield not found");
      return;
    }

    try {
      biometricsInput.current.value = "capturing";

      const opts: CredentialCreationOptions = {
        publicKey: {
          rp: biometricsRpOptions,
          challenge: Uint8Array.from(challangeKey, (c) => c.charCodeAt(0)),
          user: {
            id: Uint8Array.from("GlitchTechDevelopments", (c) =>
              c.charCodeAt(0),
            ),
            name: "dev@glitchtech.eu",
            displayName: "GlitchTech Developments",
          },
          pubKeyCredParams: [
            {
              alg: -257,
              type: "public-key",
            },
            {
              alg: -7,
              type: "public-key",
            },
          ],
          authenticatorSelection: {
            authenticatorAttachment: "cross-platform",
          },
          timeout: 60000,
          attestation: "direct",
        },
      };

      const bio = await navigator.credentials.create(opts);

      if (bio && biometricsInput.current) {
        const bioJSON = JSON.stringify(bio);
        biometricsInput.current.value = bioJSON;

        // get nearest button with type submit
        const submitButton = biometricsInput.current.closest("form");

        if (submitButton) {
          submitButton.click();
          console.log("form submitted");
        } else {
          console.error("form not found");
        }
      }
    } catch (error) {
      console.error("biometrics", error);
    }
  };

  useEffect(() => {
    const isSupported = window.PublicKeyCredential;

    if (isSupported) {
      setSupported(true);
    }
  }, []);

  if (!supported) return <></>;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <button
        className={cn("rounded-md border-2 border-neutral-100 px-3 py-2")}
        onClick={onCapture}
        {...rest}
      >
        <LuFingerprint className="pointer-events-none h-auto w-6" />

        <span className="sr-only">Use biometrics</span>
      </button>
      <input
        ref={biometricsInput}
        type="hidden"
        id="biometrics"
        name="biometrics"
        defaultValue="capturing"
      />
    </div>
  );
};
