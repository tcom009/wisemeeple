import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import { Theme, Grid } from "@radix-ui/themes";
import Navbar from "@/core/components/Navbar";
import Footer from "@/core/components/Footer";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme
          appearance="dark"
          accentColor="violet"
          grayColor="mauve"
          radius="large"
          hasBackground={false}
        >
          <Navbar />
          <Grid height={"9"} position={"relative"} />
          {children}
        
        <Analytics />
        </Theme>
      </body>
    </html>
  );
}
