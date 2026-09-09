import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cropNames, pesticides } from "@/data/agri";

export const Route = createFileRoute("/pesticides")({
  head: () => ({
    meta: [
      { title: "Pesticide Directory — AgriSmart" },
      { name: "description", content: "Find the right pesticide by crop and target pest, with dosage per acre, spray interval and safety guidelines." },
      { property: "og:title", content: "Pesticide Directory — AgriSmart" },
      { property: "og:description", content: "Dosage per acre, pre-harvest intervals and safe handling rules for common farm pesticides." },
    ],
  }),
  component: PesticidesPage,
});

const types = ["All", "Insecticide", "Fungicide", "Herbicide", "Bio-pesticide"] as const;

const toxicityClass = {
  Low: "border-success/50 text-success",
  Moderate: "border-warning/60 text-earth",
  High: "border-destructive/50 text-destructive",
} as const;

function PesticidesPage() {
  const [query, setQuery] = useState("");
  const [crop, setCrop] = useState("All");
  const [type, setType] = useState<(typeof types)[number]>("All");

  const filtered = useMemo(
    () =>
      pesticides.filter((p) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.activeIngredient.toLowerCase().includes(q) ||
          p.targets.some((t) => t.toLowerCase().includes(q));
        return matchesQuery && (crop === "All" || p.crops.includes(crop)) && (type === "All" || p.type === type);
      }),
    [query, crop, type],
  );

  return (
    <AppShell title="Pesticides" subtitle="Target pests, dosage per acre and safe handling">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="card-soft space-y-4 p-4 sm:p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product, ingredient or pest"
              className="pl-9"
              aria-label="Search pesticides"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...cropNames].map((name) => (
              <Button
                key={name}
                size="sm"
                variant={crop === name ? "default" : "outline"}
                onClick={() => setCrop(name)}
                className="rounded-full"
              >
                {name}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <Button
                key={t}
                size="sm"
                variant={type === t ? "secondary" : "ghost"}
                onClick={() => setType(t)}
                className="rounded-full"
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-warning/40 bg-warning/10 p-4 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-earth" />
          <p>
            Always read the product label before use. Respect the pre-harvest interval and never mix two products
            unless the label allows it.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          {filtered.length} product{filtered.length === 1 ? "" : "s"} found
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((p) => (
            <article key={p.id} className="card-soft p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <p className="text-xs text-muted-foreground">Active ingredient: {p.activeIngredient}</p>
                </div>
                <Badge variant="outline" className={toxicityClass[p.toxicity]}>
                  {p.toxicity} toxicity
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">{p.type}</Badge>
                {p.crops.map((c) => (
                  <Badge key={c} variant="outline">
                    {c}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Dosage per acre</p>
                  <p className="text-sm font-semibold">{p.dosagePerAcre}</p>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <p className="text-xs text-muted-foreground">Spray interval</p>
                  <p className="text-sm font-semibold">{p.interval}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium">Target pests</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.targets.map((t) => (
                    <Badge key={t} className="bg-primary-soft text-foreground">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-primary-soft p-3">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="size-4 text-primary" /> Safety guidelines
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {p.safety.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted-foreground">{p.phi}</p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card-soft p-10 text-center text-muted-foreground">
            No products match these filters. Try a different crop or pest.
          </div>
        )}
      </div>
    </AppShell>
  );
}
