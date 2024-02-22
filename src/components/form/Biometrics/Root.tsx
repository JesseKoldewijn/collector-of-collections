import { Suspense } from "react";

import { env } from "@/env.mjs";

import { CaptureButton } from "./_helpers/CaptureButton";

type BiometricsAuthProps = {
  // --
} & React.HTMLAttributes<HTMLButtonElement>;

export const BiometricsAuth = ({ ...rest }: BiometricsAuthProps) => {
  const rootDomain = new URL(env.VERCEL_URL).hostname;

  const rpOpts: PublicKeyCredentialRpEntity = {
    id: rootDomain,
    name: "Collector of Collections",
  };

  const chalangeKey = Uint8Array.from(env.BIOMETRICS_SECRET, (c) =>
    c.charCodeAt(0),
  ).toString();

  return (
    <Suspense>
      <CaptureButton
        biometricsRpOptions={rpOpts}
        challangeKey={chalangeKey}
        {...rest}
      />
    </Suspense>
  );
};
