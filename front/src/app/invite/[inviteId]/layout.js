import { geistSans, geistMono } from "@/const/font";
import "@/styles/globals.css";
import { getInvite } from "@/api/invite/invite";

// metadata 설정해주는 함수
export async function generateMetadata({ params, searchParams }, parent) {
  const { inviteId } = await params;
  const invite = await getInvite(inviteId);
  const previousImages = [invite?.data.imageUrl];

  return {
    title: invite?.data.title || "marry-invite",
    openGraph: {
      images: previousImages,
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
