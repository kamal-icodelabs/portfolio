import "./globals.css";
import { Topbar } from "@/components/common/Topbar/Topbar";
import SmoothScroll from "@/components/common/SmoothScroll/SmoothScroll";

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
        <SmoothScroll />
      </body>
    </html>
  );
}
