import React, { useState, useEffect } from "react";
import axios from "axios";

type Professional = {
  id: number;
  user_name: string;
  institution_name: string;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  degree_name: string;
  month_complete: number;
  year_complete: number;
  category: string;
  keywords: string;
};

const ProfessionalDeleteRequest = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [currentProfessionalIndex, setCurrentProfessionalIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get<Professional[]>(
          "http://localhost:8000/api/professional-delete/"
        );
        setProfessionals(response.data);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };

    fetchProfessionals();
  }, []);

  const currentProfessional = professionals[currentProfessionalIndex];

  const handleDecline = async () => {
    try {
      if (!currentProfessional) return;
      // Delete the current professional from the ProfessionalProfileDeleteRequest table
      await axios.delete(
        `http://localhost:8000/api/professional-delete/${currentProfessional.id}/`
      );

      setMessage("Professional successfully deleted.");
      setTimeout(() => {
        setMessage("");
        if (currentProfessionalIndex < professionals.length - 1) {
          setCurrentProfessionalIndex(currentProfessionalIndex + 1);
        } else {
          setCurrentProfessionalIndex(0);
        }
      }, 2000);
    } catch (error) {
      console.error("Error handling professional:", error);
    }
  };

  return (
    <div className="container h-screen flex justify-center items-start">
      {currentProfessional ? (
        <div className="professional-info text-center w-full">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-3">Firstname:</td>
                <td>
                  <input
                    type="text"
                    value={currentProfessional.first_name}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Lastname:</td>
                <td>
                  <input
                    type="text"
                    value={currentProfessional.last_name}
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
                    value={currentProfessional.user_name}
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
                    value={`${currentProfessional.email} | ${currentProfessional.phone}`}
                    readOnly
                    className="w-full p-2 bg-gray-500 resize-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Mailing Address:</td>
                <td>
                  <textarea
                    value={`${currentProfessional.street_address}, ${currentProfessional.city}, ${currentProfessional.state} ${currentProfessional.zip}`}
                    readOnly
                    className="w-full p-2 bg-gray-500 resize-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Degree Completion:</td>
                <td>
                  <input
                    type="text"
                    value={`${currentProfessional.degree_name}, ${currentProfessional.month_complete}/${currentProfessional.year_complete}`}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Qualifications:</td>
                <td>
                  <input
                    type="text"
                    value={`Category: ${currentProfessional.category}, Keywords: ${currentProfessional.keywords}`}
                    readOnly
                    className="w-full p-2 bg-gray-500"
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
          <h2 className="text-2xl font-bold">
            No Professional Delete Requests
          </h2>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDeleteRequest;
