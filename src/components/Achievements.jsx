import { motion as Motion } from "framer-motion";
import { useState } from "react";
import CircularGallery from "./CircularGallery";

// Achievement images
import award1 from "../assets/images/award1.png";
import award2 from "../assets/images/award2.png";
import award3 from "../assets/images/award3.jpg";
import award4 from "../assets/images/award4.jpg";

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const achievements = [
    {
      img: award3,
      title: "Computer Science Fundamentals",
      description: "Mastered core computer science principles",
      year: "2023",
    },
    {
      img: award1,
      title: "Best in Programming",
      description: "Outstanding performance in competitive programming",
      year: "2024",
    },
    {
      img: award2,
      title: "Programming 2 Completion",
      description: "Successfully completed advanced programming course",
      year: "2024",
    },
    {
      img: award4,
      title: "Coding Training for Basic Javascript",
      description: "Mastered Basic Syntax of Javascript",
      year: "2024",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Motion.section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Header */}
      <Motion.div
        className="text-center mb-8 sm:mb-12 lg:mb-16"
        variants={itemVariants}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Achievements
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto">
          Recognition and milestones that mark my journey in technology
        </p>
        <div className="mt-4 sm:mt-6 w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
      </Motion.div>

      {/* Main Achievement Display */}
      <Motion.div
        className="relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
        variants={itemVariants}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        </div>

        {/* Circular Gallery */}
        <div className="relative z-10 mb-8 sm:mb-12">
          <div
            style={{ height: "300px", position: "relative" }}
            className="sm:h-[400px]"
          >
            <CircularGallery
              images={achievements.map((item) => item.img)}
              bend={2.8}
              textColor="#ffffff"
              borderRadius={0.08}
              scrollEase={0.025}
            />
          </div>

          {/* Gallery Instructions */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4">
              <span className="hidden sm:inline">
                ← Drag to rotate • Click any certificate to view full size →
              </span>
              <span className="sm:hidden">
                Swipe to rotate • Tap certificate to enlarge
              </span>
            </p>
          </div>
        </div>

        {/* Certificates Section Title */}
        <div className="relative z-10 mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center">
            Certificates
          </h3>
        </div>

        {/* Achievement Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {achievements.map((achievement, index) => (
            <Motion.div
              key={index}
              className="group cursor-pointer h-full"
              onClick={() => setSelectedImage(achievement)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              {/* Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 shadow-lg border border-gray-200 dark:border-slate-600 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 h-full flex flex-col">
                {/* Achievement Image */}
                <div className="relative mb-2 sm:mb-3 overflow-hidden rounded-md sm:rounded-lg flex-shrink-0">
                  <img
                    src={achievement.img}
                    alt={achievement.title}
                    className="w-full h-20 sm:h-28 lg:h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Icon */}
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white/90 dark:bg-slate-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-700 dark:text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Achievement Info */}
                <div className="space-y-1.5 sm:space-y-2 flex-grow flex flex-col">
                  <div className="flex items-center justify-center sm:justify-start">
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-[10px] sm:text-xs font-medium rounded-full">
                      {achievement.year}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm lg:text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight text-center sm:text-left line-clamp-2">
                    {achievement.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 text-center sm:text-left hidden sm:block flex-grow">
                    {achievement.description}
                  </p>

                  {/* View Button */}
                  <div className="pt-1 flex justify-center sm:justify-start mt-auto">
                    <span className="inline-flex items-center text-[10px] sm:text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      <span className="hidden sm:inline">View Certificate</span>
                      <span className="sm:hidden">View</span>
                      <svg
                        className="ml-1 w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>

        {/* Achievement Summary */}
      </Motion.div>

      {/* Full-Size Modal */}
      {selectedImage && (
        <Motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Motion.div
            className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/80 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage.img}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />

            {/* Image Details */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">
                  {selectedImage.year}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedImage.description}
              </p>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </Motion.section>
  );
};

export default Achievements;
