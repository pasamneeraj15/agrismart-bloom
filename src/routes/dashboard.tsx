import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  CloudSun,
  Droplets,
  Lightbulb,
  Sprout,
  TrendingUp,
  Wind,
  LandPlot,
} from "lucide-react";
import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { alerts, farmMetrics, forecast, recommendations, tasks as seedTasks, weatherNow } from "@/data/agri";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Farm Dashboard — AgriSmart" },
      { name: "description", content: "Farm overview metrics, weather summary, pending tasks and tailored recommendations for your fields." },
      { property: "og:title", content: "Farm Dashboard — AgriSmart" },
      { property: "og:description", content: "See your farm at a glance: area, crops, yield estimate, weather and today's tasks." },
    ],
  }),
  component: Dashboard,
});

const icons = { land: LandPlot, crop: Sprout, yield: TrendingUp, water: Droplets } as const;

function Dashboard() {
  const [tasks, setTasks] = useState(seedTasks);
  const pending = tasks.filter((t) => !t.done);
  const urgentAlerts = alerts.filter((a) => !a.read).slice(0, 3);

  return (
    <AppShell title="Good morning, Ramesh" subtitle="Wednesday, 9 September · Warangal, Telangana">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {farmMetrics.map((m) => {
            const Icon = icons[m.icon as keyof typeof icons];
            return (
              <div key={m.label} className="card-soft p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="size-4" />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold">{m.value}</p>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{m.change}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="card-soft p-5 lg:col-span-2">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h2 className="truncate text-lg font-semibold">Weather summary</h2>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link to="/weather">
                  5-day <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-4 grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div className="flex items-center gap-4">
                <CloudSun className="size-14 text-warning" />
                <div>
                  <p className="text-4xl font-bold">{weatherNow.temp}°C</p>
                  <p className="text-sm text-muted-foreground">
                    {weatherNow.condition} · feels {weatherNow.feelsLike}°C
                  </p>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                {[
                  ["Humidity", `${weatherNow.humidity}%`],
                  ["Wind", `${weatherNow.wind} km/h`],
                  ["Rain", `${weatherNow.rainfall} mm`],
                  ["UV index", `${weatherNow.uv}`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-muted px-3 py-2">
                    <dt className="text-xs text-muted-foreground">{k}</dt>
                    <dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-4 rounded-xl bg-primary-soft p-3 text-sm">
              <span className="font-semibold">Advisory: </span>
              {forecast[0].advisory}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Droplets className="size-4" /> Soil moisture
                </span>
                <span className="font-semibold">{weatherNow.soilMoisture}%</span>
              </div>
              <Progress value={weatherNow.soilMoisture} className="mt-2" />
            </div>
          </section>

          <section className="card-soft p-5">
            <h2 className="text-lg font-semibold">Pending tasks</h2>
            <p className="text-sm text-muted-foreground">{pending.length} to do this week</p>
            <ul className="mt-4 space-y-3">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-3">
                  <Checkbox
                    id={task.id}
                    checked={task.done}
                    onCheckedChange={(v) =>
                      setTasks((ts) => ts.map((t) => (t.id === task.id ? { ...t, done: Boolean(v) } : t)))
                    }
                    className="mt-0.5"
                  />
                  <label htmlFor={task.id} className="min-w-0 flex-1 cursor-pointer">
                    <span className={task.done ? "text-sm line-through text-muted-foreground" : "text-sm font-medium"}>
                      {task.title}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {task.field} · {task.due}
                      <Badge
                        variant="outline"
                        className={
                          task.priority === "High"
                            ? "border-destructive/40 text-destructive"
                            : task.priority === "Medium"
                              ? "border-warning/50 text-earth"
                              : ""
                        }
                      >
                        {task.priority}
                      </Badge>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="text-lg font-semibold">Recommendations for your farm</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {recommendations.map((r) => (
                <article key={r.title} className="card-soft p-5">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="size-4 shrink-0 text-warning" />
                    <Badge variant="secondary">{r.tag}</Badge>
                  </div>
                  <h3 className="mt-3 font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{r.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="card-soft p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h2 className="truncate text-lg font-semibold">Latest alerts</h2>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link to="/alerts">
                  All <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <ul className="mt-4 space-y-4">
              {urgentAlerts.map((a) => (
                <li key={a.id} className="border-l-2 border-destructive/60 pl-3">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{a.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.time}</p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-primary-soft p-3 text-sm">
              <Wind className="size-4 shrink-0 text-primary" />
              Storm expected Friday — finish spraying today.
            </div>
            <Button asChild className="mt-4 w-full gap-2">
              <Link to="/scan">
                <CheckCircle2 className="size-4" /> Scan a plant leaf
              </Link>
            </Button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
