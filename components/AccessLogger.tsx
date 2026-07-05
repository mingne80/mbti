"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { recordAccess } from "@/lib/clientStore";

export function AccessLogger() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    const nickname = window.sessionStorage.getItem("mbti-nickname");
    recordAccess({ path, nickname }).catch(() => {
      // Access logs should never block normal page usage.
    });
  }, [pathname, searchParams]);

  return null;
}
