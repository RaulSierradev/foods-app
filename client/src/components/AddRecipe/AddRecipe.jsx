import React, { useEffect, useRef, useState } from "react";
import * as actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import addRecipeValidation from "./AddRecipeValidation";
import "./AddRecipe.css";

export default function AddRecipe() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allDiets = useSelector((state) => state.typeDiets);
  const [errors, setErrors] = useState({});
  const [nameIngredient, setNameIngredient] = useState("");
  const [amountIngredient, setAmountIngredient] = useState("");
  const [unitIngredient, setUnitIngredient] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [recipe, setRecipe] = useState({
    name: "",
    food_summary: "",
    health_score: 50,
    image: "",
    ingredients: [],
    instructions: [],
    diets: [],
    numInstr: 0,
  });

  useEffect(() => {
    dispatch(actions.getDiets());
  }, [dispatch]);

  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });

    setErrors(
      addRecipeValidation({
        ...recipe,
        [e.target.name]: e.target.value,
      })
    );
  }

  function changeHandler(e) {
    const value = e.target.value;
    if (e.target.checked) {
      setRecipe({ ...recipe, diets: [...recipe.diets, value] });
    } else {
      setRecipe({
        ...recipe,
        diets: recipe.diets.filter((x) => x !== value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(addRecipeValidation(recipe));

    if (
      recipe.name &&
      recipe.food_summary &&
      recipe.health_score &&
      recipe.image &&
      recipe.ingredients.length &&
      recipe.instructions.length &&
      !Object.keys(errors).length
    ) {
      dispatch(actions.addRecipe(recipe));
      alert("Recipe successfully Created");
      setRecipe({
        name: "",
        food_summary: "",
        health_score: 50,
        image: "",
        ingredients: [],
        instructions: [],
        diets: [],
        numInstr: 0,
      });
      formRef.current.reset();
      navigate("/home");
    } else {
      alert("You must fill in all the fields");
    }
  }

  function handleChangeInstructionStep(e) {
    setStepDescription(e.target.value);
  }

  function handleChangeNameIngredient(e) {
    setNameIngredient(e.target.value);
  }
  function handleChangeAmountIngredient(e) {
    setAmountIngredient(e.target.value);
  }
  function handleChangeUnitIngredient(e) {
    setUnitIngredient(e.target.value);
  }

  function handleIngredient(e) {
    e.preventDefault();
    if (nameIngredient && amountIngredient && unitIngredient !== "") {
      setRecipe({
        ...recipe,
        ingredients: [
          ...recipe.ingredients,
          {
            name: nameIngredient,
            amount: amountIngredient,
            unitShort: unitIngredient,
          },
        ],
      });
      setNameIngredient("");
      setAmountIngredient("");
      setUnitIngredient("");
    } else {
      alert("please put a ingredient");
    }
  }

  function handleDeleteIngredient(e) {
    e.preventDefault();
    setRecipe({
      ...recipe,
      ingredients: [],
    });
  }

  function handleStep(e) {
    e.preventDefault();
    if (stepDescription !== "") {
      setRecipe({
        ...recipe,
        numInstr: recipe.numInstr + 1,
        instructions: [
          ...recipe.instructions,
          { number: recipe.numInstr + 1, step: stepDescription },
        ],
      });

      setStepDescription("");
    } else {
      alert("please put a step");
    }
  }

  function handleDeleteStep(e) {
    e.preventDefault();
    setRecipe({
      ...recipe,
      instructions: [],
    });
  }

  return (
    <div className="create">
      <Link to="/home">
        <button className="btnCreate">To Back</button>
      </Link>
      <h1 className="titleCreate">Welcome to create your recipe</h1>
      <div className="stepsCreate">
        <p>Here you can create your recipes following a few simple steps:</p>
        <p>1. The name of the recipe must be a simple name</p>
        <p>
          2. The summary must be concise and must not exceed two hundred and
          fifty-five characters.
        </p>
        <p>
          3. In Health Score you can indicate the index by moving the bar that
          is there
        </p>
        <p>4. Write the ingredient and press "add" to add it</p>
        <p>
          5. If you do not want to add an ingredient, you can press the "Clean"
          button
        </p>
        <p>6. The same of the ingredients applies to the instructions</p>
        <p>
          7. Don't forget that you can only insert the image URL, there is no
          support for local images
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit} ref={formRef} className="formCreate">
          <h2 className="titleFormCreate">Create your Recipe!</h2>
          <div>
            <label className="labelFormCreate">
              Name:
              <br />
            </label>
            <br />
            <input
              className={errors.name ? "warningInputCreate" : "inputCreate"}
              type="text"
              value={recipe.name}
              name="name"
              onChange={handleChange}
            />
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <br />
          <div>
            <label className="labelFormCreate">
              Summary:
              <br />
            </label>
            <br />
            <textarea
              className={
                errors.food_summary ? "warningTextAreaCreate" : "textAreaCreate"
              }
              type="text"
              value={recipe.food_summary}
              name="food_summary"
              maxLength="1000"
              onChange={handleChange}
            />
            {errors.food_summary && (
              <p className="danger">{errors.food_summary}</p>
            )}
          </div>
          <br />
          <div>
            <label className="labelFormCreate">
              Health Score:
              <br />
            </label>
            <br />
            <input
              type="range"
              min="0"
              max="100"
              value={recipe.health_score}
              name="health_score"
              onChange={handleChange}
            />
            <output>{recipe.health_score}</output>
          </div>
          <br />
          <div>
            <label className="labelFormCreate">
              Ingredients:
              <br />
            </label>
            <br />
            <label className="labelIngredient">name:</label>
            <input
              className="nameIngredient"
              type="text"
              name="nameIngredient"
              maxLength="500"
              value={nameIngredient}
              onChange={handleChangeNameIngredient}
            />
            <label className="labelIngredient">amount</label>
            <input
              className="amountIngredient"
              type="number"
              name="amountIngredient"
              value={amountIngredient}
              onChange={handleChangeAmountIngredient}
            />
            <label className="labelIngredient">unit</label>
            <select
              className="unitIngredient"
              type="text"
              name="unitIngredient"
              maxLength="500"
              value={unitIngredient}
              onChange={handleChangeUnitIngredient}
            >
              <option>{""}</option>
              <option>unit</option>
              <option>ml</option>
              <option>l</option>
              <option>g</option>
              <option>kg</option>
              <option>lb</option>
              <option>Tbsps</option>
              <option>tsp</option>
              <option>cup</option>
              <option>jar</option>
              <option>oz</option>
              <option>to taste</option>
            </select>
            <div>
              <button className="btnAdd" onClick={handleIngredient}>
                Add
              </button>
              <button className="btnClear" onClick={handleDeleteIngredient}>
                Clean
              </button>
            </div>
            <br />
            <div>
              <ul>
                {recipe.ingredients.map((e, index) => {
                  return (
                    <li key={index}>
                      {e.name} ({e.amount} {e.unitShort})
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <label className="labelFormCreate">
              Instructions:
              <br />
            </label>
            <br />
            <textarea
              className="textAreaCreate"
              type="text"
              name="instructions"
              maxLength="500"
              value={stepDescription}
              onChange={handleChangeInstructionStep}
            />
            <div>
              <button className="btnAdd" onClick={handleStep}>
                Add
              </button>
              <button className="btnClear" onClick={handleDeleteStep}>
                Clean
              </button>
            </div>
            <ul>
              {recipe.instructions.map((e, index) => {
                return (
                  <p key={index}>
                    {e.number}: {e.step}
                  </p>
                );
              })}
            </ul>
          </div>
          <br />
          <div>
            <label className="labelFormCreate">
              URL image: <br />
            </label>
            <br />
            <input
              className={errors.image ? "warningInputCreate" : "inputCreate"}
              type="url"
              value={recipe.image}
              name="image"
              onChange={handleChange}
            />
            {errors.image && <p className="danger">{errors.image}</p>}
          </div>
          <br />
          <div>
            <label className="labelFormCreate">
              Type Diets:
              <br />
            </label>
            <br />
            {allDiets.map((e) => {
              return (
                <div key={e.id} className="dietCreate">
                  <label>
                    <input
                      type="checkbox"
                      onChange={changeHandler}
                      name="diets"
                      value={e.name}
                    />
                    {e.name}
                  </label>
                </div>
              );
            })}
          </div>
          <br />
          <button className="btnSubmitCreate" type="submit">
            Create Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
