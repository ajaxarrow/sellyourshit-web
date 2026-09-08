import { Hero } from "@/components/sections/Hero";
import { getDownloadCount } from "@/lib/redis";

// Revalidate periodically rather than on every request — the count is a
// subtle vanity stat, not something that needs to be second-accurate.
export const revalidate = 60;

export default async function Home() {
  const downloadCount = await getDownloadCount();
  return <Hero downloadCount={downloadCount} />;
}
