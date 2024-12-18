import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectInsert = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "", // Store the userId here
    name: "", // Name to be displayed in the select dropdown
  });
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
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

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // When an employee is selected, store the selected employee's userId in assignedTo
    if (name === 'name') {
      const selectedEmployee = employee.find(emp => emp.name === value);
      if (selectedEmployee) {
        setFormData(prev => ({ ...prev, assignedTo: selectedEmployee._id, name: value }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:5001/projects/assign-project", formData);

      // Show success alert and reset form
      alert("Project successfully added!");
      setSuccess(true);
      setFormData({ title: "", description: "", assignedTo: "", name: "" }); // Reset form
    } catch (err) {
      // Show error alert
      alert("Failed to submit the project. Please try again.");
      setSubmitError("Failed to submit the project. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-left">Insert Project</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[1200px] mb-10">

        {/* Display loading or error states */}
        {loading && <p className="text-blue-500">Loading employees...</p>}
        {error && <p className="text-red-500">{error}</p>}

  

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-blue-700 font-medium mb-2">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-md p-3 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Project Title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-blue-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the Project Description"
              className="p-3 w-full border rounded-md border-blue-300 outline-none"
              required
            ></textarea>
          </div>
          <div className="mb-4 flex gap-5 items-center">
            <label htmlFor="assignedTo" className="text-blue-700 font-medium">
              Project Assign To:
            </label>
            <select
              id="assignedTo"
              name="name" // Keep 'name' here for the dropdown value
              value={formData.name}
              onChange={handleChange}
              className="border border-blue-300 w-[50%] text-center rounded-md p-2 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled hidden>
                Select the Employee
              </option>
              {employee.map((item) => (
                <option key={item.id || item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
                {/* Display success or submission error messages */}
        {success && <p className="text-green-500">Project successfully added!</p>}
          {submitError && <p className="text-red-500">{submitError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition"
          >
            Add Project To List
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectInsert;
