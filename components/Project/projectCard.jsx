import { Person2Rounded } from "@mui/icons-material";
import React from "react";

const ProjectCard = ({ project, key }) => {


const ProjectCard = ({ project, index }) => {

  return (
    <div
      key={key}
      className={`relative ${
        index % 2 === 0 ? "bg-purple-100" : "bg-blue-100"
      } p-6 rounded-x-lg  rounded-b-lg border-[2px] rounded-tr-lg  max-w-md w-[295px] h-[140px]`}
    >
      <div
        className={`absolute -top-8 -left-[2px] h-8 w-28 px-2 text-center pt-4 text-[12px] font-light text-gray-600 dark:text-gray-200 ${
          index % 2 === 0 ? "bg-purple-100" : "bg-blue-100"
        } 
       rounded-t-lg border-t-[2px] border-x-[2px] `}

      >
        {project.focusArea}
      </div>
      <h2 className="text-[18px] font-bold text-gray-800 dark:text-white mb-2">
        {project?.name}
      </h2>
      <p className="text-gray-700 dark:text-gray-200 text-[14px] mb-4">
        {project?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-[13px] text-gray-600 dark:text-gray-300 gap-2">
          <Person2Rounded className="text-[16px]" />
          <span>
            <b>{project?.submittedProjects?.length}</b> Members
          </span>
        </div>
        <button className="bg-black text-white py-1 px-4 rounded-lg">
          View
        </button>
      </div>
    </div>
  );
};
}

export default ProjectCard;
