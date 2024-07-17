import React, { useState } from 'react';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    receiverId: '',
    teamId: '',
    message: '',
  });

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


//api dal lena bas mujhe nai mili


        const response = await fetch('http://localhost:4000/api/v1/organisation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Error submitting form:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="request-form" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Create Request</h2>
      <form onSubmit={handleSubmit}>
        {/* Receiver ID */}
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Receiver ID:</label>
          <input
            type="text"
            placeholder="Receiver ID"
            name="receiverId"
            value={formData.receiverId}
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

        {/* Message */}
        <div className="form-group">
          <label style={{ fontWeight: 'bold' }}>Message:</label>
          <textarea
            placeholder="Message"
            name="message"
            value={formData.message}
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

export default RequestForm;
