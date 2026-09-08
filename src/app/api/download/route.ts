import { NextResponse } from "next/server";
import { incrementDownloadCount } from "@/lib/redis";

/** Logs a download, then hands off to the actual APK file. */
export async function GET(request: Request) {
  await incrementDownloadCount();
  return NextResponse.redirect(new URL("/downloads/sellyoshit.apk", request.url), 307);
}
