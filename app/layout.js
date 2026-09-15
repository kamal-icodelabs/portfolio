import "./globals.css";
import { Topbar } from "@/components/common/Topbar/Topbar";

export const metadata = {
  title: "Vishwas Portfolio",
  description: "Portfolio created with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}
