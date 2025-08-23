import { motion as Motion } from "framer-motion";
import { useState } from "react";

// Sample achievement images (replace with your own paths)
import award1 from "../assets/images/award1.png";
import award2 from "../assets/images/award2.png";
import award3 from "../assets/images/award3.jpg";

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const achievements = [
    { img: award1, title: "Best in Programmer" },
    { img: award2, title: "Programming 2 Completion" },
    { img: award3, title: "Computer Science Basic" },
  ];

  return (
    <Motion.div
      className="px-4 sm:px-8 sm:mx-8 lg:px-10 lg:mx-28 py-12 sm:py-16 lg:py-12 mb-8 mx-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      <h1 className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold leading-tight mb-16 page-title">
        Achievements
      </h1>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 justify-items-center ">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-sm flex flex-col items-center text-center cursor-pointer "
            onClick={() => setSelectedImage(item.img)}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-auto rounded-xl shadow-md object-cover transition-transform hover:scale-105  bg-white/10 backdrop-blur-lg border-4 border-white/20  p-4 "
            />
            <p className="mt-3 font-medium text-sm sm:text-base md:text-lg lg:text-sm"> 
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 "
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Achievement"
            className="w-auto h-auto max-w-[90%] max-h-[80%] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </Motion.div>
  );
};

export default Achievements;
