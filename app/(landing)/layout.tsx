import LandingNavbar from "./_components/Navbar";
import LandingFooter from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNavbar />
      {children}
      <LandingFooter />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
