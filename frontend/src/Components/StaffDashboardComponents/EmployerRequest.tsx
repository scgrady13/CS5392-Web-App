import React, { useState, useEffect } from "react";
import axios from "axios";

type EmployerRegistration = {
  id: number;
  user_name: string;
  company_name: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
};

const EmployerRequest = () => {
  const [currentEmployerIndex, setCurrentEmployerIndex] = useState(0);
  const [employers, setEmployers] = useState<EmployerRegistration[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get<EmployerRegistration[]>(
          "http://localhost:8000/api/employer-registrations/"
        );
        setEmployers(response.data);
        console.log("Employers data:", response.data);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    };

    fetchEmployers();
  }, []);

  const currentEmployer: EmployerRegistration | undefined =
    employers[currentEmployerIndex];

  const handleAccept = async () => {
    try {
      // Restructure the data as per the server-side requirements
      const employerData = {
        company_name: currentEmployer.company_name,
        street_address: currentEmployer.street_address,
        city: currentEmployer.city,
        state: currentEmployer.state,
        zip: currentEmployer.zip,
        first_name: currentEmployer.first_name,
        last_name: currentEmployer.last_name,
        email: currentEmployer.email,
        phone: currentEmployer.phone,
        // Add any other required fields
      };

      // Move the current employer to the employers table
      await axios.post("http://localhost:8000/api/employers/", employerData);

      // Delete the current employer from the employer registration table
      await axios.delete(
        `http://localhost:8000/api/employer-registrations/${currentEmployer.id}/`
      );

      setMessage("Employer successfully accepted.");
      setTimeout(() => {
        setMessage("");
        if (currentEmployerIndex < employers.length - 1) {
          setCurrentEmployerIndex(currentEmployerIndex + 1);
        } else {
          setCurrentEmployerIndex(0);
        }
      }, 2000);
    } catch (error) {
      console.error("Error handling employer:", error);
    }
  };

  const handleDecline = async () => {
    try {
      // Delete the current employer from the employer registration table
      await axios.delete(
        `http://localhost:8000/api/employer-registrations/${currentEmployer.id}/`
      );

      setMessage("Employer successfully declined.");
      setTimeout(() => {
        setMessage("");
        if (currentEmployerIndex < employers.length - 1) {
          setCurrentEmployerIndex(currentEmployerIndex + 1);
        } else {
          setCurrentEmployerIndex(0);
        }
      }, 2000);
    } catch (error) {
      console.error("Error handling employer:", error);
    }
  };

  return (
    <div className="employer-info text-center w-full">
      {currentEmployer && (
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-3">First Name:</td>
                <td>
                  <input
                    type="text"
                    value={currentEmployer.first_name}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Last Name:</td>
                <td>
                  <input
                    type="text"
                    value={currentEmployer.last_name}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Preferred Username:</td>
                <td>
                  <input
                    type="text"
                    value={currentEmployer.user_name}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Contact Information:</td>
                <td>
                  <input
                    type="text"
                    value={currentEmployer.phone}
                    readOnly
                    className="w-full p-2 bg-gray-500 resize-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Company Name:</td>
                <td>
                  <input
                    type="text"
                    value={currentEmployer.company_name}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Mailing Address:</td>
                <td>
                  <textarea
                    value={`${currentEmployer.street_address}, ${currentEmployer.city}, ${currentEmployer.state} ${currentEmployer.zip}`}
                    readOnly
                    className="w-full p-2 bg-gray-500 resize-none"
                    rows={2}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-container mt-4">
            <button
              onClick={handleAccept}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4"
            >
              Accept
            </button>
            <button
              onClick={handleDecline}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Decline
            </button>
          </div>
          {message && <p className="font-bold mt-4 message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default EmployerRequest;
