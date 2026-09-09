import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Search, Timer } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { crops } from "@/data/agri";

export const Route = createFileRoute("/crops")({
  head: () => ({
    meta: [
      { title: "Crop Catalog — AgriSmart" },
      { name: "description", content: "Search crop guides for wheat, rice, cotton, tomato, potato and more, with soil, irrigation and pest profiles." },
      { property: "og:title", content: "Crop Catalog — AgriSmart" },
      { property: "og:description", content: "Growing calendars, soil needs, irrigation schedules and pest control for every major crop." },
    ],
  }),
  component: CropsPage,
});

const seasons = ["All", "Kharif", "Rabi", "Zaid", "Year-round"] as const;

function CropsPage() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState<(typeof seasons)[number]>("All");
  const [crop, setCrop] = useState("All");

  const filtered = useMemo(
    () =>
      crops.filter((c) => {
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q);
        return matchesQuery && (season === "All" || c.season === season) && (crop === "All" || c.name === crop);
      }),
    [query, season, crop],
  );

  return (
    <AppShell title="Crop catalog" subtitle="Growing, soil and pest profiles for your crops">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="card-soft space-y-4 p-4 sm:p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search crops, categories or keywords"
              className="pl-9"
              aria-label="Search crops"
            />
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {["All", ...crops.map((c) => c.name)].map((name) => (
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
              {seasons.map((s) => (
                <Button
                  key={s}
                  size="sm"
                  variant={season === s ? "secondary" : "ghost"}
                  onClick={() => setSeason(s)}
                  className="rounded-full"
                >
                  {s === "All" ? "All seasons" : s}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {filtered.length} crop{filtered.length === 1 ? "" : "s"} found
        </p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.id}
              to="/crops/$cropId"
              params={{ cropId: c.id }}
              className="card-soft block p-5 hover:-translate-y-0.5"
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-2xl">
                  {c.emoji}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold">{c.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {c.category} · {c.season}
                  </p>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{c.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <Badge variant="secondary" className="gap-1">
                  <Timer className="size-3" /> {c.durationDays} days
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Droplets className="size-3" /> {c.waterNeed} water
                </Badge>
                <Badge variant="outline">{c.yieldPerAcre}/acre</Badge>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card-soft p-10 text-center text-muted-foreground">
            No crops match your search. Try clearing the filters.
          </div>
        )}
      </div>
    </AppShell>
  );
}
