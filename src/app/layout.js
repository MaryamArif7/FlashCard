import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'; // Correcting the import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlashCard",
  description: "HeadStarter Assignment",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
