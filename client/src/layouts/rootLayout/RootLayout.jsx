
import { Link, Outlet, useLocation } from "react-router-dom";
import "./rootLayout.css";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "../../components/footer/footer.jsx";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  const location = useLocation();
  
  // Show footer only on homepage
  const showFooter = location.pathname === "/";

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <>
          <div className="rootLayout">
            {/* <Header /> */}
            <main>
              <Outlet />
            </main>
          </div>
          {showFooter && <Footer />}
        </>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
