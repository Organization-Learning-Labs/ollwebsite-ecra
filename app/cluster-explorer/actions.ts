"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, ACCESS_PATH, accessToken, passwordMatches } from "@/lib/clusters/access";

export type UnlockState = { error: string | null };

function safeNext(raw: FormDataEntryValue | null) {
  const next = typeof raw === "string" ? raw : "";
  return next.startsWith(`${ACCESS_PATH}?`) || next === ACCESS_PATH ? next : ACCESS_PATH;
}

export async function unlock(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const password = String(formData.get("password") ?? "");
  await new Promise((r) => setTimeout(r, 600));

  if (!passwordMatches(password)) {
    return { error: "That password didn't work. Please check it and try again." };
  }

  (await cookies()).set(ACCESS_COOKIE, accessToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: ACCESS_PATH,
  });
  redirect(safeNext(formData.get("next")));
}
