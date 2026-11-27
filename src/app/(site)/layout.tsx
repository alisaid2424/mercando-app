import Footer from "@/components/Footer";
import Header from "@/components/header/Index";

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 min-h-[calc(100vh-60px)]">{children}</main>
      <Footer />
    </div>
  );
}
