import type { ReactNode } from "react";
import { ECGBackground } from "./ECGBackground";
import { HartzLogo } from "./HartzLogo";
import { Disclaimer } from "./Disclaimer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <ECGBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-5 pt-10 pb-6 sm:max-w-[480px]">
        <header className="pb-6">
          <HartzLogo />
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <Disclaimer />
      </div>
    </div>
  );
}
