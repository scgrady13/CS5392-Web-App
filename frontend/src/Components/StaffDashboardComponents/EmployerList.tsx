import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the type for an employer
type Employer = {
  id: number;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  contactNumber: string;
  contactPerson: string;
  mailingAddress: string;
  username: string;
};

const EmployerList = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get<any[]>(
          "http://localhost:8000/api/employers/"
        );
        const transformedEmployers = transformEmployers(response.data);
        setEmployers(transformedEmployers);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    };

    fetchEmployers();
  }, []);

  const transformEmployers = (data: any[]): Employer[] => {
    return data.map((item) => ({
      id: item.id,
      companyName: item.company_name,
      streetAddress: item.street_address,
      city: item.city,
      state: item.state,
      zip: item.zip,
      firstName: item.first_name,
      lastName: item.last_name,
      emailAddress: item.email,
      contactNumber: item.phone,
      contactPerson: `${item.first_name} ${item.last_name}`,
      mailingAddress: `${item.street_address}, ${item.city}, ${item.state} ${item.zip}`,

      username: `${item.first_name.toLowerCase()}_${item.last_name.toLowerCase()}`,
    }));
  };

  const handleEmployerClick = (employer: Employer) => {
    setSelectedEmployer(employer);
  };

  const handleInputChange = (field: keyof Employer, value: string) => {
    if (selectedEmployer) {
      setSelectedEmployer({ ...selectedEmployer, [field]: value });
    }
  };

  const filteredEmployers = employers.filter((employer) =>
    `${employer.firstName} ${employer.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSave = async () => {
    if (!selectedEmployer) {
      console.log("Selected Employer is null. Exiting.");
      return;
    }

    const {
      id,
      companyName,
      streetAddress,
      city,
      state,
      zip,
      firstName,
      lastName,
      emailAddress,
      contactNumber,
    } = selectedEmployer;

    if (!companyName.trim()) {
      alert("Company Name cannot be empty");
      return;
    }
    if (!streetAddress.trim()) {
      alert("Street Address cannot be empty");
      return;
    }
    if (!city.trim()) {
      alert("City cannot be empty");
      return;
    }
    if (!state.trim()) {
      alert("State cannot be empty");
      return;
    }
    if (!zip.trim()) {
      alert("ZIP Code cannot be empty");
      return;
    }
    if (!firstName.trim()) {
      alert("First Name cannot be empty");
      return;
    }
    if (!lastName.trim()) {
      alert("Last Name cannot be empty");
      return;
    }
    if (!emailAddress.trim().endsWith("@gmail.com")) {
      alert("Email address must end with @gmail.com");
      return;
    }
    if (!/^\d{10,}$/.test(contactNumber.replace(/\D/g, ""))) {
      alert("Phone number must contain at least 10 digits");
      return;
    }

    try {
      // Update the employer data in the backend
      await axios.patch(`http://localhost:8000/api/employers/${id}/`, {
        company_name: companyName,
        street_address: streetAddress,
        city: city,
        state: state,
        zip: zip,
        first_name: firstName,
        last_name: lastName,
        email: emailAddress,
        phone: contactNumber,
      });
      alert("Employer updated successfully!");
    } catch (error) {
      console.error("Error updating employer:", error);
      alert("Failed to update employer. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/3 p-3">
        <input
          type="text"
          placeholder="Search employers..."
          className="w-full p-2 mb-3 rounded-md bg-gray-800 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="h-auto border-r border-gray-600 overflow-y-auto max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
          {filteredEmployers.map((employer) => (
            <li
              key={employer.id}
              className="employer-item p-3 border-b border-gray-300 cursor-pointer"
              onClick={() => handleEmployerClick(employer)}
            >
              <h3 className="text-black font-extrabold">
                {`${employer.firstName} ${employer.lastName}`}
              </h3>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3">
        {selectedEmployer && (
          <div className="p-3">
            <h2 className="text-2xl font-bold mb-2 text-center">
              {`${selectedEmployer.firstName} ${selectedEmployer.lastName}`}
            </h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="pr-2">Username:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedEmployer.username}
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
                      value={selectedEmployer.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
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
                      value={selectedEmployer.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
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
                      value={selectedEmployer.contactNumber}
                      onChange={(e) =>
                        handleInputChange("contactNumber", e.target.value)
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
                      value={selectedEmployer.emailAddress}
                      onChange={(e) =>
                        handleInputChange("emailAddress", e.target.value)
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
                      value={selectedEmployer.mailingAddress}
                      onChange={(e) =>
                        handleInputChange("mailingAddress", e.target.value)
                      }
                      className="w-full p-2 bg-gray-200"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pr-2">Company name:</td>
                  <td>
                    <input
                      type="text"
                      value={selectedEmployer.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
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
export default EmployerList;
