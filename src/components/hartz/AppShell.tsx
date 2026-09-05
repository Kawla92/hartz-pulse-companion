import type { ReactNode } from "react";
import { ECGBackground } from "./ECGBackground";
import { HartzLogo } from "./HartzLogo";
import { Disclaimer } from "./Disclaimer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ECGBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-5 pt-10 pb-8 sm:max-w-[460px] sm:px-6 sm:pt-12">
        <header className="pb-7">
          <HartzLogo />
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <Disclaimer />
      </div>
    </div>
  );
}
