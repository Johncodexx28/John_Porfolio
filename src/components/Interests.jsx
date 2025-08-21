import { motion as Motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

import webDesignImg from "../assets/images/web-design.png";
import webDevImg from "../assets/images/web-development.png";
import graphicDesignImg from "../assets/images/graphic-design.png";
import ContentCreation from "../assets/images/content-creation.png";
import readingImg from "../assets/images/reading.png";
import cyclingImg from "../assets/images/cycling.png";

const Interests = () => {
  const cards = [
    {
      title: "Web Design",
      img: webDesignImg,
      color: "rgba(217, 63, 135, 0.2)",
    },
    {
      title: "Web Development",
      img: webDevImg,
      color: "rgba(0, 229, 255, 0.2)",
    },
    {
      title: "Graphic Design",
      img: graphicDesignImg,
      color: "rgba(255, 200, 0, 0.2)",
    },
    {
      title: "Content Creation",
      img: ContentCreation,
      color: "rgba(255, 200, 0, 0.2)",
    },
    { title: "Reading", img: readingImg, color: "rgba(255, 200, 0, 0.2)" },
    { title: "Cycling", img: cyclingImg, color: "rgba(255, 200, 0, 0.2)" },
  ];

  return (
    <Motion.div
      className=" px-4 sm:px-8 sm:mx-8 lg:px-10 lg:mx-28 py-12 sm:py-16 lg:py-20 mb-8 justify-between 
      bg-white/10 backdrop-blur-lg border-4 border-white/20 shadow-lg rounded-2xl mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.5 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Motion.h1
        className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold text-[#D93F87] leading-tight mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Interests
      </Motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {cards.map((card, index) => (
          <SpotlightCard
            key={index}
            className="w-full h-48 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform rounded-xl shadow-md"
            spotlightColor={card.color}
            backgroundImage={card.img} // use the new prop
          >
            <h1 className="text-[min(10vm,70px)] font-bold text-white ">
              {card.title}
            </h1>
          </SpotlightCard>
        ))}
      </div>
    </Motion.div>
  );
};

export default Interests;
