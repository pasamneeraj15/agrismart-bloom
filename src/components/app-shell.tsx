import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bug,
  CloudSun,
  LayoutDashboard,
  Leaf,
  Menu,
  ScanLine,
  Settings,
  Sprout,
  FlaskConical,
  LogOut,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { alerts } from "@/data/agri";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/crops", label: "Crops", icon: Sprout },
  { to: "/pesticides", label: "Pesticides", icon: Bug },
  { to: "/fertilizers", label: "Fertilizers", icon: FlaskConical },
  { to: "/weather", label: "Weather", icon: CloudSun },
  { to: "/scan", label: "Plant Scan", icon: ScanLine },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const mobileNav = nav.filter((item) =>
  ["/dashboard", "/crops", "/scan", "/weather", "/alerts"].includes(item.to),
);

const unread = alerts.filter((a) => !a.read).length;

export function Brand({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
        <Leaf className="size-5" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">AgriSmart</span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {nav.map(({ to, label, icon: Icon }) => {
        const active = pathname === to || pathname.startsWith(`${to}/`);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-primary-soft hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
            {to === "/alerts" && unread > 0 && (
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-xs font-semibold",
                  active ? "bg-primary-foreground text-primary" : "bg-destructive text-destructive-foreground",
                )}
              >
                {unread}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 lg:flex">
        <Brand />
        <div className="mt-7 min-h-0 flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        <div className="rounded-2xl bg-primary-soft p-3">
          <p className="text-sm font-semibold">Ramesh Patel</p>
          <p className="text-xs text-muted-foreground">Warangal · 24 acres</p>
          <Button asChild variant="ghost" size="sm" className="mt-2 w-full justify-start gap-2 px-2">
            <Link to="/login">
              <LogOut className="size-4" /> Sign out
            </Link>
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-4">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <Brand />
                <div className="mt-6">
                  <NavLinks onNavigate={() => setOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
              {subtitle && <p className="truncate text-xs text-muted-foreground sm:text-sm">{subtitle}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {action}
              <Button asChild variant="ghost" size="icon" className="relative" aria-label="Alerts">
                <Link to="/alerts">
                  <Bell className="size-5" />
                  {unread > 0 && (
                    <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="px-4 pb-28 pt-5 sm:px-6 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur lg:hidden">
        <ul className="grid grid-cols-5">
          {mobileNav.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium"
              >
                <Icon className="size-5" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
