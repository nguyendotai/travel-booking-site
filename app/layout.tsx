"use client";
import "./globals.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
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
      <body className="min-h-screen flex flex-col">
        <Provider store={store}>
          {/* Header */}
          <header className="relative">
            <Header />
            {isHome && <Banner />}
          </header>

          {/* Main content chiếm toàn bộ phần còn lại */}
          <main className="flex-1 mt-[72px]">{children}</main>

          {/* Footer luôn dính sát dưới */}
          <footer className="mt-auto">
            <Footer />
          </footer>
        </Provider>
      </body>
    </html>
  );
}
