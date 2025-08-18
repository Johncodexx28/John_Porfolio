import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="fixed left-1/2 transform -translate-x-1/2 top-12
             flex flex-col items-center justify-center 
             w-full max-w-3xl px-6 sm:px-8 py-4 
             bg-black/20 text-white rounded-full shadow-lg z-10 
             border border-white/20 backdrop-blur-md space-y-2"
    >
      {/* Links (centered under brand) */}
      <div className="flex gap-4 sm:gap-6 font-medium">
        <Link to="/">Home</Link>
        <Link to="/Projects">Project</Link>
        <Link to="/Contacts">Contacts</Link>
      </div>
    </nav>
  );
}
