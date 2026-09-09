import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Bug, CloudSun, FlaskConical, Leaf, ScanLine, Sprout, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroFarm from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriSmart — Smart Farming, Better Future" },
      {
        name: "description",
        content:
          "AgriSmart helps farmers plan crops, pick the right pesticides and fertilizers, track weather, and detect plant disease from a leaf photo.",
      },
      { property: "og:title", content: "AgriSmart — Smart Farming, Better Future" },
      {
        property: "og:description",
        content: "Crop guides, pesticide and fertilizer advice, weather advisories and leaf disease scanning in one place.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Sprout, title: "Crop catalog", body: "Season, soil, irrigation and pest profiles for every crop you grow." },
  { icon: Bug, title: "Pesticide directory", body: "Target pests, dosage per acre and safety rules, filtered by crop." },
  { icon: FlaskConical, title: "Fertilizer guide", body: "Organic, inorganic and biofertilizer options with exact rates." },
  { icon: CloudSun, title: "Weather advisories", body: "Five-day forecast translated into spray and irrigation decisions." },
  { icon: ScanLine, title: "Plant scan", body: "Upload a leaf photo and get a diagnosis with a treatment plan." },
  { icon: Bell, title: "Farm alerts", body: "Pest thresholds, storm warnings and task reminders in one feed." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <Leaf className="size-5" />
            </span>
            <span className="truncate font-display text-lg font-bold">AgriSmart</span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-foreground">
              <Leaf className="size-3.5" /> For every farmer, every season
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Smart Farming,
              <br />
              <span className="text-primary">Better Future</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Plan your crops, choose safe inputs, read the weather and catch disease early — all from one calm,
              easy dashboard built around how farms actually work.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2">
                <Link to="/register">
                  Create free account <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">Explore the demo</Link>
              </Button>
            </div>
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
              {[
                ["8", "Crop guides"],
                ["5-day", "Forecast"],
                ["24/7", "Farm alerts"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="text-2xl font-bold text-primary">{value}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-lift">
            <img
              src={heroFarm}
              alt="Rows of young crops on a green farm at golden hour"
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-2xl font-bold sm:text-3xl">Everything your farm needs</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Practical, field-tested guidance instead of guesswork — organised the way a season unfolds.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-soft p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-lift sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Start your smarter season today</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm opacity-90 sm:text-base">
            Set up your farm profile in two minutes and get advisories tuned to your crops and your weather.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-7">
            <Link to="/register">Get started free</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
        AgriSmart · Smart Farming, Better Future
      </footer>
    </div>
  );
}
