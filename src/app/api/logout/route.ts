import { cookies } from "next/headers";

import { COOKIE_ACCESS, COOKIE_IS_AUTH, COOKIE_REFRESH } from "@/constants";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_ACCESS);
  cookieStore.delete(COOKIE_REFRESH);
  cookieStore.delete(COOKIE_IS_AUTH);
  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": cookieStore.toString(),
    },
  });
}
