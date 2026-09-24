import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Recycle, Search, Sparkles, TestTube, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fertilizers, type Fertilizer } from "@/data/agri";

export const Route = createFileRoute("/fertilizers")({
  head: () => ({
    meta: [
      { title: "Fertilizer Guide — AgriSmart" },
      { name: "description", content: "Organic, inorganic and biofertilizer options with nutrient content, dose per acre and application timing." },
      { property: "og:title", content: "Fertilizer Guide — AgriSmart" },
      { property: "og:description", content: "Compare organic manures, chemical fertilizers and biofertilizers for your crops." },
    ],
  }),
  component: FertilizersPage,
});

const groups = [
  {
    key: "Organic" as const,
    icon: Recycle,
    blurb: "Builds soil carbon and structure over seasons. Slow release, long benefit.",
  },
  {
    key: "Inorganic" as const,
    icon: TestTube,
    blurb: "Fast, precise nutrition. Split doses and moist soil keep losses low.",
  },
  {
    key: "Biofertilizer" as const,
    icon: Sparkles,
    blurb: "Living microbes that fix nitrogen or unlock soil phosphorus.",
  },
];

function FertilizerCard({ f }: { f: Fertilizer }) {
  return (
    <article className="card-soft p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <h3 className="text-lg font-semibold">{f.name}</h3>
        <Badge variant="secondary" className="shrink-0">
          {f.category}
        </Badge>
      </div>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Leaf className="size-4 shrink-0 text-primary" /> {f.nutrients}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-muted p-3">
          <p className="text-xs text-muted-foreground">Dose per acre</p>
          <p className="text-sm font-semibold">{f.dosePerAcre}</p>
        </div>
        <div className="rounded-xl bg-muted p-3">
          <p className="text-xs text-muted-foreground">When to apply</p>
          <p className="text-sm font-semibold">{f.timing}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {f.bestFor.map((c) => (
          <Badge key={c} variant="outline">
            {c}
          </Badge>
        ))}
      </div>
      <p className="mt-4 rounded-xl bg-primary-soft p-3 text-sm">{f.notes}</p>
    </article>
  );
}

function FertilizersPage() {
  const [term, setTerm] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setQuery(term), 200);
    return () => clearTimeout(id);
  }, [term]);

  function runSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(term);
  }

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fertilizers;
    return fertilizers.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.nutrients.toLowerCase().includes(q) ||
        f.bestFor.some((c) => c.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <AppShell title="Fertilizers" subtitle="Organic, inorganic and biofertilizer options">
      <div className="mx-auto max-w-6xl space-y-6">
        <form onSubmit={runSearch} className="card-soft flex gap-2 p-4">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search fertilizers, nutrients or crops"
              className="pl-9 pr-9"
              aria-label="Search fertilizers"
            />
            {term && (
              <button
                type="button"
                onClick={() => {
                  setTerm("");
                  setQuery("");
                }}
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

        {matches.length === 0 && (
          <div className="card-soft p-10 text-center text-muted-foreground">
            No results found for “{query}”. Try a crop name or a nutrient.
          </div>
        )}

        <Tabs defaultValue="Organic">
          <TabsList className="w-full">
            {groups.map(({ key, icon: Icon }) => (
              <TabsTrigger key={key} value={key} className="gap-1.5">
                <Icon className="size-4" />
                <span className="truncate">{key === "Biofertilizer" ? "Bio" : key}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {groups.map(({ key, blurb }) => {
            const list = matches.filter((f) => f.category === key);
            return (
              <TabsContent key={key} value={key} className="space-y-5 pt-5">
                <p className="text-sm text-muted-foreground">{blurb}</p>
                {list.length === 0 ? (
                  <div className="card-soft p-8 text-center text-sm text-muted-foreground">
                    No {key.toLowerCase()} options match your search.
                  </div>
                ) : (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {list.map((f) => (
                      <FertilizerCard key={f.id} f={f} />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        <section className="card-soft p-5">
          <h2 className="text-lg font-semibold">Golden rules of fertilizing</h2>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {[
              "Test your soil once every two years and dose to the report, not to habit.",
              "Split nitrogen into 2-3 applications — a single heavy dose is mostly lost.",
              "Apply to moist soil and irrigate lightly afterwards.",
              "Never mix biofertilizers with chemical fungicides.",
              "Place phosphorus near the root zone; broadcasting wastes it.",
              "Combine organic matter with chemicals for lasting fertility.",
            ].map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {r}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
