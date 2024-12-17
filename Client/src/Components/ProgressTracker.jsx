import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Trophy, XCircle } from 'lucide-react'; // Icons from Lucide React

const ProgressTracker = () => {
    // State to manage tasks and scores
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: 'Task 1: Research Project Requirements',
            progress: 100,
            status: 'Completed',
        },
        {
            id: 2,
            name: 'Task 2: Design Wireframe',
            progress: 70,
            status: 'In Progress',
        },
        {
            id: 3,
            name: 'Task 3: Build MVP Features',
            progress: 30,
            status: 'Pending',
        },
        {
            id: 4,
            name: 'Task 4: Testing and Debugging',
            progress: 0,
            status: 'Not Started',
        },
    ]);

    const [totalScore, setTotalScore] = useState(0);

    // Calculate scores dynamically based on task progress
    useEffect(() => {
        const score = tasks.reduce((total, task) => total + task.progress, 0) / tasks.length;
        setTotalScore(Math.round(score));
    }, [tasks]);

    return (
        <div className="min-h-screen  bg-gray-100">
            <div className="max-w-[1200px] mx-auto px-6 py-8">
                <h1 className="text-3xl font-semibold text-blue-600 mb-6 flex items-center">
                    Progress Tracker
                    <Trophy className="ml-2 text-yellow-500" size={28} /> {/* Trophy Icon */}
                </h1>

                {/* Overall Score Display */}
                <div className="bg-white shadow-md p-4 mb-6 rounded-lg flex justify-between items-center">
                    <div className="text-xl font-semibold text-gray-800">
                        Overall Score:
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{totalScore}%</div>
                </div>

                {/* Task List */}
                <div className="bg-white shadow-lg rounded-lg">
                    <table className="min-w-full table-auto border-collapse text-center">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="py-3 px-4 border">Task</th>
                                <th className="py-3 px-4 border">Progress</th>
                                <th className="py-3 px-4 border">Status</th>
                                <th className="py-3 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="hover:bg-gray-50 border-b last:border-b-0"
                                >
                                    {/* Task Name */}
                                    <td className="py-4 px-4 border item-center font-medium text-gray-700">
                                        {task.name}
                                    </td>

                                    {/* Task Progress */}
                                    <td className="py-4 px-4 border item-center text-gray-700">
                                        {task.progress}%
                                    </td>

                                    {/* Task Status */}
                                    <td className="py-4 px-4 border item-center">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${task.status === 'Completed'
                                                    ? 'bg-green-500 text-white'
                                                    : task.status === 'In Progress'
                                                        ? 'bg-yellow-500 text-white'
                                                        : task.status === 'Pending'
                                                            ? 'bg-orange-400 text-white'
                                                            : 'bg-gray-400 text-white'
                                                }`}
                                        >
                                            {task.status === 'Completed' ? (
                                                <CheckCircle className="mr-2" size={18} />
                                            ) : task.status === 'In Progress' ? (
                                                <Circle className="mr-2" size={18} />
                                            ) : task.status === 'Pending' ? (
                                                <XCircle className="mr-2" size={18} />
                                            ) : (
                                                <Circle className="mr-2" size={18} />
                                            )}
                                            {task.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-4 px-4 flex justify-center items-center">
                                        {task.status !== 'Completed' && (
                                            <button
                                                onClick={() =>
                                                    setTasks((prevTasks) =>
                                                        prevTasks.map((t) =>
                                                            t.id === task.id
                                                                ? { ...t, progress: Math.min(t.progress + 20, 100), status: t.progress + 20 >= 100 ? 'Completed' : 'In Progress' }
                                                                : t
                                                        )
                                                    )
                                                }
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                                            >
                                                <CheckCircle className="mr-2" size={18} /> Mark Progress
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;
