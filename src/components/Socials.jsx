import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="m-0 flex items-start justify-start gap-4 text-2xl text-[#ffffff]">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Linkedin"
      >
        <FaLinkedin />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Github">
        <FaGithub />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="InFacebook"
      >
        <FaFacebook />
      </a>
    </div>
  );
};

export default Socials;
