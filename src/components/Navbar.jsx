import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-12 left-0 right-0
             mx-6 sm:mx-12 lg:mx-24
             px-6 sm:px-8 py-4
             flex items-center justify-between
             bg-black/20 text-white rounded-full shadow-lg z-10
             border border-white/20 backdrop-blur-md"
    >
      {/* Brand */}
      <div className="font-bold text-lg tracking-wide">PORTFOLIO</div>

      {/* Desktop Links */}
      <div className="hidden sm:flex gap-6 font-medium">
        <a href="#home" className="hover:text-purple-400">
          Home
        </a>
        <a href="#about" className="hover:text-purple-400">
          About
        </a>
        <a href="#projects" className="hover:text-purple-400">
          Projects
        </a>
        <a href="#contact" className="hover:text-purple-400">
          Contact
        </a>
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute top-full mt-2 right-0 w-40
                       bg-black/90 text-white rounded-lg shadow-lg
                       flex flex-col items-start p-4 space-y-2 sm:hidden"
          >
            <a href="#home" onClick={() => setIsOpen(false)}>
              Home
            </a>
            <a href="#about" onClick={() => setIsOpen(false)}>
              About
            </a>
            <a href="#projects" onClick={() => setIsOpen(false)}>
              Projects
            </a>
            <a href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
