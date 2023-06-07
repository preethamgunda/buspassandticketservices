import React, { useEffect, useState } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../redux/features/tourSlice";
import CardTour from "./CardTour";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import { getTour } from "../redux/features/tourSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {
  const [tours, setTours] = useState([
    {
      first_name: "Myname",
    },
  ]);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { id } = useParams();
  const { tour, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.tour,
    })
  );
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tour?page=1&id=${user?.result?._id}`)
      .then(function (response) {
        setTours(response.data.data);
      });
    // dispatch(getTours(currentPage, user?.result?._id));
    // console.log(user.result._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // if (loading) {
  //   return <Spinner />;
  // }
  return (
    <div
      style={{
        marginTop: "120px",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <h1>Dashboard</h1>
      {/* {tours[0].first_name} */}

      <MDBRow className="mt-5">
        {tours.length === 0 && location.pathname === "/" && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours &&
                tours.map((item) => <CardTour key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {/* {tours.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      )} */}
    </div>
  );
};

export default Dashboard;
