import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import dyciLogo from "../images/DYCI.png";
import { useNavigate } from "react-router-dom";

export function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/opportunities" },
    { name: "My Profile", href: "/profile" },
    { name: "Recruit Volunteers", href: "/organization-welcome"},
    { name: "Help Center", href: "/help-center" },
    { name: "Organization", href: "/my-organizations" },
    { name: "Chat", href: "/chat" },
  ];

  const handleSignIn = () => {
    navigate("/authentication");
  };

  return (
    <nav className="bg-background shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary mr-2">
                Bayani
              </span>
              <img
                src={dyciLogo}
                alt="DYCI Logo"
                width={35}
                height={35}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button variant="default" onClick={handleSignIn}>Sign In</Button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-foreground hover:bg-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></span>
              </a>
            ))}
            <Button variant="default" className="w-full mt-2" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}