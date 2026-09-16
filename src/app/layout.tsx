import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ember & Oak | Modern Bistro & Hearth Kitchen",
  description:
    "An intimate culinary journey guided by primal white oak embers, heritage terroir, and modern culinary artistry in the historic arts district.",
  keywords: [
    "Ember and Oak",
    "Modern Bistro",
    "Wood-fired restaurant",
    "Fine Dining",
    "Hearth Kitchen",
    "Chef Table",
    "Sommelier Wine Cellar",
  ],
  authors: [{ name: "Ember & Oak Culinary Group" }],
  openGraph: {
    title: "Ember & Oak | Modern Bistro & Hearth Kitchen",
    description:
      "Moody, cinematic wood-fired hearth dining. Reserve your table at Ember & Oak.",
    url: "https://emberandoak.restaurant",
    siteName: "Ember & Oak",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Ember & Oak Hearth Dining",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      className={`${fraunces.variable} ${plusJakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-ember selection:text-white bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
