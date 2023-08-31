import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BG Companion",
  description: "Ai based BG recommender",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  suppressHydrationWarning={true}>
        <Theme
          appearance="dark"
          accentColor="violet"
          grayColor="mauve"
          radius="large"
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
