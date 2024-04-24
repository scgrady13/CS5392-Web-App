import React, { useState, useEffect } from "react";
import axios from "axios";

type ProfessionalRegistration = {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email_address: string;
  degree_name: string;
  institution_name: string;
  month_complete: number;
  year_complete: number;
  street_address: string;
  city: string;
  state: string;
  zip: string;
  qualifications: string;
  phone_number: string;
};

const ProfessionalRequest = () => {
  const [currentProfessionalIndex, setCurrentProfessionalIndex] = useState(0);
  const [professionals, setProfessionals] = useState<
    ProfessionalRegistration[]
  >([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get<ProfessionalRegistration[]>(
          "http://localhost:8000/api/professional-registrations/"
        );
        setProfessionals(response.data);
        console.log("Professionals data:", response.data);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };

    fetchProfessionals();
  }, []);

  const currentProfessional: ProfessionalRegistration | undefined =
    professionals[currentProfessionalIndex];

  const handleAccept = async () => {
    try {
      if (!currentProfessional) return;
      // Restructure the data as per the server-side requirements
      const professionalData = {
        first_name: currentProfessional.first_name,
        last_name: currentProfessional.last_name,
        email_address: currentProfessional.email_address,
        degree_name: currentProfessional.degree_name,
        institution_name: currentProfessional.institution_name,
        month_complete: currentProfessional.month_complete,
        year_complete: currentProfessional.year_complete,
        street_address: currentProfessional.street_address,
        city: currentProfessional.city,
        state: currentProfessional.state,
        zip: currentProfessional.zip,
        qualifications: currentProfessional.qualifications,
        phone_number: currentProfessional.phone_number,
        // Add any other required fields
      };

      // Move the current professional to the professionals table
      await axios.post(
        "http://localhost:8000/api/professionals/",
        professionalData
      );

      // Delete the current professional from the professional registration table
      await axios.delete(
        `http://localhost:8000/api/professional-registrations/${currentProfessional.id}/`
      );

      setMessage("Professional successfully accepted.");
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

  const handleDecline = async () => {
    try {
      if (!currentProfessional) return;
      // Delete the current professional from the professional registration table
      await axios.delete(
        `http://localhost:8000/api/professional-registrations/${currentProfessional.id}/`
      );

      setMessage("Professional successfully declined.");
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
    <div className="professional-info text-center w-full">
      {currentProfessional && (
        <div>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="p-3">First Name:</td>
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
                <td className="p-3">Last Name:</td>
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
                    value={currentProfessional.phone_number}
                    readOnly
                    className="w-full p-2 bg-gray-500 resize-none"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Email:</td>
                <td>
                  <input
                    type="text"
                    value={currentProfessional.email_address}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Degree:</td>
                <td>
                  <input
                    type="text"
                    value={currentProfessional.degree_name}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Institution:</td>
                <td>
                  <input
                    type="text"
                    value={currentProfessional.institution_name}
                    readOnly
                    className="w-full p-2 bg-gray-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Completion Date:</td>
                <td>
                  <input
                    type="text"
                    value={`${currentProfessional.month_complete}/${currentProfessional.year_complete}`}
                    readOnly
                    className="w-full p-2 bg-gray-500"
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
                    rows={2}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3">Qualifications:</td>
                <td>
                  <input
                    type="text"
                    value={currentProfessional.qualifications}
                    readOnly
                    className="w-full p-2 bg-gray-500"
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

export default ProfessionalRequest;
