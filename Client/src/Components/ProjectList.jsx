import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, ArrowUpCircle } from 'lucide-react'; // Lucide icons

const AssignedProjects = () => {
    const [projects, setProjects] = useState([
        // Temporary dummy data
        {
            _id: "1",
            title: "Farm-to-Retailer",
            description: "Connecting farmers directly with retailers for better pricing.",
            status: "In Progress",
            progress: 50
        },
        {
            _id: "2",
            title: "Agri-Tech Solutions",
            description: "Leveraging technology for modern farming techniques.",
            status: "Completed",
            progress: 100
        },
        {
            _id: "3",
            title: "Crop Management",
            description: "Optimizing crop yield and management techniques.",
            status: "Pending",
            progress: 0
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Accept Project
    const handleAccept = async (projectId) => {
        try {
            await axios.put(`http://localhost:5001/projects/${projectId}/accept`, { status: 'Accepted' });
            setProjects(projects.map((project) =>
                project._id === projectId ? { ...project, status: 'Accepted' } : project
            ));
        } catch (err) {
            setError("Failed to accept project.");
        }
    };

    // Decline Project
    const handleDecline = async (projectId) => {
        try {
            await axios.put(`http://localhost:5001/projects/${projectId}/accept`, { status: 'Declined' });
            setProjects(projects.map((project) =>
                project._id === projectId ? { ...project, status: 'Declined' } : project
            ));
        } catch (err) {
            setError("Failed to decline project.");
        }
    };

    // Update Progress
    const handleProgressUpdate = async (projectId, progress) => {
        try {
            await axios.put(`http://localhost:5001/projects/${projectId}/progress`, { progress });
            setProjects(projects.map((project) =>
                project._id === projectId ? { ...project, progress } : project
            ));
        } catch (err) {
            setError("Failed to update progress.");
        }
    };

    return (
        <div className="bg-blue-200 min-h-screen">
            <div className="max-w-[1200px] mx-auto px-6 py-10">
                <h1 className="text-3xl font-semibold text-blue-600 mb-6">Assigned Projects</h1>

                {/* Loading and Error States */}
                {loading && <div className="text-center text-blue-500">Loading projects...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}

                {/* No Projects */}
                {projects.length === 0 && !loading && (
                    <div className="text-center text-gray-500">No assigned projects found.</div>
                )}

                {/* Project Table */}
                {!loading && !error && projects.length > 0 && (
                    <div className="overflow-x-auto shadow-lg border border-gray-300 rounded-lg">
                        <table className="min-w-full text-center border-collapse table-auto">
                            <thead className="bg-blue-600 text-white">
                                <tr>
                                    <th className="py-2 px-4 border">Project Title</th>
                                    <th className="py-2 px-4 border">Description</th>
                                    <th className="py-2 px-4 border">Status</th>
                                    <th className="py-2 px-4 border">Progress</th>
                                    <th className="py-2 px-4 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr key={project._id} className="bg-white border-b hover:bg-blue-50">
                                        <td className="py-3 px-4 border">{project.title}</td>
                                        <td className="py-3 px-4 border">{project.description}</td>
                                        <td className="py-3 px-4 border">
                                            <span
                                                className={`px-3 py-1 rounded-full ${project.status === 'Completed'
                                                        ? 'bg-green-500 text-white'
                                                        : project.status === 'In Progress'
                                                            ? 'bg-yellow-500 text-white'
                                                            : project.status === 'Accepted'
                                                                ? 'bg-blue-500 text-white'
                                                                : 'bg-gray-500 text-white'
                                                    }`}
                                            >
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 border">{project.progress}%</td>
                                        <td className="py-3 px-4 border">
                                            {/* Actions */}
                                            {project.status === 'Pending' && (
                                                <div className="flex justify-center space-x-3">
                                                    <button
                                                        onClick={() => handleAccept(project._id)}
                                                        className="text-green-600 hover:text-green-800"
                                                        title="Accept Project"
                                                    >
                                                        <CheckCircle size={24} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDecline(project._id)}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Decline Project"
                                                    >
                                                        <XCircle size={24} />
                                                    </button>
                                                </div>
                                            )}
                                            {project.status === 'In Progress' && (
                                                <button
                                                    onClick={() =>
                                                        handleProgressUpdate(project._id, project.progress + 10)
                                                    }
                                                    className="text-yellow-500 hover:text-yellow-700"
                                                    title="Increase Progress"
                                                >
                                                    <ArrowUpCircle size={24} />
                                                </button>
                                            )}
                                        </td>
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
