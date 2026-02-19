"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthBackground from "@/components/auth-background";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import API from "@/lib/api";
import { Rocket } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
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
      await API.post("api/auth/register", form);
      router.push("/login");
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
            <Rocket className="mx-auto text-purple-300" size={36} />
            <h1 className="text-3xl font-bold text-purple-200">
              Join DevSphere
            </h1>
            <p className="text-gray-400 text-sm">Build. Connect. Grow.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              required
              className="bg-transparent border-white/20 focus-visible:ring-purple-400 input-glow"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

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
              {loading ? "Creating..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-300 hover:text-purple-200"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthBackground>
  );
}
