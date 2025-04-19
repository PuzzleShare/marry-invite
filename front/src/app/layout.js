import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { getDefaultImg } from "@/const/defaultCardImg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 기본 title, meta 정보 설정
export const metadata = {
  title: "marry-invite",
  description: "내가 만드는 내 모바일 청첩장",
  openGraph: {
    images: getDefaultImg(),
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
