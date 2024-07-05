import React, { useState } from "react";
import "./RecipeMaker.css";

function RecipeMaker() {
  const [name, setName] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  function updateName() {
    setName(document.getElementById("recipeName").value);
    document.getElementById("recipeName").value = "";
  }

  function addIngredients() {
    if (document.getElementById("ingredient-input").value.trim() !== "") {
      const newIngredient = document.getElementById("ingredient-input").value;
      document.getElementById("ingredient-input").value = "";

      setIngredients(() => [...ingredients, newIngredient]);
    }
  }

  function addSteps() {
    if (document.getElementById("step-input").value.trim() !== "") {
      const newStep = document.getElementById("step-input").value;
      document.getElementById("step-input").value = "";

      setSteps(() => [...steps, newStep]);
    }
  }

  function removeIngredient(index) {
    const updatedIngredients = ingredients.filter((_, i) => index !== i);

    setIngredients(updatedIngredients);
  }

  function removeStep(index) {
    const updatedSteps = steps.filter((_, i) => index !== i);

    setSteps(updatedSteps);
  }

  function stepUp(index) {
    if (index > 0) {
      const updatedSteps = [...steps];
      const temp = updatedSteps[index];
      updatedSteps[index] = updatedSteps[index - 1];
      updatedSteps[index - 1] = temp;

      setSteps(updatedSteps);
    }
  }

  function stepDown(index) {
    if (index < steps.length - 1) {
      const updatedSteps = [...steps];
      const temp = updatedSteps[index];
      updatedSteps[index] = updatedSteps[index + 1];
      updatedSteps[index + 1] = temp;

      setSteps(updatedSteps);
    }
  }

  return (
    <div className="recipe-container">
      <div className="header-container">
        <h2>Recipe for: </h2>
        <h1 style={{ color: "gold" }}>{name}</h1>
      </div>

      <div className="gui-container">
        <button onClick={updateName} className="add-button">
          Add Recipe Name
        </button>
        <input
          type="text"
          placeholder="Enter the name of your recipe"
          id="recipeName"
        />
        

        <ol className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              <span className="ingredient-item">
                <input type="checkbox" />
                <p>{ingredient}</p>
                <button onClick={() => removeIngredient(index)}>Delete</button>
              </span>
            </li>
          ))}
        </ol>

        <button className="add-button" onClick={addIngredients}>
          Add an Ingredient
        </button>
        <input placeholder="Enter ingredient name" id="ingredient-input" />
          

        <div className="steps-container">
          <h1>
            Steps to make <span style={{ color: "gold" }}>{name}</span>
          </h1>

          <ol>
            {steps.map((step, index) => (
              <li key={index}>
                <span className="step-item">
                  <input type="checkbox" />
                  <p>{step}</p>
                  <button onClick={() => removeStep(index)}>Delete</button>
                  <button onClick={() => stepDown(index)}>Move Down</button>
                  <button onClick={() => stepUp(index)}>Move Up</button>
                </span>
              </li>
            ))}
          </ol>

          <button onClick={addSteps} className="add-button">
            Add an Step
          </button>
          <input placeholder="Enter your step" id="step-input" />
        </div>
      </div>
    </div>
  );
}

export default RecipeMaker;
