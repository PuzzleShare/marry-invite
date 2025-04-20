import { geistSans, geistMono } from "@/const/font"
import "../styles/globals.css";
import { getDefaultImg } from "@/const/defaultCardImg";

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
