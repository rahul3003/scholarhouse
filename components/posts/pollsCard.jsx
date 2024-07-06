import moment from "moment";
import React from "react";

const PollsCard = ({ polls }) => {
  return (
    <div className=" mx-auto flex flex-wrap gap-2 justify-start">
      {polls?.map((poll, index) => (
        <div
          key={index}
          className={`${
            index % 2 === 0 ? "bg-purple-100" : "bg-blue-100"
          } max-w-md min-w-[350px] min-h-[220px] rounded-lg shadow-md mb-4`}
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">{poll.content}</h2>
            {poll.results?.map((answer, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-md flex justify-between items-center mb-2"
              >
                <span className="text-lg">{answer.option}</span>
                <span>{answer.votes} votes</span>
              </div>
            ))}
            <p className="text-sm text-gray-600 mt-2">
              {poll.results?.reduce((total, answer) => total + answer.votes, 0)}{" "}
              Votes | {moment(poll?.pollExpiresAt).endOf("days").fromNow()}{" "}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollsCard;
