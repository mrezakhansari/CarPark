import React, { useState } from "react";
import { Card, CardBody, Row, Col, Button, FormGroup } from "reactstrap";
import { LogIn } from "react-feather";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import * as auth from "../../services/authService";
import FormikControl from "../../components/common/formik/FormikControl";

import ReactRevealText from "react-reveal-text";
import config from "../../config.json";
import CaptchaPage from "./captchaPage";
toast.configure({ bodyClassName: "customFont" });

//#region INITIAL VALUES ---------------------------------------------------

const initialValues = {
  userCode: "",
  password: "",
  captchaText: "",
};

const validationSchema = Yup.object({
  userCode: Yup.string().required("Enter Username !"),
  password: Yup.string().required("Enter Password !"),
  captchaText: Yup.string().required("Enter Security Code !"),
});

//#endregion ---------------------------------------------------------------

const LoginPage = (props) => {
  //#region STATE ------------------------------------------

  const [state, setState] = useState({
    captchaData: "",
    reloadCatpcha: false,
    loadWaiting: false
  });
  const [show, setShow] = useState(false);

  //#endregion -----------------------------------------------------------

  //#region INITAL FUNCTIONS ---------------------------------------------

  useEffect(() => {

    if (props.location.state) {
      const { message } = props.location.state;
      if (props.location.state && message && message.length > 0) {
        toast.error(message);
      }
    }

    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  //#endregion -----------------------------------------------------------

  const handleCaptchaDataChange = (data) => {
    setState((prevState) => {
      return {
        ...prevState,
        captchaData: data,
        reloadCatpcha: false,
        loadWaiting: true
      };
    });
    //console.log(data);
  };

  const handleCompleted = () => {
    setState((prevState) => {
      return {
        ...prevState,
        reloadCatpcha: true,
        loadWaiting: false
      };
    });
  }
  //#region SUBMIT FORMIK ----------------------------------------------------

  const onSubmit = async (values, onSubmitProps) => {
    //console.log('Submit Props', onSubmitProps);
    let parameters = {
      userCode: values.userCode,
      password: values.password,
      captchaText: values.captchaText,
      encodedData: state.captchaData.encodedData,
      timeStamp: state.captchaData.timeStamp,
    };

    try {
      const { result, message } = await auth.login(
        _.pick(parameters, [
          "userCode",
          "password",
          "captchaText",
          "encodedData",
          "timeStamp",
        ])
      );
      if (!result) {
        setState((prevState) => {
          return {
            ...prevState,
            //captchaData: captchaInfo,
            reloadCatpcha: true,
          };
        });
        return toast.error(message);
      } else {
        const { state } = props.location;
        //console.log(props, state);
        //console.log('ssssssss', props.location.state);
        //window.location = state && state.from ? state.from.pathname : "/";
        onSubmitProps.setSubmitting(false);
        if (state && state.from)
          return props.history.replace(
            state && state.from ? state.from.pathname : "/userProfile",
            { ...state.from.state }
          );
        else window.location = "/userProfile";
      }
    } catch (err) {
      if (err.response && err.response.status === 401)
        return toast.error(err.response.data.data[0]);
    }
  };
  //#endregion ---------------------------------------------------------------

  return (
    <Row>
      <Col md="1"></Col>
      <Col
        md="2"
        sm="2"
        className="d-flex align-items-center justify-content-center"
      >
        <h2 className="white py-4">
          {/* <ReactRevealText show={show}>کارال چقدر قشنگه ایشالا مبارکش باد</ReactRevealText> */}

        </h2>
      </Col>
      <Col
        md="8"
        sm="8"
        className="d-flex align-items-center justify-content-end"
      >
        <Card className=" text-center width-400 bg-transparency ">
          <CardBody>
            <h2 className="white py-4">
              {config.appName}
              {/* <ReactRevealText show={show}></ReactRevealText> */}
            </h2>
            <div className="pt-2">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              //validateOnBlur={true}
              //validateOnMount={true}
              //enableReinitialize
              >
                {(formik) => {
                  // console.log("Formik props values", formik,state);

                  return (
                    <React.Fragment>
                      <Form>
                        <Row>
                          <Col md="12" style={{ marginTop: "0.1vh", marginBottom: "-4vh" }}>
                            <FormikControl
                              control="input"
                              type="text"
                              name="userCode"
                              id="userCode"
                              className="ltr"
                              placeholder="نام کاربری"
                              label="نام کاربری"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12" style={{ marginTop: "0.1vh", marginBottom: "-4vh" }}>
                            <FormikControl
                              control="input"
                              type="password"
                              id="password"
                              name="password"
                              className="ltr"
                              placeholder="کلمه عبور"
                              label="کلمه عبور"
                            />
                          </Col>
                        </Row>
                        <Row >
                          <Col md="12"  >
                            <FormikControl
                              control="input"
                              type="text"
                              name="captchaText"
                              className="rtl"
                              placeholder="کد امنیتی را وارد کنید"
                            />
                          </Col>
                        </Row>
                        <Row className="row-eq-height justify-content-md-center">
                          <Col md="3"
                            //style={{ paddingTop: "1rem"}}

                            style={{ height: '8vh' }}
                          >

                            <FormGroup >
                              <CaptchaPage
                                reloadCatpcha={state.reloadCatpcha}
                                onCaptchaDataChange={handleCaptchaDataChange}
                              />
                            </FormGroup>


                          </Col>
                          <Col md="6" className="ml-3" style={{ height: '8vh',marginTop:"0.25vh" }}>
                            <Button
                              color="warning"
                              type="submit"
                             // className="mr-1"
                              disabled={
                                !formik.isValid ||
                                !formik.dirty ||
                                formik.isSubmitting ||
                                !state.captchaData
                              }
                            >
                              ورود به سامانه
                            </Button>
                          </Col>

                        </Row>
                      </Form>
                    </React.Fragment>
                  );
                }}
              </Formik>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col md="1"></Col>
    </Row>
  );
};

export default LoginPage;
