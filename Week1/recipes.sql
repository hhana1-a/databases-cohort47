CREATE TABLE Recipe (
    recipeName VARCHAR(30) PRIMARY KEY,
    categoryID INT,
    ingredientsID INT,
    stepsID INT,
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID),
    FOREIGN KEY (ingredientsID) REFERENCES Ingredients(ingredientsID),
    FOREIGN KEY (stepsID) REFERENCES Steps(stepsID)
);

CREATE TABLE Category (
    categoryID INT PRIMARY KEY,
    categoryName VARCHAR(50)
);

CREATE TABLE Ingredients (
    ingredientsID INT PRIMARY KEY,
    ingredientsName VARCHAR(50)
);

CREATE TABLE Steps (
    stepsID INT PRIMARY KEY,
    stepsName VARCHAR(50)
);
