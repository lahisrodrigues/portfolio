import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export const metadata: Metadata = {
  title: "Lais Rodrigues | Desenvolvedora Full-Stack",
  description:
    "Desenvolvedora Full-Stack especializada em Next.js, TypeScript e Python. APIs, dashboards e integrações entregues com prazo, qualidade e comunicação clara. Disponível para projetos sob demanda e contratos.",
  keywords: [
    "desenvolvedora fullstack",
    "Next.js",
    "TypeScript",
    "Python",
    "Node.js",
    "API",
    "freelancer",
    "contratar desenvolvedor",
    "Lais Rodrigues",
  ],
  authors: [{ name: "Lais Rodrigues" }],
  openGraph: {
    title: "Lais Rodrigues | Desenvolvedora Full-Stack",
    description:
      "APIs, dashboards e integrações entregues com prazo e qualidade. Disponível para novos projetos.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "https://laisrodriguesdev.vercel.app/og-image.png", width: 1200, height: 627, alt: "Lais Rodrigues | Desenvolvedora Full-Stack" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://laisrodriguesdev.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-sky-50 dark:bg-[#0a0f1e] text-zinc-900 dark:text-zinc-100`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
