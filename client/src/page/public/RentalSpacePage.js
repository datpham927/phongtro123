/* eslint-disable react-hooks/exhaustive-deps */
import ListComponent from "../../components/ListComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertVietnamese } from "../../utils/format/convertVietnamese";
import { apiPost } from "../../services/portSercives";
import { setListPost } from "../../redux/postSlice/postSlice";

function RentalSpacePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const pageNumber = location.state;
  const { categories } = useSelector((state) => state.category);
  const { postFilterCode, listPost } = useSelector((state) => state.post);

  useEffect(() => {
    const categoryCode = categories.find(
      (e) => convertVietnamese(`/${e.value}`) === location.pathname
    )?.code;
    if (categoryCode) {
      const fetchApi = async () => {
        const response = await apiPost({
          page: pageNumber || 0,
          categoryCode,
          ...postFilterCode,
        });
        if (response.err !== 0) return;
        dispatch(setListPost(response));
      };
      fetchApi();
    }
  }, [pageNumber, postFilterCode]);

  return (
    <>
      <ListComponent data={listPost?.data?.rows} />
      <PaginationComponent
        totalPage={Math.round(
          listPost?.data?.count / process.env.REACT_APP_PAGE_LIMIT
        )}
        currentPage={listPost?.currentPage + 1}
      />
    </>
  );
}

export default RentalSpacePage;
