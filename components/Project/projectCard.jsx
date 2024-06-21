import React from "react";

const ProjectCard = () => {
  return (
    <div className="relative bg-purple-100 p-6 rounded-lg shadow-lg max-w-md w-full">
      <div className="absolute -top-8 left-0 h-10 w-36 px-8 pt-4 text-[12px] font-light text-gray-600 bg-purple-100 rounded-t-lg">Design</div>
      <h2 className="text-[15px] font-bold text-gray-800 mb-4">
        Adobe Illustrator research project
      </h2>
      <p className="text-gray-700 text-[10px] mb-4">
        Adobe Research creates new algorithms and interfaces to extract,
        analyze, model, and render 2D and 3D geometry, material, lighting,
        and...
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-[11px] text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a6 6 0 00-6 6v4a6 6 0 0012 0V8a6 6 0 00-6-6zm3 10a3 3 0 11-6 0 3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span><b>2500</b> Members</span>
        </div>
        <button className="bg-black text-white py-2 px-4 rounded-lg">
          View
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
