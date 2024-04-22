/**
 * @param {string} recipeName
 *
 * @typedef Recipe
 * @type {object}
 * @property {string} receita - Recipe name. It works as a unique identifier.
 * @property {Array<Object.<string, string>>} ingredientes - Ingredits key value pair.
 * @property {Array<string>} instrucoes - The **ordered** instructions.
 *
 * @returns {Promise<Recipe>}
 */

const getRecipeJSON = async (recipeName) => {
  const responseData = await fetch("../data/recipes.json");
  const allRecipes = await responseData.json();

  const recipeFound = allRecipes.find(
    (recipe) => recipe.receita.toLowerCase() === recipeName.toLowerCase()
  );

  if (!recipeFound) window.location.replace("google.com");

  return recipeFound;
};

const bootstrap = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const recipeParameter = urlParams.get("recipe");
  const recipe = await getRecipeJSON(recipeParameter);

  const instructionsNode = document.getElementById("instructions");

  if (!instructionsNode)
    throw new Error("Instructions node was not found in this page.");

  const ingredientEntries = Object.entries(recipe.ingredientes);

  for (const [key, value] of ingredientEntries) {
    instructionsNode.textContent += `${key}: ${value}`;

    currentIndex = ingredientEntries.findIndex(
      (entry) => entry[0] === key && entry[1] === value
    );

    if (currentIndex === ingredientEntries.length - 1) {
      return;
    }

    instructionsNode.textContent += ", ";
  }
};

bootstrap();
