------------------------------------------
-- 1. Create Database
------------------------------------------
CREATE DATABASE CulturalVault;
GO

USE CulturalVault;
GO

------------------------------------------
-- 2. Users Table
------------------------------------------
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE()
);GO

------------------------------------------
-- 3. Admins Table
------------------------------------------
CREATE TABLE Admins (
    AdminID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

------------------------------------------
-- 4. AdminLogs Table
------------------------------------------
CREATE TABLE AdminLogs (
    LogID INT IDENTITY(1,1) PRIMARY KEY,
    AdminID INT NOT NULL,
    Action VARCHAR(200) NOT NULL,
    ActionDetails VARCHAR(MAX),
    Timestamp DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (AdminID) REFERENCES Admins(AdminID)
);
GO

------------------------------------------
-- 5. Cities Table
------------------------------------------
CREATE TABLE Cities (
    CityID INT IDENTITY(1,1) PRIMARY KEY,
    CityName VARCHAR(200) NOT NULL,
    Province VARCHAR(200),
    Description VARCHAR(MAX),
    Latitude DECIMAL(10,7),
    Longitude DECIMAL(10,7),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

------------------------------------------
-- 6. SiteCategories Table
------------------------------------------
CREATE TABLE SiteCategories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName VARCHAR(200) NOT NULL,
    Description VARCHAR(MAX)
);
GO

------------------------------------------
-- 7. CulturalSites Table
------------------------------------------
CREATE TABLE CulturalSites (
    SiteID INT IDENTITY(1,1) PRIMARY KEY,
    CityID INT NOT NULL,
    CategoryID INT NOT NULL,
    SiteName VARCHAR(255) NOT NULL,
    Description VARCHAR(MAX),
    History VARCHAR(MAX),
    Latitude DECIMAL(10,7),
    Longitude DECIMAL(10,7),
    MainImageURL VARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (CityID) REFERENCES Cities(CityID),
    FOREIGN KEY (CategoryID) REFERENCES SiteCategories(CategoryID)
);
GO

------------------------------------------
-- 8. SiteImages Table
------------------------------------------
CREATE TABLE SiteImages (
    ImageID INT IDENTITY(1,1) PRIMARY KEY,
    SiteID INT NOT NULL,
    ImageURL VARCHAR(MAX) NOT NULL,
    Caption VARCHAR(500),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (SiteID) REFERENCES CulturalSites(SiteID)
);
GO

------------------------------------------
-- 9. Reviews Table (Users reviewing sites)
------------------------------------------
CREATE TABLE Reviews (
    ReviewID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    SiteID INT NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment VARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (SiteID) REFERENCES CulturalSites(SiteID)
);
GO

------------------------------------------
-- 10. Events Table
------------------------------------------
CREATE TABLE Events (
    EventID INT IDENTITY(1,1) PRIMARY KEY,
    SiteID INT NOT NULL,
    Title VARCHAR(200) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    Description VARCHAR(MAX),
    TicketPrice DECIMAL(10,2),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (SiteID) REFERENCES CulturalSites(SiteID)
);
GO

------------------------------------------
-- 11. TourGuides Table
------------------------------------------
CREATE TABLE TourGuides1 (
    GuideID INT IDENTITY(1,1) PRIMARY KEY,
    Fname varchar(20) Not null,
    Lname varchar(20),
    Bio VARCHAR(MAX),
    ExperienceYears INT,
    Languages VARCHAR(500),
    CNIC VARCHAR(20),
    ContactNo int,
);

------------------------------------------
-- 12. GuideReviews Table
------------------------------------------
CREATE TABLE GuideReviews (
    GReviewID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    GuideID INT NOT NULL,
    Rating INT CHECK (Rating BETWEEN 1 AND 5),
    Comment VARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (GuideID) REFERENCES TourGuides(GuideID)
);
GO

------------------------------------------
-- 13. TravelPackages Table
------------------------------------------
CREATE TABLE TravelPackages (
    PackageID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT NOT NULL,
    GuideID INT NULL,  -- Optional
    PackageName VARCHAR(200) NOT NULL,
    Description VARCHAR(MAX),
    StartLocation VARCHAR(255),
    Destination VARCHAR(255),
    Price DECIMAL(10,2),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    FOREIGN KEY (GuideID) REFERENCES TourGuides(GuideID)
);
GO

------------------------------------------
-- 14. TravelBookings Table
------------------------------------------
USE CulturalVault;
GO

CREATE TABLE Bookings (
    BookingID INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time NVARCHAR(10) NOT NULL,
    guests INT NOT NULL,
    selectedSites NVARCHAR(MAX) NOT NULL,
    travelMode NVARCHAR(50) NOT NULL,
    tourPackage NVARCHAR(50) NOT NULL,
    specialRequests NVARCHAR(MAX),
    totalCost INT NOT NULL,
    bookingDate DATETIME DEFAULT GETDATE(),
    status NVARCHAR(50) DEFAULT 'Confirmed'
);

------------------------------------------
-- 15. EventBookings Table
------------------------------------------
CREATE TABLE EventBookings (
    EventBookingID INT IDENTITY(1,1) PRIMARY KEY,
    EventID INT NOT NULL,
    UserID INT NOT NULL,
    BookingDate DATETIME DEFAULT GETDATE(),
    Status VARCHAR(50),
    TicketCount INT,
    TotalPrice DECIMAL(10,2),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Drop existing table if you want to start fresh (WARNING: This deletes all data)
-- DROP TABLE IF EXISTS Bookings;

-- Create or update Bookings table
CREATE TABLE Bookings (
    BookingID INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time NVARCHAR(50) NOT NULL,
    guests INT NOT NULL,
    selectedSites NVARCHAR(MAX) NOT NULL,
    travelMode NVARCHAR(50) NOT NULL,
    tourPackage NVARCHAR(50) NOT NULL,
    specialRequests NVARCHAR(MAX),
    totalCost INT NOT NULL,
    bookingDate DATETIME DEFAULT GETDATE(),
    status NVARCHAR(50) DEFAULT 'Confirmed',
    agentName NVARCHAR(100),
    agentPhone NVARCHAR(20),
    agentEmail NVARCHAR(255)
);

------------------------------------------
-- 16. Payments Table
------------------------------------------
CREATE TABLE Payments (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    BookingType VARCHAR(20) CHECK (BookingType IN ('Event', 'Travel')),
    BookingID INT NOT NULL,
    Amount DECIMAL(10,2),
    Method VARCHAR(50),
    Status VARCHAR(50),
    TransactionDate DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO
SELECT name FROM sys.databases;
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Bookings';

USE CulturalVault;
GO

-- Increase time column length to store time ranges
ALTER TABLE Bookings
ALTER COLUMN time NVARCHAR(50);
GO

-- Create Agents table if not exists
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Agents')
BEGIN
    CREATE TABLE Agents (
        AgentID INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        email NVARCHAR(255) UNIQUE NOT NULL,
        password NVARCHAR(255) NOT NULL,
        phone NVARCHAR(20),
        city NVARCHAR(100),
        approved BIT DEFAULT 1,
        createdAt DATETIME DEFAULT GETDATE()
    );
END
GO



-- Insert sample agents for testing
INSERT INTO Agents (name, email, password, phone, city, approved)
VALUES 
('Ahmed Khan', 'ahmed@agent.com', '$2a$10$XqZ7rY5qW3kF8nM9lP2jO.YzH6vK4tU1wE0xR5mN8pL9qA3bC7dE6', '+92 300 1234567', 'Lahore', 1),
('Sara Ali', 'sara@agent.com', '$2a$10$XqZ7rY5qW3kF8nM9lP2jO.YzH6vK4tU1wE0xR5mN8pL9qA3bC7dE6', '+92 301 9876543', 'Lahore', 1);
GO

UPDATE Agents
SET password = '$2b$10$a5x0PmA62ALLGEnuFIyZhOEDGJ5taHU6o4MeevvJa8W3457hSgjhm'
WHERE email = 'ahmed@agent.com';

UPDATE Agents
SET password = ' $2b$10$ofjzhWrlv9Aur4Vhozzxc.OjJfXLPLKgF7LGdZVB.HGyeXDfqTpHG'
WHERE email = 'sara@agent.com';

-- Check current data type
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Bookings' AND COLUMN_NAME = 'time';
GO

