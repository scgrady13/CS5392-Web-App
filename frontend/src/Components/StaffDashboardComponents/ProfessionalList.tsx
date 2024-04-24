import React, { useState, useEffect } from "react";
import axios from "axios";

type Professional = {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  mailingAddress: string;
  degreeDetails: string;
  qualifications: string;
};

const ProfessionalList = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get<any[]>(
          "http://localhost:8000/api/professionals/"
        );
        const transformedProfessionals = transformProfessionals(response.data);
        setProfessionals(transformedProfessionals);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };

    fetchProfessionals();
  }, []);

  const transformProfessionals = (data: any[]): Professional[] => {
    return data.map((item) => ({
      id: item.id,
      fullName: `${item.first_name} ${item.last_name}`,
      username: `${item.first_name.toLowerCase()}_${item.last_name.toLowerCase()}`,
      email: item.email_address,
      phone: item.phone_number,
      mailingAddress: `${item.street_address}, ${item.city}, ${item.state} ${item.zip}`,
      degreeDetails: `${item.degree_name}, ${item.institution_name}, ${item.month_complete}/${item.year_complete}`,
      qualifications: item.qualifications, // You can set a default value or derive it from the response data
    }));
  };

  const handleProfessionalClick = (professional: Professional) => {
    setSelectedProfessional(professional);
  };

  const filteredProfessionals = professionals.filter((professional) =>
    professional.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: keyof Professional, value: string) => {
    if (selectedProfessional) {
      setSelectedProfessional({ ...selectedProfessional, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!selectedProfessional) {
      console.log("Selected Professional is null. Exiting.");
      return;
    }

    const { id, fullName, email, phone, mailingAddress, qualifications } =
      selectedProfessional;

    if (!fullName.trim()) {
      alert("Full Name cannot be empty");
      return;
    }
    if (!email.trim().match(/^[\w-]+(\.[\w-]+)*@gmail\.com$/)) {
      alert(
        "Email address must be in the correct format (e.g., example@gmail.com)"
      );
      return;
    }
    if (!phone.trim().match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
      alert("Phone number must be in the format (XXX) XXX-XXXX");
      return;
    }
    if (!mailingAddress.trim()) {
      alert("Mailing Address cannot be empty");
      return;
    }
    if (!qualifications.trim()) {
      alert("Qualifications cannot be empty");
      return;
    }

    try {
      // Update the professional data in the backend
      await axios.put(
        `http://localhost:8000/api/professionals/${id}/`,
        selectedProfessional
      );
      alert("Professional updated successfully!");
    } catch (error) {
      console.error("Error updating professional:", error);
      alert("Failed to update professional. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/3 p-3">
        <input
          type="text"
          placeholder="Search professionals..."
          className="w-full p-2 mb-3 rounded-md bg-gray-800 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="h-auto border-r border-gray-600 overflow-y-auto max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
          {filteredProfessionals.map((professional) => (
            <li
              key={professional.id}
              className="professional-item p-3 border-b border-gray-300 cursor-pointer"
              onClick={() => handleProfessionalClick(professional)}
            >
              <h3 className="text-black font-extrabold">
                {professional.fullName}
              </h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 ">
        {selectedProfessional && (
          <div className="p-3">
            <h2 className="text-2xl font-bold mb-2 text-center">
              {selectedProfessional.fullName}
            </h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="pr-2">Username:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.username}
                      readOnly
                      className="w-full p-2 bg-gray-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Full Name:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Email Address:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Phone:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Mailing Address:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.mailingAddress}
                      onChange={(e) =>
                        handleInputChange("mailingAddress", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Degree Details:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.degreeDetails}
                      onChange={(e) =>
                        handleInputChange("degreeDetails", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Qualifications:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.qualifications}
                      onChange={(e) =>
                        handleInputChange("degreeDetails", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="absolute bottom-4 right-4 space-x-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalList;
