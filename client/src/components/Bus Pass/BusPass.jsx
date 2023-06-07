import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const BusPass = () => {
  return (
    <MDBRow style={{marginTop:"200px"}}>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Student Bus Pass</MDBCardTitle>
            <MDBCardText>
              Students who are currently pursuing any degree are eligible to apply here.
            </MDBCardText>
            <Link to = "/student_pass">
              <p>Apply Here</p>
            </Link>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol sm='6'>
        <MDBCard>
          <MDBCardBody>
            <MDBCardTitle>Employee Bus Pass</MDBCardTitle>
            <MDBCardText>
              Employees who want to make travel hassle free and save on the ticket prices can apply here.
            </MDBCardText>
            <Link to ="/employee_pass" >
              <p>Apply Here</p>
            </Link>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  )
}

export default BusPass