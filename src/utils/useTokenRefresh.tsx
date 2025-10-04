// 📄 src/utils/useTokenRefresh.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isProtectedRoute } from "@/utils/routes";
import { getNewAccessToken } from "./removeCookie";

export const useTokenRefresh = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const tryRefresh = async () => {
    try {
      await getNewAccessToken();
    } catch (err) {
      console.error("Token refresh failed:", err);
      if (isProtectedRoute(pathname)) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tryRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isProtectedRoute(pathname)) {
      setLoading(true);
      tryRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        setLoading(true);
        await tryRefresh();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const overlayStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const boxStyles: React.CSSProperties = {
    backgroundColor: "#fff",
    padding: "16px 24px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "center",
    color: "#333",
  };

  const LoaderOverlay = () =>
    loading ? (
      <div style={overlayStyles}>
        <div style={boxStyles}>Refreshing session...</div>
      </div>
    ) : null;

  return { LoaderOverlay };
};
