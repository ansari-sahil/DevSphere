"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AdminRoute({ children }: any) {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    API.get("/api/auth/profile").then((res) => {
      if (res.data.role === "admin") setAllowed(true);
      else router.push("/dashboard");
    });
  }, []);

  if (!allowed) return null;

  return children;
}
