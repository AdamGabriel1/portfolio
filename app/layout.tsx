import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Adam Gabriel | Engenheiro de Software",
  description: "Portfólio técnico de Adam Gabriel. Especialista em React, Next.js, Node.js, Python, Go, C# .NET, DevOps e arquiteturas escaláveis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} font-sans`}>
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}