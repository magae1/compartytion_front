import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { jwtDecode } from "jwt-decode";

import {
  BASE_URL,
  COOKIE_ACCESS,
  COOKIE_IS_AUTH,
  COOKIE_REFRESH,
  DEFAULT_HEADERS,
} from "@/constants";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(COOKIE_REFRESH)?.value;

  const res = await fetch(BASE_URL + "/token/refresh/", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const cookieStore = cookies();
  if (!res.ok) {
    cookieStore.delete(COOKIE_ACCESS);
    cookieStore.delete(COOKIE_REFRESH);
    cookieStore.delete(COOKIE_IS_AUTH);
  } else {
    const data = await res.json();
    cookieStore.set(COOKIE_ACCESS, data.access, {
      httpOnly: true,
      secure: true,
      expires: (jwtDecode(data.access).exp ?? 0) * 1000,
    });
  }
  cookieStore.delete(COOKIE_REFRESH);

  revalidatePath("/", "layout");

  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": cookieStore.toString(),
    },
  });
}
