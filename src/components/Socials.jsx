import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="m-0 flex items-start justify-start gap-4 text-2xl text-[#ffffff]">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Linkedin"
        className="hover:text-[#D93F87] duration-300 hover:scale-110 transition-transform"
      >
        <FaLinkedin />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github"
        className="hover:text-[#D93F87]  duration-300 hover:scale-110 transition-transform"
      >
        <FaGithub />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="hover:text-[#D93F87] duration-300 hover:scale-110 transition-transform"
      >
        <FaInstagram />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="InFacebook"
        className="hover:text-[#D93F87] transition-transform hover:scale-110 duration-300"
      >
        <FaFacebook />
      </a>
    </div>
  );
};

export default Socials;
