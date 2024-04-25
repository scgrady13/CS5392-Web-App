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

const ProfessionalList = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get<Professional[]>(
          "http://localhost:8000/api/professionals/"
        );
        setProfessionals(response.data);
        console.log("Professionals data:", response.data);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      }
    };

    fetchProfessionals();
  }, []);

  const handleProfessionalClick = (professional: Professional) => {
    setSelectedProfessional(professional);
  };

  const filteredProfessionals = professionals.filter((professional) =>
    `${professional.first_name} ${professional.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
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

    const {
      id,
      user_name,
      institution_name,
      street_address,
      city,
      state,
      zip,
      first_name,
      last_name,
      email,
      phone,
      degree_name,
      month_complete,
      year_complete,
      category,
      keywords,
    } = selectedProfessional;

    if (!first_name.trim()) {
      alert("First Name cannot be empty");
      return;
    }
    if (!last_name.trim()) {
      alert("Last Name cannot be empty");
      return;
    }
    if (!email.trim().endsWith("@gmail.com")) {
      alert("Email address must end with @gmail.com");
      return;
    }
    if (!/^\d{10,}$/.test(phone.replace(/\D/g, ""))) {
      alert("Phone number must contain at least 10 digits");
      return;
    }

    try {
      // Update the professional data in the backend
      await axios.patch(
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
                {`${professional.first_name} ${professional.last_name}`}
              </h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3">
        {selectedProfessional && (
          <div className="p-3">
            <h2 className="text-2xl font-bold mb-2 text-center">
              {`${selectedProfessional.first_name} ${selectedProfessional.last_name}`}
            </h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="pr-2">Username:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.user_name}
                      readOnly
                      className="w-full p-2 bg-gray-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">First Name:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.first_name}
                      onChange={(e) =>
                        handleInputChange("first_name", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Last Name:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.last_name}
                      onChange={(e) =>
                        handleInputChange("last_name", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Contact Number:</td>
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
                  <td className="pr-2">Mailing Address:</td>
                  <td>
                    <input
                      type="text"
                      value={`${selectedProfessional.street_address}, ${selectedProfessional.city}, ${selectedProfessional.state} ${selectedProfessional.zip}`}
                      onChange={(e) =>
                        handleInputChange("street_address", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Degree:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.degree_name}
                      onChange={(e) =>
                        handleInputChange("degree_name", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Completion Date:</td>
                  <td>
                    <input
                      type="text"
                      value={`${selectedProfessional.month_complete}/${selectedProfessional.year_complete}`}
                      onChange={(e) =>
                        handleInputChange("month_complete", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Institution:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.institution_name}
                      onChange={(e) =>
                        handleInputChange("institution_name", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Category:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.category}
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Keywords:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedProfessional.keywords}
                      onChange={(e) =>
                        handleInputChange("keywords", e.target.value)
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
