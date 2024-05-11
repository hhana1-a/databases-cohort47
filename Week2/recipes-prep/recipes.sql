
DROP DATABASE IF EXISTS recipes; 
CREATE DATABASE recipes;
USE recipes;

CREATE TABLE Recipe (
    recipeName VARCHAR(30),
    recipeID INT AUTO_INCREMENT PRIMARY KEY,
    categoryID INT,
    ingredientsID INT,
    stepsID INT,
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID),
    FOREIGN KEY (ingredientsID) REFERENCES Ingredients(ingredientsID),
    FOREIGN KEY (stepsID) REFERENCES Steps(stepsID)
);

CREATE TABLE Category (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(50)
);

CREATE TABLE Ingredients (
    ingredientsID INT PRIMARY KEY AUTO_INCREMENT,
    ingredientsName VARCHAR(50)
);

CREATE TABLE Steps (
    stepsID INT PRIMARY KEY AUTO_INCREMENT,
    stepsName VARCHAR(250)
);