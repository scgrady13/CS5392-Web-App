import React, { useState, useEffect } from "react";
import axios from "axios";

interface Employer {
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
}

interface Job {
  id: number;
  employer: Employer;
  position_name: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_phone: string;
  contact_email: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  payment: number;
  qualifications_required: string;
}

const JobPostings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Job[]>(
          "http://localhost:8000/api/job/"
        );
        setJobs(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const filteredJobs = jobs.filter((job) =>
    job.position_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/3 p-3">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full p-2 mb-3 rounded-md bg-gray-800 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="h-auto border-r border-gray-600 overflow-y-auto max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
          {filteredJobs.map((job) => (
            <li
              key={job.id}
              className="job-item p-3 border-b border-gray-300 cursor-pointer"
              onClick={() => handleJobClick(job)}
            >
              <h3 className="text-black font-extrabold">{job.position_name}</h3>
              <h5 className="font-semibold">{job.employer.company_name}</h5>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3">
        {selectedJob && (
          <div className="p-3">
            <h2 className="text-3xl font-bold text-center">
              {selectedJob.position_name}
            </h2>
            <h3 className="text-3xl font-bold text-center">
              {selectedJob.employer.company_name}
            </h3>
            <div className="m-5 ml-10 mr-10 mb-0 flex text-l font-semibold justify-between">
              <p>${selectedJob.payment} / Hour</p>
              <p>Start Date: {selectedJob.start_date}</p>
            </div>
            <div className="m-5 ml-10 mr-10 mt-3 flex text-l font-semibold justify-between">
              <p>
                {selectedJob.start_time} to {selectedJob.end_time}
              </p>
              <p>End Date: {selectedJob.end_date}</p>
            </div>
            <div className="m-5 ml-10 mr-10 mt-3">
              <h4 className="text-xl font-semibold mb-2">Qualifications:</h4>
              <p>{selectedJob.qualifications_required}</p>
            </div>
            <div className="m-5 ml-10 mr-10 mt-3">
              <h4 className="text-xl font-semibold mb-2">Contact:</h4>
              <p>
                {selectedJob.contact_first_name} {selectedJob.contact_last_name}
              </p>
              <p>{selectedJob.contact_email}</p>
              <p>{selectedJob.contact_phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostings;
