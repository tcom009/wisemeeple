import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import { Container, Theme, ThemePanel, Grid } from "@radix-ui/themes";
import Navbar from "@/core/components/Navbar";
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
      <body>
        <Theme
          appearance="dark"
          accentColor="violet"
          grayColor="mauve"
          radius="large"
        >
          <Grid>
            <Navbar />
            <Grid height={"9"} position={"relative"}/>
            <Grid >{children}</Grid>
          </Grid>
        </Theme>
      </body>
    </html>
  );
}
