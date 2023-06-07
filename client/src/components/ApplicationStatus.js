import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getToursByUser } from "../redux/features/tourSlice";
// import Spinner from "../components/Spinner";
// import { toast } from "react-toastify";

const ApplicationStatus = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({
    ...state.tour,
  }));
  // const { tour } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // const excerpt = (str) => {
  //   if (str.length > 40) {
  //     str = str.substring(0, 40) + " ...";
  //   }
  //   return str;
  // };

  // if (loading) {
  //   return <Spinner />;
  // }

  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this tour ?")) {
  //     dispatch(deleteTour({ id }));
  //   }
  // };

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      {/* {userTours.length === 0 && (
        <h3>No tour available with the user: {user?.result?.name}</h3>
      )} */}

      {/* {userTours.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user?.result?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )} */}

      {/* {userTourss &&
        userTourss.map((item) => (
          
          <MDBCardGroup>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt="myname"
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">Title</MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">Description</small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editTour/${item._id}`}>
                        <MDBIcon
                          fas
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))} */}
    </div>
  );
};

export default ApplicationStatus;
