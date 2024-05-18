CREATE DATABASE recipes;
USE recipes;

CREATE TABLE Recipe (
    recipeID INT AUTO_INCREMENT PRIMARY KEY,
    recipeName VARCHAR(30),
    categoryID INT,
    FOREIGN KEY (categoryID) REFERENCES Category(categoryID)
);

CREATE TABLE Category (
    categoryID INT PRIMARY KEY AUTO_INCREMENT,
    categoryName VARCHAR(50)
);

CREATE TABLE Ingredient (
    ingredientID INT PRIMARY KEY AUTO_INCREMENT,
    ingredientName VARCHAR(50)
);

CREATE TABLE Quantity (
    quantityID INT PRIMARY KEY AUTO_INCREMENT,
    value DECIMAL(10,2)
);

CREATE TABLE Measurement (
    measurementID INT PRIMARY KEY AUTO_INCREMENT,
    unit VARCHAR(20)
);

CREATE TABLE RecipeIngredient (
    recipeIngredientID INT AUTO_INCREMENT PRIMARY KEY,
    recipeID INT,
    ingredientID INT,
    quantityID INT,
    measurementID INT,
    FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID),
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID),
    FOREIGN KEY (quantityID) REFERENCES Quantity(quantityID),
    FOREIGN KEY (measurementID) REFERENCES Measurement(measurementID)
);

CREATE TABLE Step (
    stepID INT PRIMARY KEY AUTO_INCREMENT,
    stepDescription VARCHAR(250)
);

CREATE TABLE RecipeStep (
    recipeStepID INT AUTO_INCREMENT PRIMARY KEY,
    recipeID INT,
    stepID INT,
    stepOrder INT,
    FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID),
    FOREIGN KEY (stepID) REFERENCES Step(stepID)
);
