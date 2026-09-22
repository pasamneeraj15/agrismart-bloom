import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { supabase } from "@/integrations/supabase/client";

type AuthValue = {
  user: User | null;
  session: Session | null;
  displayName: string;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthValue>({
  user: null,
  session: null,
  displayName: "",
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
      if (!next) setDisplayName("");
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    let active = true;
    const metaName = (session?.user?.user_metadata?.["display_name"] as string | undefined) ?? "";
    if (metaName) setDisplayName(metaName);

    supabase
      .from("profiles")
      .select("display_name")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data?.display_name) setDisplayName(data.display_name);
      });

    return () => {
      active = false;
    };
  }, [userId, session?.user?.user_metadata]);

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setDisplayName("");
  }

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, session, displayName, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

/** First name of the signed-in user, or "" when unknown. */
export function firstName(displayName: string) {
  return displayName.trim().split(/\s+/)[0] ?? "";
}
