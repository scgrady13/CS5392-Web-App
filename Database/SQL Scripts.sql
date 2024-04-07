-- Create User Table
CREATE TABLE User (
    User INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(50) NOT NULL,
    UserType VARCHAR(20) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(15) NOT NULL
);

-- Create Staff Table
CREATE TABLE Staff (
    StaffID VARCHAR(10) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL CHECK (Email LIKE '%@gmail.com'),
    PhoneNumber VARCHAR(15) NOT NULL CHECK (LENGTH(PhoneNumber) = 10)
);

-- Create Professional Registration Table
CREATE TABLE ProfessionalRegistration (
    ProfessionalTempID VARCHAR(10) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    EmailAddress VARCHAR(50) NOT NULL CHECK (EmailAddress LIKE '%@gmail.com'),
    DegreeName VARCHAR(100) NOT NULL,
    InstitutionName VARCHAR(100) NOT NULL,
    MonthComplete INT NOT NULL CHECK (MonthComplete BETWEEN 1 AND 12),
    YearComplete INT NOT NULL,
    StreetAddress VARCHAR(100) NOT NULL,
    City VARCHAR(50) NOT NULL,
    State VARCHAR(50) NOT NULL,
    Zip VARCHAR(10) NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL CHECK (LENGTH(PhoneNumber) = 10),
    Qualifications VARCHAR(500) NOT NULL CHECK (LENGTH(Qualifications) - LENGTH(REPLACE(Qualifications, ',', '')) >= 1)
);

-- Create Employer Registration Table
CREATE TABLE EmployerRegistration (
    EmployerTempID VARCHAR(10) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    CompanyName VARCHAR(100) NOT NULL,
    StreetAddress VARCHAR(100) NOT NULL,
    City VARCHAR(50) NOT NULL,
    State VARCHAR(50) NOT NULL,
    Zip VARCHAR(10) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL CHECK (Email LIKE '%@gmail.com'),
    PhoneNumber VARCHAR(15) NOT NULL CHECK (LENGTH(PhoneNumber) = 10)
);

-- Create Professional Table
CREATE TABLE Professional (
    ProfessionalID VARCHAR(10) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    EmailAddress VARCHAR(50) NOT NULL CHECK (EmailAddress LIKE '%@gmail.com'),
    DegreeName VARCHAR(100) NOT NULL,
    InstitutionName VARCHAR(100) NOT NULL,
    MonthComplete INT NOT NULL CHECK (MonthComplete BETWEEN 1 AND 12),
    YearComplete INT NOT NULL,
    StreetAddress VARCHAR(100) NOT NULL,
    City VARCHAR(50) NOT NULL,
    State VARCHAR(50) NOT NULL,
    Zip VARCHAR(10) NOT NULL,
    Qualifications VARCHAR(500) NOT NULL CHECK (LENGTH(Qualifications) - LENGTH(REPLACE(Qualifications, ',', '')) >= 1),
    PhoneNumber VARCHAR(15) NOT NULL CHECK (LENGTH(PhoneNumber) = 10),
    Payment DECIMAL(10,2) NOT NULL
);

-- Create Employer Table
CREATE TABLE Employer (
    EmployerID VARCHAR(10) PRIMARY KEY,
    Username VARCHAR(50) NOT NULL,
    CompanyName VARCHAR(100) NOT NULL,
    StreetAddress VARCHAR(100) NOT NULL,
    City VARCHAR(50) NOT NULL,
    State VARCHAR(50) NOT NULL,
    Zip VARCHAR(10) NOT NULL,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL CHECK (Email LIKE '%@gmail.com'),
    PhoneNumber VARCHAR(15) NOT NULL CHECK (LENGTH(PhoneNumber) = 10),
    Payment DECIMAL(10,2) NOT NULL
);

-- Create Job Table
CREATE TABLE Job (
    JobID INT PRIMARY KEY AUTO_INCREMENT,
    EmployerID VARCHAR(10) NOT NULL,
    PositionName VARCHAR(100) NOT NULL,
    ContactFirstName VARCHAR(50) NOT NULL,
    ContactLastName VARCHAR(50) NOT NULL,
    ContactPhone VARCHAR(15) NOT NULL,
    ContactEmail VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    Payment DECIMAL(10,2) NOT NULL,
    Qualifications VARCHAR(500) NOT NULL CHECK (LENGTH(Qualifications) - LENGTH(REPLACE(Qualifications, ',', '')) >= 1),
    FOREIGN KEY (EmployerID) REFERENCES Employer(EmployerID)
);

CREATE TABLE CreateProfRequest (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    ProfessionalTempID VARCHAR(10),
    FOREIGN KEY (ProfessionalTempID) REFERENCES ProfessionalRegistration(ProfessionalTempID)
);

-- Create Trigger to automatically insert ProfessionalTempID into ProfessionalProfileCreateRequest
DELIMITER $$
CREATE TRIGGER insert_into_professional_profile_create_request
AFTER INSERT ON ProfessionalRegistration
FOR EACH ROW
BEGIN
    INSERT INTO ProfessionalProfileCreateRequest (ProfessionalTempID) VALUES (NEW.ProfessionalTempID);
END$$
DELIMITER ;

-- Create Employer Profile Create Request Table
CREATE TABLE CreateEmpRequest (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    EmployerTempID VARCHAR(10),
    FOREIGN KEY (EmployerTempID) REFERENCES EmployerRegistration(EmployerTempID)
);

