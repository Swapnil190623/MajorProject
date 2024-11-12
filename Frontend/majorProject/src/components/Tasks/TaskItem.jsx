import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from '../../store/taskSlice';


export default function TaskItem({ task }) {

    const [isTaskEditable, setIsTaskEditable] = useState(false);
    const [taskMsg, setTaskMsg] = useState(task.task);
    const dispatch = useDispatch();

    const editTask = () => {
        // Dispatch action to update task
        dispatch(updateTask({ id: task.id, task: { ...task, task: taskMsg } }));
        setIsTaskEditable(false);
    }

    // const toggleCompleted = () => {
    //     // Dispatch action to toggle task completion
    //     dispatch(toggleComplete(task.id));
    // }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                task.isDone ? "bg-[#f2dfff]" : "bg-[#eeffdf]"
            }`}
        >
            {/* <input
                type="checkbox"
                className="cursor-pointer"
                checked={task.isDone}
                onChange={toggleCompleted}
            /> */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTaskEditable ? "border-black/10 px-2" : "border-transparent"
                } ${task.isDone ? "line-through" : ""}`}
                value={taskMsg}
                onChange={(e) => setTaskMsg(e.target.value)}
                readOnly={!isTaskEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (task.isDone) return;

                    if (isTaskEditable) {
                        editTask();
                    } else setIsTaskEditable((prev) => !prev);
                }}
                disabled={task.isDone}
            >
                {isTaskEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Task Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => dispatch(deleteTask(task.id))} // Dispatch action to delete task
            >
                ❌
            </button>
        </div>
    );
}