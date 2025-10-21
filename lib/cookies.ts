// /lib/cookies.ts
import { cookies } from "next/headers";

const KEY = "userId";

export async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get(KEY)?.value ?? null;
}

// Solo funcionará en Server Actions o Route Handlers (no en Client Components)
export async function setUserId(id: string) {
  const cookieStore = await cookies();
  cookieStore.set(KEY, id, { path: "/", httpOnly: false });
}
