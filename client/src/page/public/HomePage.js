/* eslint-disable react-hooks/exhaustive-deps */
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {useLocation} from 'react-router-dom';
import ProvinceComponent from "../../components/ProvinceComponent";
import ItemNavbarComponent from "../../components/ItemNavbarComponent";
import { apiArea, apiPrice } from "../../services/app";
import IntroComponent from "../../components/IntroComponent";
import ContactComponent from "../../components/ContactComponent";
import RelatedComponent from "../../components/RelatedComponent";
import { Outlet } from "react-router-dom";
import { setArea, setPrice } from "../../redux/appSlice/appSlice";
import { getDetailUser } from "../../services/userServices";
import { setUser } from "../../redux/userSlice/userSlice";
import HeaderComponent from "../../components/HeaderComponent";
import { path } from "../../utils/constant";

function HomePage() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { price, area } = useSelector((state) => state.app);
  const { isLogged } = useSelector((state) => state.auth);
  const { isUpdateUser } = useSelector((state) => state.user);
  const location=useLocation()

  useEffect(() => {
    const fetchApi = async () => {
      const areas = await apiArea();
      const prices = await apiPrice();
      dispatch(setPrice(prices?.data));
      dispatch(setArea(areas?.data));
    };
    fetchApi();
  }, []); 

  useEffect(() => {
    if (isLogged) {
      const fetchApi = async () => {
        const response = await getDetailUser();
        if (response.err === 0) {
          dispatch(setUser(response.user));
        }
      };
      fetchApi();
    }
  }, [isLogged,isUpdateUser]);
  return (
    <div className="text-2xl ">
      <HeaderComponent />
      <div className="w-[1100px] mx-auto">
      {  location.pathname.includes(path.DETAIL)  &&    <Outlet />}
    {  !location.pathname.includes(path.DETAIL)  && <>
      <Search /> 
      <ProvinceComponent />
        <div className="flex my-5 gap-4">
          <div className="w-[70%]">
            <Outlet />
          </div>
          <div className="w-[30%]">
            <ItemNavbarComponent title="Chi thuê căn hộ" content={categories} />
            <ItemNavbarComponent
              isDouble
              type="priceCode"
              title="Xem theo giá"
              content={price}
            />
            <ItemNavbarComponent
              isDouble
              type="areaCode"
              title="Xem theo diện tích"
              content={area}   
            />
            <RelatedComponent />  
          </div>
        </div>
    
    </>}
      
        <IntroComponent />        
        <ContactComponent />
      </div>
    </div>
  );
}

export default HomePage;
