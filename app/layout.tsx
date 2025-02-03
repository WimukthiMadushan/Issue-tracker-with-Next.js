import "@radix-ui/themes/styles.css";
import './theme-config.css'
import { Container, Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> 
      <QueryClientProvider>
      <AuthProvider>
      <body className={inter.variable}>
        <Theme className="">
        <NavBar />
          <main className="p-5">
            <Container>
              {children}
            </Container>
        </main>
        </Theme>
        </body> 
        </AuthProvider>
        </QueryClientProvider>
    </html>
  );
}
