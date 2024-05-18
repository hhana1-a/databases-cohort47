SELECT r.recipeName
FROM Recipe r
JOIN RecipeIngredient ri ON r.recipeID = ri.recipeID
JOIN Ingredient i ON ri.ingredientID = i.ingredientID
JOIN Category c ON r.categoryID = c.categoryID
WHERE c.categoryName = 'Vegetarian' 
  AND i.ingredientName = 'Potatoes';

SELECT r.recipeName
FROM Recipe r
JOIN Category c ON r.categoryID = c.categoryID
WHERE c.categoryName = 'Cake' 
  AND r.recipeID NOT IN (
    SELECT recipeID
    FROM RecipeStep
  );

SELECT r.recipeName
FROM Recipe r
JOIN Category c ON r.categoryID = c.categoryID
WHERE c.categoryName IN ('Vegan', 'Japanese');
