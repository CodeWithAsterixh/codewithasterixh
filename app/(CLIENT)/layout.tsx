import Footer from "d/components/sections/Footer";
import Header from "d/components/sections/Header";

export default function LayoutClient({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full flex flex-col relative">
      <Header />
      {children}
      <aside
        id="mobile-nav"
        className="w-full z-50 h-fit fixed bottom-0 isolate md:hidden pointer-events-none"
      ></aside>
      <Footer />
    </main>
  );
}
