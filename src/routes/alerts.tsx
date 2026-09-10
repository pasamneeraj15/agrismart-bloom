import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Bell, BellOff, Bug, CheckCheck, CloudSun, Droplets, IndianRupee, ListTodo } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alerts as seedAlerts, type Alert } from "@/data/agri";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Farm Alerts & Notifications — AgriSmart" },
      { name: "description", content: "Storm warnings, pest thresholds, irrigation reminders and task alerts for your farm in one feed." },
      { property: "og:title", content: "Farm Alerts & Notifications — AgriSmart" },
      { property: "og:description", content: "Every weather, pest, irrigation and market alert for your fields, sorted by urgency." },
    ],
  }),
  component: AlertsPage,
});

const categoryIcon: Record<Alert["category"], typeof Bell> = {
  Weather: CloudSun,
  Pest: Bug,
  Irrigation: Droplets,
  Task: ListTodo,
  Market: IndianRupee,
};

const severityStyle: Record<Alert["severity"], string> = {
  Critical: "border-l-destructive",
  Warning: "border-l-warning",
  Info: "border-l-primary",
};

const severityBadge: Record<Alert["severity"], string> = {
  Critical: "border-destructive/50 text-destructive",
  Warning: "border-warning/60 text-earth",
  Info: "border-primary/50 text-primary",
};

const filters = ["All", "Unread", "Weather", "Pest", "Irrigation", "Task", "Market"] as const;

function AlertsPage() {
  const [items, setItems] = useState(seedAlerts);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const unread = items.filter((a) => !a.read).length;

  const visible = useMemo(
    () =>
      items.filter((a) => {
        if (filter === "All") return true;
        if (filter === "Unread") return !a.read;
        return a.category === filter;
      }),
    [items, filter],
  );

  function toggleRead(id: string) {
    setItems((list) => list.map((a) => (a.id === id ? { ...a, read: !a.read } : a)));
  }

  function markAll() {
    setItems((list) => list.map((a) => ({ ...a, read: true })));
    toast.success("All alerts marked as read");
  }

  return (
    <AppShell
      title="Farm alerts"
      subtitle={unread > 0 ? `${unread} unread notification${unread === 1 ? "" : "s"}` : "You are all caught up"}
      action={
        <Button variant="outline" size="sm" className="hidden gap-2 sm:inline-flex" onClick={markAll}>
          <CheckCheck className="size-4" /> Mark all read
        </Button>
      }
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="card-soft flex flex-wrap gap-2 p-4">
          {filters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="rounded-full"
            >
              {f}
              {f === "Unread" && unread > 0 && <span className="ml-1.5 text-xs">({unread})</span>}
            </Button>
          ))}
        </div>

        <Button variant="outline" size="sm" className="gap-2 sm:hidden" onClick={markAll}>
          <CheckCheck className="size-4" /> Mark all read
        </Button>

        <ul className="space-y-3">
          {visible.map((a) => {
            const Icon = categoryIcon[a.category];
            return (
              <li
                key={a.id}
                className={cn(
                  "card-soft border-l-4 p-5",
                  severityStyle[a.severity],
                  !a.read && "bg-primary-soft/40",
                )}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold">{a.title}</h2>
                      <Badge variant="outline" className={severityBadge[a.severity]}>
                        {a.severity}
                      </Badge>
                      <Badge variant="secondary">{a.category}</Badge>
                      {!a.read && <span className="size-2 rounded-full bg-destructive" />}
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{a.detail}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-xs text-muted-foreground">{a.time}</span>
                      <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2" onClick={() => toggleRead(a.id)}>
                        {a.read ? <BellOff className="size-3.5" /> : <CheckCheck className="size-3.5" />}
                        {a.read ? "Mark unread" : "Mark read"}
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {visible.length === 0 && (
          <div className="card-soft grid place-items-center gap-2 p-12 text-center text-muted-foreground">
            <AlertTriangle className="size-6" />
            No alerts in this category right now.
          </div>
        )}
      </div>
    </AppShell>
  );
}
