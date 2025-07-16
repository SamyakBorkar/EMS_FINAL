import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <div className="bg-[#2a2a2a] p-4 rounded mt-4">
      <h2 className="text-xl mb-4">All Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks found</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="border-b border-gray-600 p-2 flex flex-col"
            >
              <span className="font-bold">{task.title}</span>
              <span>{task.description}</span>
              <small className="text-gray-400">
                Assigned To: {task.assignedTo?.name || "N/A"} | Status: {task.status}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