-- Create Trigger to automatically insert EmployerTempID into EmployerProfileCreateRequest
DELIMITER $$
CREATE TRIGGER insert_into_employer_profile_create_request
AFTER INSERT ON EmployerRegistration
FOR EACH ROW
BEGIN
    INSERT INTO EmployerProfileCreateRequest (EmployerTempID) VALUES (NEW.EmployerTempID);
END$$
DELIMITER ;


-- Create Job Matching Request Table
CREATE TABLE JobMatchingRequest (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    ProfessionalID VARCHAR(10),
    FOREIGN KEY (ProfessionalID) REFERENCES Professional(ProfessionalID)
);

-- Create Professional Profile Delete Request Table
CREATE TABLE ProfessionalProfileDeleteRequest (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    ProfessionalID VARCHAR(10),
    FOREIGN KEY (ProfessionalID) REFERENCES Professional(ProfessionalID)
);

-- Create Trigger to delete corresponding row from Professional table
DELIMITER $$
CREATE TRIGGER delete_professional_profile_row
AFTER INSERT ON ProfessionalProfileDeleteRequest
FOR EACH ROW
BEGIN
    DELETE FROM Professional WHERE ProfessionalID = NEW.ProfessionalID;
END$$
DELIMITER ;

-- Create Employer Profile Delete Request Table
CREATE TABLE EmployerProfileDeleteRequest (
    RequestID INT PRIMARY KEY AUTO_INCREMENT,
    EmployerID VARCHAR(10),
    FOREIGN KEY (EmployerID) REFERENCES Employer(EmployerID)
);
-- Create Trigger to delete corresponding row from Employer table
DELIMITER $$
CREATE TRIGGER delete_employer_profile_row
AFTER INSERT ON EmployerProfileDeleteRequest
FOR EACH ROW
BEGIN
    DELETE FROM Employer WHERE EmployerID = NEW.EmployerID;
END$$
DELIMITER ;

DELIMITER $$

CREATE TRIGGER gen_professional_temp_id
BEFORE INSERT ON ProfessionalRegistration
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    DECLARE new_id VARCHAR(10);

    -- Check if the table is empty
    SELECT IFNULL(MAX(CAST(SUBSTR(ProfessionalTempID, 3) AS UNSIGNED)), 0) INTO max_id
    FROM ProfessionalRegistration;

    -- Increment the ID
    SET new_id = CONCAT('pt', LPAD(max_id + 1, 2, '0'));

    -- Set the new ProfessionalTempID
    SET NEW.ProfessionalTempID = new_id;
END$$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER gen_employer_temp_id
BEFORE INSERT ON EmployerRegistration
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    DECLARE new_id VARCHAR(10);

    SELECT IFNULL(MAX(CAST(SUBSTR(EmployerTempID, 3) AS UNSIGNED)), 0) + 1 INTO max_id
    FROM EmployerRegistration;

    SET new_id = CONCAT('et', LPAD(max_id, 2, '0'));
    SET NEW.EmployerTempID = new_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER gen_professional_id
BEFORE INSERT ON Professional
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    DECLARE new_id VARCHAR(10);

    SELECT IFNULL(MAX(CAST(SUBSTR(ProfessionalID, 2) AS UNSIGNED)), 0) + 1 INTO max_id
    FROM Professional;

    SET new_id = CONCAT('p', LPAD(max_id, 2, '0'));
    SET NEW.ProfessionalID = new_id;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER gen_employer_id
BEFORE INSERT ON Employer
FOR EACH ROW
BEGIN
    DECLARE max_id INT;
    DECLARE new_id VARCHAR(10);

    SELECT IFNULL(MAX(CAST(SUBSTR(EmployerID, 2) AS UNSIGNED)), 0) + 1 INTO max_id
    FROM Employer;

    SET new_id = CONCAT('e', LPAD(max_id, 2, '0'));
    SET NEW.EmployerID = new_id;
END$$

DELIMITER ;


-- Trigger to copy data from ProfessionalRegistration to Professional
DELIMITER $$
CREATE TRIGGER copy_professional_registration_to_professional
AFTER INSERT ON ProfessionalRegistration
FOR EACH ROW
BEGIN
    INSERT INTO Professional (ProfessionalID, Username, FirstName, LastName, EmailAddress, DegreeName, InstitutionName, MonthComplete, YearComplete, StreetAddress, City, State, Zip, Qualifications, PhoneNumber, Payment)
    VALUES (NEW.ProfessionalTempID, NEW.Username, NEW.FirstName, NEW.LastName, NEW.EmailAddress, NEW.DegreeName, NEW.InstitutionName, NEW.MonthComplete, NEW.YearComplete, NEW.StreetAddress, NEW.City, NEW.State, NEW.Zip, NEW.Qualifications, NEW.PhoneNumber, 0);
END$$
DELIMITER ;

-- Trigger to copy data from EmployerRegistration to Employer
DELIMITER $$
CREATE TRIGGER copy_employer_registration_to_employer
AFTER INSERT ON EmployerRegistration
FOR EACH ROW
BEGIN
    INSERT INTO Employer (EmployerID, Username, CompanyName, StreetAddress, City, State, Zip, FirstName, LastName, Email, PhoneNumber, Payment)
    VALUES (NEW.EmployerTempID, NEW.Username, NEW.CompanyName, NEW.StreetAddress, NEW.City, NEW.State, NEW.Zip, NEW.FirstName, NEW.LastName, NEW.Email, NEW.PhoneNumber, 0);
END$$
DELIMITER ;