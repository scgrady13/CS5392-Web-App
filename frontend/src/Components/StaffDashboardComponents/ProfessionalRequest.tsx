import React, { useState, useEffect } from "react";
import axios from "axios";

type ProfessionalRegistration = {
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
        institution_name: currentProfessional.institution_name,
        street_address: currentProfessional.street_address,
        city: currentProfessional.city,
        state: currentProfessional.state,
        zip: currentProfessional.zip,
        first_name: currentProfessional.first_name,
        last_name: currentProfessional.last_name,
        email: currentProfessional.email,
        phone: currentProfessional.phone,
        degree_name: currentProfessional.degree_name,
        month_complete: currentProfessional.month_complete,
        year_complete: currentProfessional.year_complete,
        category: currentProfessional.category,
        keywords: currentProfessional.keywords,
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
        <div className="grid grid-cols-2 gap-4">
          {/* First column */}
          <div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.first_name}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">First Name</label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.last_name}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">Last Name</label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.user_name}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">Preferred Username</label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.phone}
                readOnly
                className="w-full p-2 bg-gray-500 resize-none"
              />
              <label className="block text-left">Contact Information</label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.email}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">Email</label>
            </div>
          </div>
          {/* Second column */}
          <div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.degree_name}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">Degree</label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.institution_name}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">Institution</label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={`${currentProfessional.month_complete}/${currentProfessional.year_complete}`}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">Completion Date</label>
            </div>
            <div className="mb-4">
              <textarea
                value={`${currentProfessional.street_address}, ${currentProfessional.city}, ${currentProfessional.state} ${currentProfessional.zip}`}
                readOnly
                className="w-full p-2 bg-gray-500 resize-none"
                rows={2}
              />
              <label className="block text-left">Mailing Address</label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.category}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">Category</label>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={currentProfessional.keywords}
                readOnly
                className="w-full p-2 bg-gray-500"
              />
              <label className="block text-left">Keywords</label>
            </div>
          </div>
          <div className="col-span-2 flex justify-center">
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
