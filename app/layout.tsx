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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
