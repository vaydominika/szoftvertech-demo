import React from 'react';
import { FaStar, FaStarHalf } from 'react-icons/fa';

interface CourseDetailsModalProps {
  course: {
    id: number;
    title: string;
    thumbnail: string;
    rating: number;
    reviews: number;
  };
  onClose: () => void;
}

const CourseDetailsModal = ({ course, onClose }: CourseDetailsModalProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }

    while (stars.length < 5) {
      stars.push(<FaStar key={`empty-star-${stars.length}`} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img 
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-[300px] object-cover rounded-lg"
            />
            <div className="mt-4 flex items-center">
              <div className="flex">
                {renderStars(course.rating)}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {course.rating.toFixed(1)} ({course.reviews} értékelés)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Kurzus információk</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Mit fogsz tanulni?</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>JavaScript alapok és modern funkciók</li>
                <li>Aszinkron programozás</li>
                <li>DOM manipuláció</li>
                <li>API integráció</li>
              </ul>
            </div>

            <button className="w-full py-3 px-4 bg-[#8498FF] text-white rounded-lg hover:bg-[#667ffc] transition-colors">
              Jelentkezem a kurzusra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal; 