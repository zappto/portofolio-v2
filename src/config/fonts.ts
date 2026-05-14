import {
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";

/** Variable cuts keep download size predictable while preserving full weight interpolation. */
const geistSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  weight: "variable",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  weight: "variable",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta-sans",
  weight: "variable",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  weight: "variable",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  weight: "variable",
  display: "swap",
});

export const fontVariableClassName = [
  geistSans.variable,
  geistMono.variable,
  plusJakartaSans.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
].join(" ");
