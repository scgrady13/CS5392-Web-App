import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateJob = ({ onComponentChange }, { onValidityChange }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobId, setJobID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [qualifications1, setQualifications1] = useState("");
  const [qualifications2, setQualifications2] = useState("");
  const [keyWords1, setKeyWords1] = useState("");
  const [keyWords2, setKeyWords2] = useState("");
  const [errors, setErrors] = useState<{
    jobTitle?: String;
    jobId?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    hourlyRate?: string;
    qualification1?: string;
    qualification2?: string;
    keyWords1?: string;
    keyWords2?: string;
  }>({});

  const navigate = useNavigate();
  const [isCurrentFormValid, setIsCurrentFormValid] = useState(false);

  const handleSubmit = (e) => {
    validateForm();
    e.preventDefault();
    if (isCurrentFormValid) {
      // Handle form submission logic here, such as sending data to a server
      console.log("Form submitted");
      navigate("/employer/CurrentJobs"); // Navigate to the employer page on successful submission
    } else {
      alert("Please complete all fields correctly before submitting.");
      console.error("Form is invalid!");
    }
  };

  const validateForm = () => {
    const newErrors: {
      jobTitle?: string;
      jobId?: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      email?: string;
      hourlyRate?: string;
      qualifications?: string;
    } = {};

    if (!jobTitle.trim()) newErrors.jobTitle = "Job Title is required";
    if (!jobId.trim()) newErrors.jobTitle = "Job ID is required";
    if (!firstName.trim()) newErrors.jobTitle = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/^\d{10}$/.test(phone.replace(/\D/g, "")))
      newErrors.phone = "Invalid phone number, must be 10 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address";
    if (!/^[-]/.test(hourlyRate))
      newErrors.qualifications = "Hourly Rate is required";
    if (!qualifications1.trim())
      newErrors.qualifications = "Qualificaitons are required";
    if (!qualifications2.trim())
      newErrors.qualifications = "Qualificaitons are required";
    if (!keyWords1.trim()) newErrors.qualifications = "Key Words are required";
    if (!keyWords2.trim()) newErrors.qualifications = "Key Words are required";

    setErrors(newErrors);

    onValidityChange && onValidityChange(Object.keys(newErrors).length === 0);
  };

  return (
    <div
      className="dark:bg-slate-900 bg-gray-100 min-h-full w-full flex flex-col items-center py-25"
      style={{ height: "200px", overflow: "scroll" }}
    >
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-left">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Create a Job Posting
              </h1>
              <form noValidate className="flex max-w-full flex-col gap-4">
                <div className="grid gap-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                      <h1 className="block text-1xl font-bold text-gray-800 dark:text-white">
                        Job Title
                      </h1>
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                      {errors.jobTitle && (
                        <p className="text-red-500 text-xs">
                          {errors.jobTitle}
                        </p>
                      )}
                    </div>
                    <div>
                      <h1 className="block text-1xl font-bold text-gray-800 dark:text-white">
                        Job ID
                      </h1>
                      <input
                        type="text"
                        id="uniqueId"
                        name="uniqueId"
                        value={jobId}
                        onChange={(e) => setJobID(e.target.value)}
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                      {errors.jobId && (
                        <p className="text-red-500 text-xs">{errors.jobId}</p>
                      )}
                    </div>
                    <div>
                      <h1 className="block text-1xl font-bold text-gray-800 dark:text-white">
                        Contact Information
                      </h1>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h1 className="block text-1xl font-bold text-gray-800 dark:text-white">
                      Duration
                    </h1>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endDate"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="block text-1xl font-bold text-gray-800 dark:text-white">
                      Hourly Rate
                    </h1>
                    <input
                      type="dollar"
                      id="hourlyRate"
                      name="hourlyRate"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    />
                    {errors.hourlyRate && (
                      <p className="text-red-500 text-xs">
                        {errors.hourlyRate}
                      </p>
                    )}
                  </div>
                  <div>
                    <h1 className="block text-1xl font-bold text-gray-800 dark:text-white">
                      Work Hours
                    </h1>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="startTime"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endTime"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        End Time
                      </label>
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <h1 className="block text-1xl font-bold text-gray-800 dark:text-white">
                      Qualifications
                    </h1>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Categories
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                        <input
                          type="text"
                          id="category1"
                          name="category1"
                          value={qualifications1}
                          onChange={(e) => setQualifications1(e.target.value)}
                          style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                        {errors.qualification1 && (
                          <p className="text-red-500 text-xs">
                            {errors.qualification1}
                          </p>
                        )}
                        <input
                          type="text"
                          id="category2"
                          name="category2"
                          value={qualifications2}
                          onChange={(e) => setQualifications2(e.target.value)}
                          style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                        {errors.qualification2 && (
                          <p className="text-red-500 text-xs">
                            {errors.qualification2}
                          </p>
                        )}
                        <input
                          type="text"
                          id="category3"
                          name="category3"
                          style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                        <input
                          type="text"
                          id="category4"
                          name="category4"
                          style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="keyWords"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Keywords
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                        <input
                          type="text"
                          id="keyWords1"
                          name="keyWords1"
                          value={keyWords1}
                          onChange={(e) => setKeyWords1(e.target.value)}
                          style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                        {errors.keyWords1 && (
                          <p className="text-red-500 text-xs">
                            {errors.keyWords1}
                          </p>
                        )}
                        <input
                          type="text"
                          id="keyWords2"
                          name="keyWords2"
                          value={keyWords2}
                          onChange={(e) => setKeyWords2(e.target.value)}
                          style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                        {errors.keyWords2 && (
                          <p className="text-red-500 text-xs">
                            {errors.keyWords2}
                          </p>
                        )}
                        <input
                          type="text"
                          id="keyWords3"
                          name="keyWords3"
                          style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                        <input
                          type="text"
                          id="keyWords4"
                          name="keyWords4"
                          style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm mb-2 dark:text-white"
                    >
                      Description
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                      <textarea
                        id="description"
                        name="description"
                        style={{ border: "1px solid rgba(0, 0, 0, 0.25)" }}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="w-full max-w-sm py-2 px-4 text-sm font-semibold rounded-lg border border-transparent bg-blue-500 text-gray-800 hover:bg-blue-200"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateJob;
