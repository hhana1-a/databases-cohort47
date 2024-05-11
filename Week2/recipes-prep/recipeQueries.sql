SELECT r.recipeName
FROM recipes AS r
JOIN Ingredients AS i ON r.ingredientsID = i.ingredientsID
JOIN Category c ON r.categoryID = c.categoryID
WHERE c.categoryName = 'Vegetarian'
AND i.ingredientsName LIKE '%Potatoes%';



SELECT r.recipeName
FROM recipes r
JOIN Category c ON r.categoryID = c.categoryID
WHERE c.categoryName = 'Cake'
AND NOT EXISTS (
    SELECT 1
    FROM Steps AS s
    WHERE s.recipeID = r.recipeID
    AND s.stepsName LIKE '%Bake%'
);

SELECT r.recipeName
FROM recipes r
JOIN Category AS c ON r.categoryID = c.categoryID
WHERE c.categoryName IN ('Vegan', 'Japanese');
