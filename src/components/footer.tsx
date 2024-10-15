import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
// import PartnerLogosComponent from "./partner-logos";

export function FooterComponent() {
  return (
    <div>
      <footer className="bg-gray-200 text-gray-600 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <p className="mb-4">
                We connect volunteers with meaningful opportunities to make a
                difference in their communities and beyond.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-6 h-6" />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:underline">
                    About the Developers
                  </a>
                </li>
                <li>
                  <a href="/opportunities" className="hover:underline">
                    Find Opportunities
                  </a>
                </li>
                <li>
                  <a href="/organizations" className="hover:underline">
                    For Organizations
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/testimonials" className="hover:underline">
                    Volunteer Stories
                  </a>
                </li>
                <li>
                  <a href="/partners" className="hover:underline">
                    Our Partners
                  </a>
                </li>
                <li>
                  <a href="/donate" className="hover:underline">
                    Donate
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="mb-4">
                Stay up to date with the latest volunteer opportunities and
                news.
              </p>
              <form className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-300 pt-6 text-center text-sm text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Bayani. All rights reserved.
            </p>
            <p className="mt-2">
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
              {" | "}
              <a href="/terms" className="hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
