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
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Phone VARCHAR(20),
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

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
CREATE TABLE TourGuides (
    GuideID INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT NOT NULL,
    Bio VARCHAR(MAX),
    ExperienceYears INT,
    Languages VARCHAR(500),
    CNIC VARCHAR(20),
    Rating DECIMAL(3,2) DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

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
CREATE TABLE TravelBookings (
    BookingID INT IDENTITY(1,1) PRIMARY KEY,
    PackageID INT NOT NULL,
    UserID INT NOT NULL,
    BookingDate DATETIME DEFAULT GETDATE(),
    Status VARCHAR(50) CHECK (Status IN ('Pending','Confirmed','Paid','Cancelled')),
    NumPeople INT NOT NULL,
    TotalAmount DECIMAL(10,2),
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (PackageID) REFERENCES TravelPackages(PackageID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

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
