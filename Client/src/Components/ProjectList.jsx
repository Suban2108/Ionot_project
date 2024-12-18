import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, ArrowUpCircle } from 'lucide-react';
import ProjectInsert from './projectInsert';

const AssignedProjects = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [employee, setEmployee] = useState([]);
    const [projects, setProjects] = useState([]);


    // Fetch projects on component mount
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get("http://localhost:5001/projects");
                setProjects(response.data);
            } catch (err) {
                setError("Failed to fetch projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();


        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5001/users/users-Data");
                setEmployee(response.data);
            } catch (err) {
                setError("Failed to fetch employees. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    // Accept Project
    const handleAccept = async (projectId) => {
        try {
            await axios.put(`http://localhost:5001/projects/${projectId}`, { status: 'Accepted' });
            setProjects(projects.map((project) =>
                project._id === projectId ? { ...project, status: 'Accepted' } : project
            ));
        } catch {
            setError("Failed to accept the project. Please try again.");
        }
    };


    // Decline Project
    const handleDecline = async (projectId) => {
        try {
            await axios.put(`http://localhost:5001/projects/${projectId}`, { status: 'Declined' });
            setProjects(projects.map((project) =>
                project._id === projectId ? { ...project, status: 'Declined' } : project
            ));
        } catch {
            setError("Failed to decline the project. Please try again.");
        }
    };


    // Update Progress
    const handleProgressUpdate = async (projectId, progress) => {
        try {
            await axios.put(`http://localhost:5001/projects/${projectId}`, { progress });
            setProjects(projects.map((project) =>
                project._id === projectId ? { ...project, progress } : project
            ));
        } catch {
            setError("Failed to update project progress. Please try again.");
        }
    };

    // Handle Read More toggle
    const [readMore, setReadMore] = useState({});

    const toggleReadMore = (projectId) => {
        setReadMore((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
    };

    return (
        <div className="bg-blue-200 min-h-screen">
            <div className="max-w-[1200px] mx-auto px-6 py-10">
                <ProjectInsert />
                <h1 className="text-3xl font-semibold text-blue-600 mb-6">Assigned Projects</h1>

                {/* Loading, Error States */}
                {loading && <div className="text-center text-blue-500">Loading projects...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}

                {/* No Projects */}
                {!loading && projects.length === 0 && !error && (
                    <div className="text-center text-gray-500">No assigned projects found.</div>
                )}

                {/* Project Table */}
                {!loading && projects.length > 0 && (
                    <div className="overflow-x-auto shadow-lg border border-gray-300 rounded-lg">
                        <table className="min-w-full text-center border-collapse table-auto">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="py-2 px-4 border">Project Title</th>
                                    <th className="py-2 px-4 border">Description</th>
                                    <th className="py-2 px-4 border">Status</th>
                                    <th className="py-2 px-4 border">Progress</th>
                                    <th className="py-2 px-4 border">Actions</th>
                                    <th className="py-2 px-4 border">Assigned To</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project._id} className="bg-white border-b hover:bg-blue-50">
                                        <td className="py-3 px-4 border">{project.title}</td>
                                        <td className="py-3 px-4 border">
                                            {project.description.length > 100 && !readMore[project._id] ? (
                                                <>
                                                    {project.description.slice(0, 100)}...
                                                    <button
                                                        className="text-blue-500"
                                                        onClick={() => toggleReadMore(project._id)}
                                                    >
                                                        Read More
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    {project.description}
                                                    {project.description.length > 100 && (
                                                        <button
                                                            className="text-blue-500"
                                                            onClick={() => toggleReadMore(project._id)}
                                                        >
                                                            Show Less
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 border">
                                            <span
                                                className={`px-3 py-1 rounded-full text-[10px] ${(project.progress === 100 && project.status !== 'Completed')
                                                    ? 'bg-green-500 text-white'
                                                    : project.status === 'In Progress'
                                                        ? 'bg-yellow-500 text-white'
                                                        : project.status === 'Accepted'
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-500 text-white'
                                                    }`}
                                            >
                                                {project.progress === 100
                                                    ? 'Completed'
                                                    : project.progress === 0
                                                        ? 'Pending'
                                                        : project.status}
                                            </span>

                                        </td>
                                        <td className="py-3 px-4 border">{project.progress}%</td>
                                        <td className="py-3 px-4 border">
                                            {project.status === 'Pending' ? (
                                                <div className="flex justify-center space-x-3">
                                                    <button
                                                        onClick={() => handleAccept(project._id)}
                                                        className="text-green-600 hover:text-green-800"
                                                        title="Accept Project"
                                                    >
                                                        <CheckCircle size={20} />
                                                    </button>
                                                </div>
                                            ) : project.status === 'In Progress' ? (
                                                <button
                                                    onClick={() =>
                                                        handleProgressUpdate(
                                                            project._id,
                                                            Math.min(project.progress + 10, 100)
                                                        )
                                                    }
                                                    className="text-yellow-500 hover:text-yellow-700"
                                                    title="Increase Progress"
                                                >
                                                    <ArrowUpCircle size={20} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleProgressUpdate(
                                                            project._id,
                                                            Math.min(project.progress + 10, 100)
                                                        )
                                                    }
                                                    className="text-yellow-500 hover:text-yellow-700"
                                                    title="Increase Progress"
                                                >
                                                    <ArrowUpCircle size={20} />
                                                </button>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 border item-center">{project.name || 'N/A'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignedProjects;
