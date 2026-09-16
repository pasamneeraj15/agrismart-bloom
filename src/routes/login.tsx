import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authFarm from "@/assets/auth-farm.jpg";
import logo from "@/assets/logo-agrismart.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — AgriSmart" },
      { name: "description", content: "Log in to your AgriSmart account to see your farm dashboard and advisories." },
      { property: "og:title", content: "Log in — AgriSmart" },
      { property: "og:description", content: "Access your AgriSmart farm dashboard, crop guides and alerts." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address";
    if (password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast.success("Welcome back to AgriSmart");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="relative grid min-h-screen place-items-center px-4 py-10">
      <img
        src={authFarm}
        alt="Farmer walking through a green field at sunrise"
        width={1600}
        height={1008}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px] dark:bg-background/80" />
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="mx-auto flex w-fit items-center gap-2">
          <img src={logo} alt="AgriSmart logo" width={44} height={44} className="size-11 rounded-xl bg-primary-soft p-1" />
          <span className="font-display text-xl font-bold">AgriSmart</span>
        </Link>

        <div className="card-soft mt-6 p-6 sm:p-8">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Log in to check today's farm advisories.</p>

          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ramesh@farm.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <Checkbox id="remember" /> Remember me
              </label>
              <span className="text-primary">Forgot password?</span>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Log in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to AgriSmart?{" "}
            <Link to="/register" className="font-semibold text-primary">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
