CREATE TABLE User (
    User INT PRIMARY KEY,
    Username VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    UserType VARCHAR(50),
    Email VARCHAR(255),
    PhoneNumber VARCHAR(20)
);

CREATE TABLE Staff (
    StaffID INT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255) UNIQUE, 
    PhoneNumber VARCHAR(20)
);

CREATE TABLE ProfessionalRegistration (
    ProfessionalID INT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    EmailAddress VARCHAR(255),
    DegreeName VARCHAR(255),
    InstitutionName VARCHAR(255),
    MonthComplete INT,
    YearComplete INT,
    StreetAddress VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    Zip VARCHAR(10),
    PhoneNumber VARCHAR(20)
);

CREATE TABLE EmployerRegistration (
    EmployerID INT PRIMARY KEY,
    CompanyName VARCHAR(255),
    StreetAddress VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    Zip VARCHAR(10),
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255),
    Phone VARCHAR(20)
);

CREATE TABLE Professional (
    ProfessionalID INT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    EmailAddress VARCHAR(255),
    DegreeName VARCHAR(255),
    InstitutionName VARCHAR(255),
    MonthComplete INT,
    YearComplete INT,
    StreetAddress VARCHAR(255),
    City VARCHAR(255),
    State VARCHAR(255),
    Zip VARCHAR(10),
    Qualifications TEXT,
    PhoneNumber VARCHAR(20)
);

CREATE TABLE Job (
    JobID INT PRIMARY KEY,
    EmployerID INT, 
    PositionName VARCHAR(255),
    ContactFirstName VARCHAR(255),
    ContactLastName VARCHAR(255),
    ContactPhone VARCHAR(20),
    ContactEmail VARCHAR(255),
    StartDate DATE,
    EndDate DATE,
    StartTime TIME,
    EndTime TIME,
    Payment DECIMAL(10, 2),
    QualificationsRequired TEXT 