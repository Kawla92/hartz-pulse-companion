import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/hartz/AppShell";
import { PrimaryButton } from "@/components/hartz/PrimaryButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Härtz – Heart Rate Companion" },
      {
        name: "description",
        content:
          "Härtz is a wellness companion for adults 18+ that simulates heart-rate readings in the context of stress, fatigue and activity. Not a medical device.",
      },
      { property: "og:title", content: "Härtz – Heart Rate Companion" },
      {
        property: "og:description",
        content:
          "A calm, mobile-first wellness prototype that shows how heart-rate information can be presented in context. Not a medical device.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex flex-1 flex-col justify-center gap-10 py-6">
        <section className="soft-rise space-y-5 rounded-3xl bg-card/90 px-6 py-7 text-[0.95rem] leading-relaxed text-card-foreground">
          <h1 className="sr-only">Härtz – Heart Rate Companion</h1>
          <p>
            Härtz is a heart rate app, it is a wellness tool intended exclusively for adults over
            the age of 18.
          </p>
          <p>It allows you to observe the impact of stress and fatigue on the body.</p>
          <p>
            It is not a medical device and does not in any way replace the advice, diagnosis, or
            care of a cardiologist.
          </p>
          <p>
            In the event of chest pain, dizziness, or persistent palpitations, contact a doctor
            immediately.
          </p>
        </section>

        <PrimaryButton onClick={() => navigate({ to: "/status" })}>Start</PrimaryButton>
      </div>
    </AppShell>
  );
}
