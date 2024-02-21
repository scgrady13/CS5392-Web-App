  import React, { useState } from "react";
  type Professional = {
    id: number;
    name: string;
    username: string;
    contactInformation: string;
    companyAddress: string;
    firstname: string;
    lastname: string;
    degreeDetails: string;
    qualifications: {
      category: string;
      keywords: string[];
    }[];
    description: string; // Added description field
  };
  const professionals: Professional[] = [
    { 
      id: 3, 
      name: "John Smith", 
      description: "S7dlsfkgXFR!!#",
      username: "John Smith",
      contactInformation: "professional_c@gmail.com | (345) 678-9012",
      companyAddress: "789 Professional Blvd",
      firstname: "John",
      lastname: "Smith",
      degreeDetails: "Bachelor of Arts in English Literature",
      qualifications: [
        { category: "Languages", keywords: ["Ruby, PHP"] },
        { category: "Tools", keywords: ["Atom, NetBeans"] },
        { category: "Database", keywords: ["SQLite, Redis"] },
        { category: "Experience", keywords: ["4 years"] }
      ]
    }
  ];
  const EditAccount = () => {
    const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(professionals[0]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleProfessionalClick = (professional: Professional) => {
      setSelectedProfessional(professional);
    };

    const filteredProfessionals = professionals.filter((professional) =>
      professional.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleInputChange = (field: keyof Professional, value: string) => {
      if (selectedProfessional) {
        setSelectedProfessional({ ...selectedProfessional, [field]: value });
      }
    };
  
    
    return (
      <div className="flex h-screen overflow-hidden">
        
        <div className="w-2/3 ">
        {selectedProfessional && (
      <div className="p-3">
        <h2 className="text-2xl font-bold mb-2 text-center">{selectedProfessional.name}</h2>
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
              <td className="pr-2">Contact Information:</td>
              <td>
                <input
                  type="text"
                  value={selectedProfessional.contactInformation}
                  onChange={(e) => handleInputChange('contactInformation', e.target.value)}
                  className="w-full p-2 bg-gray-200"
                />
              </td>
            </tr>
          
          
            <tr> 
                  <td className="pr-2">Password:</td>
                    <td>
                      <input
                        type="text"
                        value={selectedProfessional.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="w-full p-2 bg-gray-200 resize-none"
                      />
                    </td>
                  </tr>
          </tbody>
        </table>
      </div>
    )}
  
  </div>
  <div className="absolute bottom-4 right-4 space-x-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
              
      </div>
    );
  };

  export default EditAccount;