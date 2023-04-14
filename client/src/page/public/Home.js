import ListComponent from "../../components/ListComponent";
import PaginationComponent from "../../components/PaginationComponent";
import { apiPost } from "../../services/portServices";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setListPost,
  setPostFilterCode,
} from "../../redux/postSlice/postSlice";
function Home() {
  const { postFilterCode, listPost } = useSelector((state) => state?.post);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPostFilterCode(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pageNumber = location.state;
  useEffect(() => {
    const fetchApi = async () => {
      const response = await apiPost({
        page: pageNumber || 0,
        ...postFilterCode,
      });
      if (response.err !== 0) return;
      dispatch(setListPost(response));
    };
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, postFilterCode]);
  return (
    <>
      <ListComponent data={listPost?.data?.rows} />
      <PaginationComponent
        totalPage={Math.round( listPost?.data?.count / process.env.REACT_APP_PAGE_LIMIT )}
        currentPage={listPost?.currentPage + 1}
      />
    </>
           

  );
}

export default Home;
