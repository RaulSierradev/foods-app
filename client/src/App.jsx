import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./redux/actions";

import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Detail from "./components/Detail/Detail";
import AddRecipe from "./components/AddRecipe/AddRecipe";
import About from "./components/About/About";
import Error from "./components/Error/Error";

function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.recipes);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(actions.getRecipes());
  }, [dispatch]);

  return (
    <div className="App">
      {pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={<Home cards={cards} error={error} loading={loading} />}
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/createrecipe" element={<AddRecipe />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;
