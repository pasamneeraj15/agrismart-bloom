import { createFileRoute } from "@tanstack/react-router";
import {
  CloudRain,
  CloudSun,
  Cloudy,
  Droplets,
  Sun,
  Sunrise,
  Sunset,
  Wind,
  Zap,
  Info,
} from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { forecast, weatherNow, type Forecast } from "@/data/agri";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "Weather & Advisories — AgriSmart" },
      { name: "description", content: "Five-day farm weather forecast with spray, irrigation and harvest advisories for your fields." },
      { property: "og:title", content: "Weather & Advisories — AgriSmart" },
      { property: "og:description", content: "Rain chance, humidity, wind and daily farming advisories for the week ahead." },
    ],
  }),
  component: WeatherPage,
});

const conditionIcon: Record<Forecast["condition"], typeof Sun> = {
  Sunny: Sun,
  "Partly Cloudy": CloudSun,
  Cloudy: Cloudy,
  Rain: CloudRain,
  Thunderstorm: Zap,
};

function WeatherPage() {
  const today = forecast[0]!;
  const TodayIcon = conditionIcon[today.condition];

  return (
    <AppShell title="Weather" subtitle={`${weatherNow.location} · updated just now`}>
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="card-soft overflow-hidden">
          <div className="bg-primary p-6 text-primary-foreground sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div className="flex items-center gap-4">
                <TodayIcon className="size-16 shrink-0" />
                <div>
                  <p className="text-5xl font-bold">{weatherNow.temp}°C</p>
                  <p className="text-sm opacity-90">
                    {weatherNow.condition} · feels like {weatherNow.feelsLike}°C
                  </p>
                </div>
              </div>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  [Droplets, "Humidity", `${weatherNow.humidity}%`],
                  [Wind, "Wind", `${weatherNow.wind} km/h`],
                  [CloudRain, "Rain today", `${weatherNow.rainfall} mm`],
                  [Sun, "UV index", `${weatherNow.uv}`],
                  [Sunrise, "Sunrise", weatherNow.sunrise],
                  [Sunset, "Sunset", weatherNow.sunset],
                ].map(([Icon, label, value]) => {
                  const I = Icon as typeof Sun;
                  return (
                    <div key={label as string} className="rounded-xl bg-primary-foreground/15 px-3 py-2">
                      <dt className="flex items-center gap-1.5 text-xs opacity-90">
                        <I className="size-3.5" /> {label as string}
                      </dt>
                      <dd className="font-semibold">{value as string}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
          <div className="p-5">
            <p className="flex items-start gap-2 text-sm">
              <Info className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                <span className="font-semibold">Today's advisory: </span>
                {today.advisory}
              </span>
            </p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Soil moisture</span>
                <span className="font-semibold">{weatherNow.soilMoisture}%</span>
              </div>
              <Progress value={weatherNow.soilMoisture} className="mt-2" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">5-day forecast</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {forecast.map((d) => {
              const Icon = conditionIcon[d.condition];
              return (
                <article key={d.day} className="card-soft p-5 text-center">
                  <p className="font-semibold">{d.day}</p>
                  <p className="text-xs text-muted-foreground">{d.date}</p>
                  <Icon className="mx-auto mt-3 size-10 text-primary" />
                  <p className="mt-3 text-xl font-bold">
                    {d.high}° <span className="text-sm font-normal text-muted-foreground">/ {d.low}°</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{d.condition}</p>
                  <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
                    <Badge variant="secondary" className="gap-1">
                      <CloudRain className="size-3" /> {d.rainChance}%
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Wind className="size-3" /> {d.wind}
                    </Badge>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold">Farming advisories</h2>
          <ul className="mt-4 space-y-3">
            {forecast.map((d) => (
              <li key={d.day} className="card-soft grid gap-2 p-5 sm:grid-cols-[10rem_minmax(0,1fr)]">
                <div>
                  <p className="font-semibold">{d.day}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.condition} · {d.rainChance}% rain · {d.humidity}% humidity
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{d.advisory}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
