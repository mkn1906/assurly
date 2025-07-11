import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Shield, Menu, Mail, MapPin } from "lucide-react";
import { CookieSettingsButton } from "./cookie-consent";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { href: "/#how-it-works", label: "Sådan virker det" },
    { href: "/pricing", label: "Priser" },
    { href: "/#security", label: "Sikkerhed" },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`text-professional-gray hover:text-trust-blue px-3 py-2 text-sm font-medium transition-colors ${
            mobile ? "block" : ""
          }`}
          onClick={() => mobile && setMobileMenuOpen(false)}
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Shield className="h-8 w-8 text-trust-blue mr-2" />
              <span className="text-xl font-bold text-dark-text">Assurly</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLinks />
              
              <Link href="/demo-report">
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                  Se Eksempel
                </Button>
              </Link>
              
              <Link href="/upload">
                <Button className="bg-trust-blue text-white hover:bg-blue-700">
                  Start Gratis Analyse
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button - Only show on mobile */}
            <div className="flex md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col space-y-4 mt-8">
                    <NavLinks mobile />
                    
                    <Link href="/demo-report">
                      <Button variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                        Se Eksempel Rapport
                      </Button>
                    </Link>
                    
                    <Link href="/upload">
                      <Button className="w-full bg-trust-blue text-white hover:bg-blue-700">
                        Start Gratis Analyse
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-trust-blue mr-2" />
              <span className="text-xl font-bold">Assurly</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professionel forsikringsanalyse drevet af AI-teknologi. 
              Identificer dækningshuller og optimer dine forsikringspræmier.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Sibl Solutions ApS</span>
              </div>
              <div className="ml-6">
                <p>CVR: 32833780</p>
                <p>Blomsterager 201</p>
                <p>2980 Kokkedal</p>
              </div>
              <div className="flex items-center mt-3">
                <Mail className="h-4 w-4 mr-2" />
                <span>Support: info@assurly.io</span>
              </div>
            </div>
          </div>

          {/* Legal Pages */}
          <div>
            <h3 className="font-semibold mb-4">Juridisk</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Handelsbetingelser
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privatlivspolitik
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="hover:text-white transition-colors">
                  GDPR & Databehandling
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Politik
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Ansvarsfraskrivelse
                </Link>
              </li>
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="font-semibold mb-4">Service</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Priser
                </Link>
              </li>
              <li>
                <Link href="/upload" className="hover:text-white transition-colors">
                  Start Analyse
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Ofte Stillede Spørgsmål
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© {currentYear} Assurly - Sibl Solutions ApS. Alle rettigheder forbeholdes.</p>
          <p className="mt-2">
            Denne side leverer kun information og analyse. Vi giver ikke forsikringsrådgivning eller -anbefalinger.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
