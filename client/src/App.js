import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./page/public/RegisterPage";
import LoginPage from "./page/public/LoginPage";
import RentalApartmentPage from "./page/public/RentalApartmentPage";
import RentalHousePage from "./page/public/RentalHousePage";
import RentalMotelPage from "./page/public/RentalMotelPage";
import RentalSpacePage from "./page/public/RentalSpacePage";
import HomePage from "./page/public/HomePage";
import { path } from "./utils/constant";
import Search from "./page/public/Search";
import Home from "./page/public/Home";
import CreatePost from "./page/system/CreatePost";
import System from "./page/system/System";
import ManagePost from "./page/system/ManagePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={path.HOME} element={<HomePage />}>
          <Route path={"/"} element={<Home />}></Route>
          <Route
            path={path.CHO_THUE_PHONG_TRO}
            element={<RentalMotelPage />}
          ></Route>
          <Route
            path={path.CHO_THUE_CAN_HO}
            element={<RentalApartmentPage />}
          ></Route>
          <Route
            path={path.CHO_THUE_MAT_BANG}
            element={<RentalSpacePage />}
          ></Route>
          <Route path={path.NHA_CHO_THUE} element={<RentalHousePage />}></Route>
          <Route path={path.REGISTER} element={<RegisterPage />}></Route>
          <Route path={path.LOGIN} element={<LoginPage />}></Route>
        </Route>
        <Route path={"*"} element={<HomePage />}></Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
