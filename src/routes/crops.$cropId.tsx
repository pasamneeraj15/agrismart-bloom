import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bug, Droplets, Leaf, Lightbulb, Sprout, Timer, TrendingUp } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { crops } from "@/data/agri";

export const Route = createFileRoute("/crops/$cropId")({
  loader: ({ params }) => {
    const crop = crops.find((c) => c.id === params.cropId);
    if (!crop) throw notFound();
    return { crop };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Crop not found — AgriSmart" }, { name: "robots", content: "noindex" }] };
    }
    const { crop } = loaderData;
    const description = `${crop.name} growing guide: ${crop.season} season, ${crop.durationDays} day duration, soil, irrigation and pest management.`;
    return {
      meta: [
        { title: `${crop.name} Growing Guide — AgriSmart` },
        { name: "description", content: description },
        { property: "og:title", content: `${crop.name} Growing Guide — AgriSmart` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CropDetail,
});

function CropDetail() {
  const { crop } = Route.useLoaderData();

  return (
    <AppShell title={crop.name} subtitle={`${crop.category} · ${crop.season} season`}>
      <div className="mx-auto max-w-5xl space-y-6">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link to="/crops">
            <ArrowLeft className="size-4" /> All crops
          </Link>
        </Button>

        <section className="card-soft p-5 sm:p-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary-soft text-3xl">
              {crop.emoji}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-bold">{crop.name}</h2>
              <p className="text-sm text-muted-foreground">{crop.summary}</p>
            </div>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-4">
            {[
              [Timer, "Duration", `${crop.durationDays} days`],
              [Droplets, "Water need", crop.waterNeed],
              [TrendingUp, "Yield / acre", crop.yieldPerAcre],
              [Sprout, "Season", crop.season],
            ].map(([Icon, label, value]) => {
              const I = Icon as typeof Timer;
              return (
                <div key={label as string} className="rounded-xl bg-muted p-3">
                  <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <I className="size-3.5" /> {label as string}
                  </dt>
                  <dd className="mt-1 font-semibold">{value as string}</dd>
                </div>
              );
            })}
          </dl>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="card-soft p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Leaf className="size-4 text-primary" /> Soil profile
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Soil type</dt>
                <dd className="font-medium">{crop.soil.type}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Ideal pH</dt>
                <dd className="font-medium">{crop.soil.ph}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Field preparation</dt>
                <dd className="font-medium">{crop.soil.prep}</dd>
              </div>
            </dl>
          </section>

          <section className="card-soft p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Droplets className="size-4 text-sky" /> Irrigation schedule
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {crop.irrigation.map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sky" />
                  {i}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="card-soft p-5">
          <h3 className="text-lg font-semibold">Growth stages</h3>
          <ol className="mt-4 space-y-4">
            {crop.stages.map((s, i) => (
              <li key={s.name} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-medium">
                    {s.name} <span className="text-xs text-muted-foreground">· day {s.days}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{s.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="card-soft p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Bug className="size-4 text-destructive" /> Major pests
            </h3>
            <ul className="mt-4 space-y-4">
              {crop.pests.map((p) => (
                <li key={p.name}>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-muted-foreground">Signs: {p.sign}</p>
                  <p className="text-sm text-primary">Control: {p.control}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <p className="text-sm font-medium">Common diseases</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {crop.diseases.map((d) => (
                  <Badge key={d} variant="outline">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
            <Button asChild variant="outline" className="mt-5 w-full">
              <Link to="/pesticides">Find pesticides for {crop.name}</Link>
            </Button>
          </section>

          <section className="card-soft p-5">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Lightbulb className="size-4 text-warning" /> Field tips
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {crop.tips.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {t}
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-5 w-full">
              <Link to="/fertilizers">Fertilizer plan</Link>
            </Button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
