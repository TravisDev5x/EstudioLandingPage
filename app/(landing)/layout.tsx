import LandingNavbar from "./_components/Navbar";
import LandingFooter from "./_components/Footer";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingNavbar />
      {children}
      <LandingFooter />
    </>
  );
}
