import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../redux/actions";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getRecipesByiD(id));
  }, [dispatch]);

  let recipeDetail = useSelector((state) => state.detail);

  function removerCaracteres(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }

  function removerCharDiets(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/\s/g, "");
  }

  console.log('Esta es la receta', recipeDetail)

  return (
    <div className="detail">
      <div>
        <Link to="/home">
          <button className="btnDetail">← To Back</button>
        </Link>
        <h1 className="nameDetail">{recipeDetail.name}</h1>
        <p className="idDetails">#{recipeDetail.id}</p>
        <div className="imgAndDietDetail">
          <div>
            <img
              src={recipeDetail.image}
              alt={recipeDetail.name}
              className="imgDetail"
            />
          </div>
          <div>
            {recipeDetail.diets &&
              recipeDetail.diets.map((i, index) => {
                return (
                  <p key={index} className={`${removerCharDiets(i.name)}Detail generalDiet`}>
                    {i.name}
                  </p>
                );
              })}
          </div>
        </div>
        <p className="summaryDetail">
          {recipeDetail.food_summary &&
            removerCaracteres(recipeDetail.food_summary)}
        </p>
        <div>
          <h2 className="ingredients">Ingredients: </h2>
          <ul>
            {recipeDetail.ingredients &&
              recipeDetail.ingredients.map((i, index) => {
                return (
                  <li key={index} className="ingredientsDetail">{`${i.name} (${Math.ceil(
                    i.amount
                  )} ${i.unitShort ? i.unitShort : "units"})`}</li>
                );
              })}
          </ul>
        </div>
        <div>
          <h2>Instructions</h2>
          {recipeDetail.instructions &&
            recipeDetail.instructions.map((step, index) => {
              return (
                <div key={index} className="instructionDetail">
                  <p>
                    <span className="instructionNumber">{step.number}</span> -{" "}
                    {step.step}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
