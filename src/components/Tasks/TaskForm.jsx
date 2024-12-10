import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/taskSlice'

export default function TaskForm() {

    const [task, setTask] = useState("");
    const dispatch = useDispatch();

    const add = (e) => {
        e.preventDefault();

        if (!task) return;

        // Dispatch the action to add a todo
        dispatch(addTask({id: Date.now(), task, isDone: false }));
        setTask("");
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Task..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 py-1.5"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add Task
            </button>
        </form>
    );
}