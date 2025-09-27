"use client";
import "./globals.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className="relative">
            <Header />
            {isHome && <Banner />}
          </div>
          <main className="mt-[72px]">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
