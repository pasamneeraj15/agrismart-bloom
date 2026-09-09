import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cropNames } from "@/data/agri";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your account — AgriSmart" },
      { name: "description", content: "Register on AgriSmart and get crop, pesticide, fertilizer and weather guidance for your farm." },
      { property: "og:title", content: "Create your account — AgriSmart" },
      { property: "og:description", content: "Set up your farm profile and start getting tailored farming advisories." },
    ],
  }),
  component: RegisterPage,
});

type Errors = Partial<Record<"name" | "email" | "phone" | "acres" | "crop" | "password" | "confirm", string>>;

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    acres: "",
    crop: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!/^\d{10}$/.test(form.phone)) next.phone = "Enter a 10-digit mobile number";
    if (!form.acres || Number(form.acres) <= 0) next.acres = "Enter your farm size in acres";
    if (!form.crop) next.crop = "Pick your main crop";
    if (form.password.length < 6) next.password = "Use at least 6 characters";
    if (form.confirm !== form.password) next.confirm = "Passwords do not match";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast.success("Farm profile created — welcome to AgriSmart");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="grid min-h-screen place-items-center bg-primary-soft px-4 py-10">
      <div className="w-full max-w-xl">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2">
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Leaf className="size-5" />
          </span>
          <span className="font-display text-xl font-bold">AgriSmart</span>
        </Link>

        <div className="card-soft mt-6 p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Create your farm account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Two minutes now, a smarter season ahead.</p>

          <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Ramesh Patel" />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="ramesh@farm.in" />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile number</Label>
              <Input id="phone" inputMode="numeric" value={form.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="9876543210" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="acres">Farm size (acres)</Label>
              <Input id="acres" inputMode="decimal" value={form.acres} onChange={(e) => set("acres")(e.target.value)} placeholder="24" />
              {errors.acres && <p className="text-xs text-destructive">{errors.acres}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="crop">Main crop</Label>
              <Select value={form.crop} onValueChange={set("crop")}>
                <SelectTrigger id="crop">
                  <SelectValue placeholder="Select a crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropNames.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.crop && <p className="text-xs text-destructive">{errors.crop}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => set("password")(e.target.value)} placeholder="••••••••" />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" value={form.confirm} onChange={(e) => set("confirm")(e.target.value)} placeholder="••••••••" />
              {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
            </div>
            <Button type="submit" size="lg" className="sm:col-span-2">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
