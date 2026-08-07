import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kishore Nayak | Creative Director & Fashion Choreographer",
  description: "Multidisciplinary creative professional specializing in choreography, fashion performance training, and creative show direction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-black text-white selection:bg-gold/30 selection:text-gold flex flex-col min-h-screen">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>

        {/* Global Floating Developer Badge */}
        <a 
          href="https://www.fuera.in.net/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800 text-[10px] md:text-xs font-sans tracking-widest text-zinc-400 uppercase hover:text-white hover:border-zinc-600 transition-all duration-300 shadow-xl"
        >
          design build by <span className="text-white font-bold">FUERA</span>
        </a>
      </body>
    </html>
  );
}
