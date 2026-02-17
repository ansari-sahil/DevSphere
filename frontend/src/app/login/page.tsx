"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthBackground from "@/components/auth-background";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import API from "@/lib/api";
import { setTokens } from "@/lib/auth";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);

      setTokens(res.data.accessToken, res.data.refreshToken);

      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <Card className="w-105 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <Lock className="mx-auto text-purple-300" size={34} />
            <h1 className="text-3xl font-bold text-purple-200">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              required
              className="bg-transparent border-white/20 focus-visible:ring-purple-400 input-glow"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              type="password"
              placeholder="Password"
              required
              className="bg-transparent border-white/20 focus-visible:ring-purple-400 input-glow"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button
              className="w-full bg-linear-to-r from-purple-500 to-indigo-600 hover:opacity-90 transition text-white"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-purple-300 hover:text-purple-200"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthBackground>
  );
}
