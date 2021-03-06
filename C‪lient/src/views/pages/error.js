// import external modules
import React from "react";
import { NavLink, Link } from "react-router-dom";

// import internal(own) modules
import { Row, Col } from "reactstrap";

const Error = props => {
   return (
      <div className="container-fluid bg-grey bg-lighten-3 text-muted">
         <div className="container">
            <Row className="full-height-vh">
               <Col md="12" lg="12" className="d-flex align-items-center justify-content-center">
                  <div className="error-container">
                     <div className="no-border">
                        <div
                           className="text-center text-bold-600 grey darken-1 mt-5"
                           style={{ fontSize: "10rem", marginBottom: "4rem" }}
                        >
                           404
                           <p>صفحه ی مورد نظر در دسترس نمی باشد</p>
                        </div>
                     </div>
                     <div className="error-body">
                        <Row className="py-2">
                           <Col xs="12" className="input-group">
                              <input
                                 type="text"
                                 className="form-control "
                                 placeholder="Search..."
                                 aria-describedby="button-addon2"
                              />
                              <span className="input-group-btn" id="button-addon2">
                                <Link to="/pages/user-profile">
                                    <i className="ft-search" />
                                 </Link>
                              </span>
                           </Col>
                        </Row>
                        <Row className="py-2 justify-content-center">
                           <Col>
                              <NavLink to="/" className="btn btn-primary btn-raised btn-block font-medium-2">
                                 <i className="ft-home" /> بازگشت به صفحه ی اصلی
                              </NavLink>
                           </Col>
                        </Row>
                     </div>
                     <div className="error-footer bg-transparent">
                     </div>
                  </div>
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default Error;
