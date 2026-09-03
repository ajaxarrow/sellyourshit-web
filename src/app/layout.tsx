import type { Metadata } from "next";
import { Anton, Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomCursor } from "@/components/CustomCursor";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "sellyoshit — reseller inventory & sales tracker",
  description:
    "SELL YOUR SHI[R]T. Track your closet, log every sale, know your numbers — no spreadsheets required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${bebasNeue.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <Providers>
          <Nav />
          {children}
          <ThemeToggle />
          <CustomCursor />
        </Providers>
      </body>
    </html>
  );
}
