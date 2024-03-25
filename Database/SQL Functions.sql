-- 1. A new professional registers with the agency
INSERT INTO ProfessionalRegistration (ProfessionalTempID, Username, FirstName, LastName, EmailAddress, DegreeName, InstitutionName, MonthComplete, YearComplete, StreetAddress, City, State, Zip, PhoneNumber, Qualifications)
VALUES ('pt06', 'newpro', 'John', 'Doe', 'newpro@gmail.com', 'Bachelor of Science', 'University XYZ', 6, 2021, '123 Main St', 'Cityville', 'CA', '12345', '1234567890', 'Java,Python');

-- 2. A new employer registers with the agency
INSERT INTO EmployerRegistration (EmployerTempID, Username, CompanyName, StreetAddress, City, State, Zip, FirstName, LastName, Email, PhoneNumber)
VALUES ('et06', 'newemp', 'ABC Corp', '456 Oak Rd', 'Townsville', 'NY', '67890', 'Jane', 'Smith', 'newemp@gmail.com', '0987654321');

-- 3. A professional modifies his/her profile
UPDATE Professional
SET DegreeName = 'Master of Science', InstitutionName = 'Tech University'
WHERE Username = 'pro1';

-- 4. An employer modifies the company's profile
UPDATE Employer
SET CompanyName = 'XYZ Solutions', StreetAddress = '789 Elm St'
WHERE Username = 'emp2';

-- 5. A professional initiates job matching
INSERT INTO JobMatchingRequest (RequestID) VALUES (DEFAULT);

-- 6. An employer posts a job
INSERT INTO Job (EmployerID, PositionName, ContactFirstName, ContactLastName, ContactPhone, ContactEmail, StartDate, EndDate, StartTime, EndTime, Payment, Qualifications)
VALUES ((SELECT EmployerID FROM Employer WHERE Username = 'emp3'), 'Web Developer', 'Michael', 'Johnson', '5551234567', 'michael@tech.com', '2023-07-01', '2023-09-30', '09:00:00', '18:00:00', 8000.00, 'HTML,CSS,JavaScript');

-- 7. A professional pays for the account
UPDATE Professional
SET Payment = Payment + 50.00
WHERE Username = 'pro2';

-- 8. An employer pays for the account
UPDATE Employer
SET Payment = Payment + 100.00
WHERE Username = 'emp4';

-- 9. A professional changes password
UPDATE User
SET Password = 'newpassword'
WHERE Username = 'pro3@gmail.com';

-- 10. An employer changes password
UPDATE User
SET Password = 'newpassword'
WHERE Username = 'emp5@gmail.com';

-- 11. A professional requests for deletion of his/her account
INSERT INTO ProfessionalProfileDeleteRequest (RequestID) VALUES (DEFAULT);

-- 12. An employer requests for deletion of the company's account
INSERT INTO EmployerProfileDeleteRequest (RequestID) VALUES (DEFAULT);

-- 13. A staff member changes password
UPDATE User
SET Password = 'newpassword'
WHERE Username = 'staff1@gmail.com';

NOT NEEDED
-- 14. A staff member retrieves a request from a new professional and creates an account
INSERT INTO Professional (ProfessionalID, Username, FirstName, LastName, EmailAddress, DegreeName, InstitutionName, MonthComplete, YearComplete, StreetAddress, City, State, Zip, Qualifications, PhoneNumber, Payment)
SELECT ProfessionalTempID, Username, FirstName, LastName, EmailAddress, DegreeName, InstitutionName, MonthComplete, YearComplete, StreetAddress, City, State, Zip, Qualifications, PhoneNumber, 0
FROM ProfessionalRegistration
WHERE ProfessionalTempID = 'pt06';

-- 15. A staff member retrieves a request from a new employer and creates an account
INSERT INTO Employer (EmployerID, Username, CompanyName, StreetAddress, City, State, Zip, FirstName, LastName, Email, PhoneNumber, Payment)
SELECT EmployerTempID, Username, CompanyName, StreetAddress, City, State, Zip, FirstName, LastName, Email, PhoneNumber, 0
FROM EmployerRegistration
WHERE EmployerTempID = 'et06';


-- 16. A staff member retrieves a request from an existing professional to delete the account
DELETE FROM Professional
WHERE Username = (
    SELECT Username
    FROM ProfessionalProfileDeleteRequest
    ORDER BY RequestID DESC
    LIMIT 1
);

-- 17. A staff member retrieves a request from an existing employer to delete their account
DELETE FROM Employer
WHERE Username = (
    SELECT Username
    FROM EmployerProfileDeleteRequest
    ORDER BY RequestID DESC
    LIMIT 1
);

-- 18. A staff member initiates job matching for a professional
SELECT j.*
FROM Job j
CROSS JOIN Professional p
WHERE CONCAT(',', p.Qualifications, ',') LIKE CONCAT('%,', j.Qualifications, ',%')
AND p.ProfessionalID = 'p01';

-- 19. An administrator creates a new staff account
INSERT INTO Staff (StaffID, Username, FirstName, LastName, Email, PhoneNumber)
VALUES ('s06', 'newstaff', 'Alex', 'Smith', 'newstaff@gmail.com', '9876543210');

INSERT INTO User (Username, Password, UserType, Email, PhoneNumber)
VALUES ('newstaff', 'password123', 'Staff', 'newstaff@gmail.com', '9876543210');