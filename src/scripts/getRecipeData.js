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

  if (!recipeFound) throw new Error("Recipe not found");

  return recipeFound;
};

/**
 * @param {string} title
 *
 * @returns {void}
 */

const addTitle = (title) => {
  const instructionsNode = document.getElementById("instructions");

  const ingredientsTitle = document.createElement("h2");
  const breakLine = document.createElement("br");
  instructionsNode.appendChild(ingredientsTitle);
  instructionsNode.appendChild(breakLine);

  ingredientsTitle.textContent = title;
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
  const instructionEntries = recipe.instrucoes;

  addTitle("Ingredientes");

  for (const [key, value] of ingredientEntries) {
    const newParagraph = document.createElement("p");
    instructionsNode.appendChild(newParagraph);

    newParagraph.textContent += `${key}: ${value}`;

    const currentIndex = ingredientEntries.findIndex(
      (entry) => entry[0] === key && entry[1] === value
    );

    if (currentIndex === ingredientEntries.length - 1) break;

    newParagraph.textContent += ", ";
  }

  const breakLine = document.createElement("br");
  instructionsNode.appendChild(breakLine);

  addTitle("Instruções");

  console.log(instructionEntries);

  for (const instruction of instructionEntries) {
    console.log(instruction);

    const newParagraph = document.createElement("p");
    instructionsNode.appendChild(newParagraph);

    newParagraph.textContent += instruction;
  }
};

bootstrap();
