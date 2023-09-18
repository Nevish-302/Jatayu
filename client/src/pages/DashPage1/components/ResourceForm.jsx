import React, { useState } from 'react';


//availability hata dena mann kare toh!

//styling kal karvaenge aayush se!

const ResourceForm = () => {
  // Initialize the form state with default values or empty strings
  const [formData, setFormData] = useState({
    teamId: '',
    resources: [
      {
        type: '',
        number: '',
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



//api dal lo yaha apni


        const response = await fetch('http://localhost:4000/api/organisation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Resource form submitted successfully');
      } else {
        console.error('Error submitting resource form:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addResource = () => {
    setFormData({
      ...formData,
      resources: [
        ...formData.resources,
        {
          type: '',
          number: '',
          available: true,
        },
      ],
    });
  };

  return (
    <div className="resource-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Enter Resources</h2>
      <form onSubmit={handleSubmit}>
        {/* Team ID */}
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Team ID:</label>
          <input
            type="text"
            placeholder="Team ID"
            name="teamId"
            value={formData.teamId}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: 'white',
            }}
          />
        </div>

        {/* Resources */}
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Resources:</label>
          {formData.resources.map((resource, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Type"
                name={`resources[${index}].type`}
                value={resource.type}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                }}
              />
              <input
                type="number"
                placeholder="Number"
                name={`resources[${index}].number`}
                value={resource.number}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginBottom: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                }}
              />
              <label>
                Available:
                <input
                  type="checkbox"
                  name={`resources[${index}].available`}
                  checked={resource.available}
                  onChange={handleChange}
                  style={{ marginLeft: '8px' }}
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={addResource}
            style={{
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            Add Resource
          </button>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            style={{
              backgroundColor: '#28A745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
