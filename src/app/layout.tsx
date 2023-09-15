import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import {  Theme, Grid } from "@radix-ui/themes";
import Navbar from "@/core/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wise Meeple",
  description: "Your boardgame recommender",
};

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
          <Grid>
            <Navbar />
            <Grid height={"9"} position={"relative"}/>
            <Grid >{children}</Grid>
            <Analytics />
          </Grid>
        </Theme>
      </body>
    </html>
  );
}
