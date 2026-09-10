import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ImageUp, RotateCcw, ScanLine, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { diagnoses, type Diagnosis } from "@/data/agri";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Plant Scan & Disease Detection — AgriSmart" },
      { name: "description", content: "Upload a leaf photo and get a plant disease diagnosis with severity, treatment steps and prevention tips." },
      { property: "og:title", content: "Plant Scan & Disease Detection — AgriSmart" },
      { property: "og:description", content: "Interactive leaf scanning demo with diagnosis, treatment plan and prevention advice." },
    ],
  }),
  component: ScanPage,
});

const severityClass = {
  Mild: "border-success/50 text-success",
  Moderate: "border-warning/60 text-earth",
  Severe: "border-destructive/50 text-destructive",
} as const;

function ScanPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Diagnosis | null>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image of a leaf");
      return;
    }
    setPreview(URL.createObjectURL(file));
    startScan();
  }

  function startScan() {
    setStatus("scanning");
    setResult(null);
    setProgress(0);
    const start = Date.now();
    const timer = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / 2600) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        const pick = diagnoses[Math.floor(Math.random() * diagnoses.length)]!;
        setResult(pick);
        setStatus("done");
        toast.success(`Detected: ${pick.disease}`);
      }
    }, 80);
  }

  function reset() {
    setPreview(null);
    setResult(null);
    setStatus("idle");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <AppShell title="Plant scan" subtitle="Upload a leaf photo to check for disease">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="card-soft p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <ImageUp className="size-4 text-primary" /> Leaf image
            </h2>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {!preview ? (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-4 flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-muted/50 px-6 py-14 text-center transition-colors hover:border-primary hover:bg-primary-soft"
              >
                <ScanLine className="size-10 text-primary" />
                <span className="font-medium">Tap to upload a leaf photo</span>
                <span className="text-xs text-muted-foreground">
                  Use a clear, well-lit close-up of a single affected leaf
                </span>
              </button>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img src={preview} alt="Uploaded leaf" className="h-64 w-full object-cover" />
                  {status === "scanning" && <span className="scan-sweep" />}
                </div>
                {status === "scanning" && (
                  <div>
                    <p className="text-sm font-medium">Analysing leaf patterns…</p>
                    <Progress value={progress} className="mt-2" />
                    <p className="mt-1 text-xs text-muted-foreground">{progress}% complete</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => inputRef.current?.click()} className="gap-2">
                    <ImageUp className="size-4" /> Change photo
                  </Button>
                  {status === "done" && (
                    <>
                      <Button onClick={startScan} className="gap-2">
                        <Sparkles className="size-4" /> Scan again
                      </Button>
                      <Button variant="ghost" onClick={reset} className="gap-2">
                        <RotateCcw className="size-4" /> Reset
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="mt-5 rounded-xl bg-primary-soft p-3 text-xs text-muted-foreground">
              This is a demonstration scanner using sample diagnoses. Confirm serious outbreaks with your local
              agriculture officer before large-scale spraying.
            </div>
          </section>

          <section className="card-soft p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Stethoscope className="size-4 text-primary" /> Diagnosis
            </h2>

            {status !== "done" || !result ? (
              <div className="mt-6 grid place-items-center rounded-2xl bg-muted/60 px-6 py-16 text-center text-sm text-muted-foreground">
                {status === "scanning" ? "Scanning your leaf…" : "Your results will appear here after a scan."}
              </div>
            ) : (
              <div className="mt-4 space-y-5">
                <div>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <h3 className="text-xl font-bold">{result.disease}</h3>
                    <Badge variant="outline" className={severityClass[result.severity]}>
                      {result.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Detected on {result.crop}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-semibold">{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="mt-2" />
                </div>

                <p className="text-sm text-muted-foreground">{result.summary}</p>

                <div>
                  <p className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="size-4 text-primary" /> Treatment plan
                  </p>
                  <ol className="mt-2 space-y-2 text-sm">
                    {result.treatment.map((t, i) => (
                      <li key={t} className="flex gap-2">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                          {i + 1}
                        </span>
                        {t}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-xl bg-primary-soft p-3">
                  <p className="flex items-center gap-2 font-medium">
                    <ShieldCheck className="size-4 text-primary" /> Prevent it next season
                  </p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {result.prevention.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </div>

        <section className="card-soft p-5">
          <h2 className="text-lg font-semibold">How to take a good scan photo</h2>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {[
              "Shoot in daylight, avoiding harsh shadows",
              "Fill the frame with one affected leaf",
              "Include both healthy and damaged parts of the leaf",
              "Hold steady — blur hides the early spots",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
