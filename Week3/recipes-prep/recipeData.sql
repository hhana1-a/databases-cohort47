USE recipes;

INSERT INTO Category (categoryName)
VALUES ('Cake'), ('No-Bake'), ('Vegetarian'), ('Vegan'), ('Gluten-Free'), ('Japanese');

INSERT INTO Ingredient (ingredientName)
VALUES ('Condensed milk'), ('Cream Cheese'), ('Lemon Juice'), ('Pie Crust'), ('Cherry Jam'),
       ('Brussels Sprouts'), ('Sesame seeds'), ('Pepper'), ('Salt'), ('Olive oil'),
       ('Macaroni'), ('Butter'), ('Flour'), ('Milk'), ('Shredded Cheddar cheese'),
       ('Eggs'), ('Soy sauce'), ('Sugar');

INSERT INTO Measurement (unit)
VALUES ('oz'), ('tbsp'), ('tsp');

INSERT INTO Quantity (value)
VALUES (8), (2), (4), (1);

INSERT INTO Step (stepDescription)
VALUES ('Beat Cream Cheese'),
       ('Add condensed Milk and blend'),
       ('Add Lemon Juice and blend'),
       ('Add the mix to the pie crust'),
       ('Spread the Cherry Jam'),
       ('Place in refrigerator for 3h.'),
       ('Preheat the oven'),
       ('Mix the ingredients in a bowl'),
       ('Spread the mix on baking sheet'),
       ("Bake for 30'"),
       ("Cook Macaroni for 8'"),
       ('Melt butter in a saucepan'),
       ('Add flour, salt, pepper and mix'),
       ('Cook until mix is smooth'),
       ('Add cheddar cheese'),
       ('Add the macaroni'),
       ('Beat the eggs'),
       ('Add soya sauce, sugar and salt'),
       ('Add oil to a sauce pan'),
       ('Bring to medium heat'),
       ('Add some mix to the sauce pan'),
       ("Let it cook for 1'"),
       ('Remove pan from fire');

INSERT INTO Recipe (recipeName, categoryID)
VALUES ('No-Bake Cheesecake', 2),
       ('Roasted Brussels Sprouts', 3),
       ('Mac & Cheese', 3),
       ('Tamagoyaki Japanese Omelette', 3);

INSERT INTO RecipeIngredient (recipeID, ingredientID, quantityID, measurementID)
VALUES (1, 1, NULL, NULL), (1, 2, NULL, NULL), (1, 3, NULL, NULL), (1, 4, NULL, NULL), (1, 5, NULL, NULL),
       (2, 6, NULL, NULL), (2, 8, NULL, NULL), (2, 9, NULL, NULL), (2, 10, NULL, NULL),
       (3, 11, 1, 1), (3, 12, 2, 2), (3, 13, 2, 2), (3, 14, NULL, NULL), (3, 15, NULL, NULL),
       (4, 16, 3, 1), (4, 17, 1, 2), (4, 18, 1, 3), (4, 19, 4, 3), (4, 20, 1, 3);

INSERT INTO RecipeStep (recipeID, stepID, stepOrder)
VALUES (1, 1, 1), (1, 2, 2), (1, 3, 3), (1, 4, 4), (1, 5, 5), (1, 6, 6),
       (2, 7, 1), (2, 8, 2), (2, 9, 3), (2, 10, 4),
       (3, 11, 1), (3, 12, 2), (3, 13, 3), (3, 14, 4), (3, 15, 5), (3, 16, 6),
       (4, 17, 1), (4, 18, 2), (4, 19, 3), (4, 20, 4), (4, 21, 5), (4, 22, 6), (4, 23, 7);
