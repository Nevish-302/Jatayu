import React, { useState } from "react";

const ResourceForm = () => {
  // Initialize the form state with default values or empty strings
  const [formData, setFormData] = useState({
    teamId: "",
    resources: [
      {
        type: "",
        number: "",
        available: true,
      },
    ],
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // API call here
      const response = await fetch("http://localhost:4000/api/organisation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Resource form submitted successfully");
      } else {
        console.error("Error submitting resource form:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to add a new resource input field
  const addResource = () => {
    setFormData({
      ...formData,
      resources: [
        ...formData.resources,
        {
          type: "",
          number: "",
          available: true,
        },
      ],
    });
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4">Enter Resources</h2>
      <form onSubmit={handleSubmit}>
        {/* Team ID */}
        <div className="mb-4">
          <label className="font-bold">Team ID:</label>
          <input
            type="text"
            placeholder="Team ID"
            name="teamId"
            value={formData.teamId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Resources */}
        <div className="mb-4">
          <label className="font-bold">Resources:</label>
          {formData.resources.map((resource, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Type"
                name={`resources[${index}].type`}
                value={resource.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Number"
                name={`resources[${index}].number`}
                value={resource.number}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500"
              />
              <label className="ml-2">
                Available:
                <input
                  type="checkbox"
                  name={`resources[${index}].available`}
                  checked={resource.available}
                  onChange={handleChange}
                  className="ml-2"
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={addResource}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
          >
            Add Resource
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded cursor-pointer hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
