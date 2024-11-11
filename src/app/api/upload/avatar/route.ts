import { NextRequest } from "next/server";

import { BASE_URL, COOKIE_ACCESS } from "@/constants";
import { revalidateTag } from "next/cache";

export async function PATCH(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_ACCESS)?.value;

  const formData = await request.formData();
  const res = await fetch(BASE_URL + "/accounts/upload_avatar/", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json();
    return new Response(data, { status: 400 });
  }
  revalidateTag("profile");
  return new Response("", { status: 200 });
}
