import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />

      <header className="relative z-10 mx-auto flex max-w-5xl items-center justify-between p-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-primary shadow-soft">
            <Heart className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <span className="font-display font-bold">NFO</span>
        </Link>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[70vh] max-w-2xl place-items-center px-6 text-center">
        <div>
          <p className="font-display text-[10rem] leading-none font-bold text-gradient sm:text-[14rem]">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold">We lost this moment.</h1>
          <p className="mt-3 text-muted-foreground">
            The page you were looking for doesn't exist — but the people who matter still do.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero"><Link to="/"><Home className="h-4 w-4" />Home</Link></Button>
            <Button asChild variant="outline"><Link to="/dashboard"><ArrowLeft className="h-4 w-4" />Back to dashboard</Link></Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
