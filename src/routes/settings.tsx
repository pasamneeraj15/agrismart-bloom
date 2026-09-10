import { createFileRoute } from "@tanstack/react-router";
import { Bell, Languages, MapPin, Ruler, Save, Sprout, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cropNames } from "@/data/agri";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Farmer Profile — AgriSmart" },
      { name: "description", content: "Manage your farmer profile, farm details, units, language and notification preferences in AgriSmart." },
      { property: "og:title", content: "Settings & Farmer Profile — AgriSmart" },
      { property: "og:description", content: "Update your farm size, main crops, units and alert preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Ramesh Patel",
    phone: "9876543210",
    email: "ramesh@farm.in",
    village: "Chennaraopet, Warangal",
    farmName: "Patel Green Farms",
    acres: "24",
    mainCrop: "Maize",
    soilType: "Black cotton soil",
    notes: "Six fields, drip irrigation in Field D and F.",
    units: "Metric (acre, kg, °C)",
    language: "English",
  });

  const [notify, setNotify] = useState({
    weather: true,
    pest: true,
    irrigation: true,
    tasks: true,
    market: false,
    sms: true,
  });

  const set = (key: keyof typeof profile) => (value: string) => setProfile((p) => ({ ...p, [key]: value }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Settings saved");
  }

  return (
    <AppShell title="Settings" subtitle="Your profile, farm details and alert preferences" action={<ThemeToggle />}>
      <form onSubmit={save} className="mx-auto max-w-4xl space-y-6">
        <section className="card-soft p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <User className="size-4 text-primary" /> Farmer profile
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={profile.name} onChange={(e) => set("name")(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile number</Label>
              <Input id="phone" value={profile.phone} onChange={(e) => set("phone")(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profile.email} onChange={(e) => set("email")(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="village">
                <MapPin className="mr-1 inline size-3.5" /> Village / district
              </Label>
              <Input id="village" value={profile.village} onChange={(e) => set("village")(e.target.value)} />
            </div>
          </div>
        </section>

        <section className="card-soft p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Sprout className="size-4 text-primary" /> Farm details
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="farmName">Farm name</Label>
              <Input id="farmName" value={profile.farmName} onChange={(e) => set("farmName")(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acres">Total area (acres)</Label>
              <Input id="acres" inputMode="decimal" value={profile.acres} onChange={(e) => set("acres")(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainCrop">Main crop</Label>
              <Select value={profile.mainCrop} onValueChange={set("mainCrop")}>
                <SelectTrigger id="mainCrop">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cropNames.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="soilType">Soil type</Label>
              <Input id="soilType" value={profile.soilType} onChange={(e) => set("soilType")(e.target.value)} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Field notes</Label>
              <Textarea id="notes" rows={3} value={profile.notes} onChange={(e) => set("notes")(e.target.value)} />
            </div>
          </div>
        </section>

        <section className="card-soft p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Ruler className="size-4 text-primary" /> Preferences
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="units">Units</Label>
              <Select value={profile.units} onValueChange={set("units")}>
                <SelectTrigger id="units">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Metric (acre, kg, °C)">Metric (acre, kg, °C)</SelectItem>
                  <SelectItem value="Hectare, quintal, °C">Hectare, quintal, °C</SelectItem>
                  <SelectItem value="Imperial (acre, lb, °F)">Imperial (acre, lb, °F)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">
                <Languages className="mr-1 inline size-3.5" /> Language
              </Label>
              <Select value={profile.language} onValueChange={set("language")}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["English", "हिंदी", "తెలుగు", "मराठी", "தமிழ்"].map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-medium">Appearance</p>
              <p className="text-sm text-muted-foreground">Switch between light and dark theme.</p>
            </div>
            <ThemeToggle />
          </div>
        </section>

        <section className="card-soft p-5 sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Bell className="size-4 text-primary" /> Notifications
          </h2>
          <ul className="mt-4 divide-y divide-border">
            {[
              ["weather", "Weather warnings", "Storms, heatwaves and heavy rain alerts"],
              ["pest", "Pest thresholds", "When scouting counts cross the action threshold"],
              ["irrigation", "Irrigation reminders", "Based on soil moisture and rain forecast"],
              ["tasks", "Task reminders", "Sprays, top dressing and harvest windows"],
              ["market", "Market prices", "Daily mandi rates for your crops"],
              ["sms", "SMS alerts", "Send critical alerts by text message too"],
            ].map(([key, title, body]) => (
              <li key={key} className="flex items-center justify-between gap-4 py-3.5">
                <div className="min-w-0">
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
                <Switch
                  checked={notify[key as keyof typeof notify]}
                  onCheckedChange={(v) => setNotify((n) => ({ ...n, [key]: v }))}
                  aria-label={title}
                />
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" className="gap-2">
            <Save className="size-4" /> Save changes
          </Button>
          <Button type="reset" size="lg" variant="outline">
            Discard
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
