import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Trophy, XCircle, ArrowUpCircle } from 'lucide-react'; // Icons from Lucide React
import axios from 'axios'; // Import axios for API requests

const ProgressTracker = () => {
    // State to manage tasks and scores
    const [tasks, setTasks] = useState([]);
    const [totalScore, setTotalScore] = useState(0);
    const [error, setError] = useState('');

    const [employee, setEmployee] = useState({});
    const [projects, setProjects] = useState({});

    // Fetch tasks when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5001/tasks/projects-tasks/67626e761d365be78291dac3');
                setTasks(response.data.tasks); // Make sure `response.data.tasks` is correct
            } catch (err) {
                setError('Failed to fetch tasks');
            }
        };
        fetchTasks();

        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5001/projects/67626d3a1d365be78291da9b");
                setProjects(response.data); // Assuming the response contains project data
            } catch (err) {
                setError("Failed to fetch projects. Please try again later.");
            }
        };
        fetchProjects();

        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5001/users/users-data/67626d3a1d365be78291da9b");
                setEmployee(response.data); // Assuming response has employee data like { name: "Raksha" }
            } catch (err) {
                setError("Failed to fetch employees. Please try again later.");
            }
        };
        fetchEmployees();
    }, []);

    // Calculate scores dynamically based on task progress
    useEffect(() => {
        if (tasks.length > 0) {
            const score = tasks.reduce((total, task) => total + task.progress, 0) / tasks.length;
            setTotalScore(Math.round(score));
        }
    }, [tasks]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-[1200px] mx-auto px-6 py-8">
                {/* Display error message if any */}
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className='flex justify-between'>
                    <h1 className="text-3xl font-semibold text-blue-600 mb-6 flex items-center">
                        Progress Tracker
                        <Trophy className="ml-2 text-yellow-500" size={28} /> {/* Trophy Icon */}
                    </h1>
                    <p className='text-3xl font-semibold'>Project Incharge: <span className='text-blue-600'>{employee?.name || 'Loading...'}</span></p>
                </div>

                <div className='flex justify-between'>
                    <h1 className="text-xl font-semibold  mb-6 flex items-center">
                        Project Title:
                        <p className='ml-3 text-blue-600 text-xl'>{projects?.[0]?.title || 'Loading...'}</p>
                    </h1>
                </div>

                {/* Overall Score Display */}
                <div className="bg-white shadow-md p-4 mb-6 rounded-lg flex justify-between items-center">
                    <div className="text-xl font-semibold text-gray-800">
                        Overall Progress:
                    </div>
                    <div className="text-3xl font-bold text-blue-600">{projects?.[0]?.progress}%</div>
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
                            {tasks.map((task) =>
                                task.description.map((desc, index) => (
                                    <tr key={`${task._id}-${index}`} className="hover:bg-gray-50 border-b last:border-b-0">
                                        {/* Task Description */}
                                        <td className="py-4 px-4 border item-center font-medium text-gray-700">
                                            {desc} {/* Show each description in its own row */}
                                        </td>

                                            <td className="py-4 px-4 border item-center text-gray-700">
                                                {}%
                                            </td>


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
                                                        <ArrowUpCircle className="mr-2" size={18} />
                                                    ) : task.status === 'Pending' ? (
                                                        <XCircle className="mr-2" size={18} />
                                                    ) : (
                                                        <Circle className="mr-2" size={18} />
                                                    )}
                                                    {task.status}
                                                </span>
                                            </td>

                                            <td className="py-4 px-4 flex justify-center items-center">
                                                {task.status !== 'Completed' && (
                                                    <button
                                                        onClick={() =>
                                                            setTasks((prevTasks) =>
                                                                prevTasks.map((t) =>
                                                                    t._id === task._id
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProgressTracker;
