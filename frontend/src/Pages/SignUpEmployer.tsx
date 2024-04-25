import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpEmployer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    companyName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key]) {
        alert("Please fill in all fields.");
        console.error("Form field is empty:", key);
        return;
      }
    }

    // Check phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      console.error("Invalid phone number format.");
      return;
    }

    // Check ZIP code format
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(formData.zipCode)) {
      alert("Please enter a valid 5-digit ZIP code.");
      console.error("Invalid ZIP code format.");
      return;
    }

    try {
      const employerRegistrationData = {
        user_name: `${formData.firstName} ${formData.lastName}`, // You can modify this as per your requirements
        company_name: formData.companyName,
        street_address: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zip: formData.zipCode,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      };

      const response = await axios.post(
        "http://localhost:8000/api/employer-registrations/",
        employerRegistrationData
      );

      console.log("Registration successful:", response.data);
      navigate("/employer"); // Navigate to the employer page on successful submission
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-8">
          Employer Register
        </h2>
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={formData.zipCode}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpEmployer;
