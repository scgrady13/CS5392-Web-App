import React, { useState, useEffect } from "react";
import axios from "axios";

type Employer = {
  id: number;
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

const EmployerDeleteRequest = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [currentEmployerIndex, setCurrentEmployerIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get<Employer[]>(
          "http://localhost:8000/api/employers-delete/"
        );
        setEmployers(response.data);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    };

    fetchEmployers();
  }, []);

  const currentEmployer = employers[currentEmployerIndex];

  const handleDecline = async () => {
    try {
      if (!currentEmployer) return;
      // Delete the current employer from the EmployerProfileDeleteRequest table
      await axios.delete(
        `http://localhost:8000/api/employers-delete/${currentEmployer.id}/`
      );

      setMessage("Employer successfully deleted.");
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
    <div className="container h-screen flex justify-center items-start">
      {currentEmployer ? (
        <div className="employer-info text-center w-full">
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
              <tr>
                <td className="p-3">Contact Information:</td>
                <td>
                  <input
                    type="text"
                    value={`${currentEmployer.phone} | ${currentEmployer.email}`}
                    readOnly
                    className="w-full p-2 bg-gray-500 resize-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-container mt-4">
            <button
              onClick={handleDecline}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Delete
            </button>
          </div>
          {message && <p className="font-bold mt-4 message">{message}</p>}
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">No Employer Delete Requests</h2>
        </div>
      )}
    </div>
  );
};

export default EmployerDeleteRequest;
