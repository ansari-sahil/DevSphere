"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth";
import API from "@/lib/api";

interface Props {
  children: ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    API.get("/auth/profile")
      .then((res) => {
        if (res.data.role !== "admin") {
          router.replace("/dashboard");
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  if (!authorized) return null;

  return <>{children}</>;
}
