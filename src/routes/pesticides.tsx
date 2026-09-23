import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Search, ShieldCheck, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { SafeImage } from "@/components/safe-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cropNames, pesticides } from "@/data/agri";
import { protectionImageAlt, protectionImages } from "@/data/protection-images";

export const Route = createFileRoute("/pesticides")({
  head: () => ({
    meta: [
      { title: "Plant Protection Directory — AgriSmart" },
      {
        name: "description",
        content:
          "Learn which plant-protection categories target which crop pests, with safety guidance and a reminder to follow the product label.",
      },
      { property: "og:title", content: "Plant Protection Directory — AgriSmart" },
      {
        property: "og:description",
        content: "Educational reference of plant-protection categories, target pests and safety precautions by crop.",
      },
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
  const [term, setTerm] = useState("");
  const [query, setQuery] = useState("");
  const [crop, setCrop] = useState("All");
  const [type, setType] = useState<(typeof types)[number]>("All");

  useEffect(() => {
    const id = setTimeout(() => setQuery(term), 200);
    return () => clearTimeout(id);
  }, [term]);

  function runSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(term);
  }

  function clearSearch() {
    setTerm("");
    setQuery("");
  }

  const filtered = useMemo(
    () =>
      pesticides.filter((p) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.activeIngredient.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.crops.some((c) => c.toLowerCase().includes(q)) ||
          p.targets.some((t) => t.toLowerCase().includes(q));
        return matchesQuery && (crop === "All" || p.crops.includes(crop)) && (type === "All" || p.type === type);
      }),
    [query, crop, type],
  );

  return (
    <AppShell title="Plant protection" subtitle="Which categories target which pests — learning reference only">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="card-soft space-y-4 p-4 sm:p-5">
          <form onSubmit={runSearch} className="flex gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search by crop, pest or category"
                className="pl-9 pr-9"
                aria-label="Search plant protection entries"
              />
              {term && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            <Button type="submit" className="shrink-0 gap-2">
              <Search className="size-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>
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
            This directory is for learning only. AgriSmart does not give quantities or application instructions. Always
            read and follow the product label, and ask a qualified agricultural professional or a responsible adult
            before any chemical plant-protection product is used.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          {filtered.length} entr{filtered.length === 1 ? "y" : "ies"} found
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((p) => (
            <article key={p.id} className="card-soft overflow-hidden">
              <SafeImage
                src={protectionImages[p.type]}
                alt={protectionImageAlt[p.type] ?? `${p.type} illustration`}
                width={800}
                height={600}
                loading="lazy"
                className="h-40 w-full bg-primary-soft object-cover"
              />
              <div className="p-5">
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
                    <ShieldCheck className="size-4 text-primary" /> Safety precautions
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {p.safety.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Quantities, mixing and spraying are decided by the product label and a qualified professional.
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card-soft grid place-items-center gap-3 p-10 text-center text-muted-foreground">
            <p>No results found{query ? ` for “${query}”` : ""}. Try a crop name, a pest name or a category.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearSearch();
                setCrop("All");
                setType("All");
              }}
            >
              Clear search and filters
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
