import React, { useState } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { LogIn } from "react-feather";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import * as auth from "../../services/smsService"
import FormikControl from "../../components/common/formik/FormikControl";

import ReactRevealText from 'react-reveal-text';

toast.configure({ bodyClassName: "customFont" });

//#region INITIAL VALUES ---------------------------------------------------

const initialValuesFirstVerify = {

  fullName: "",
  brand: "",
  model: "",
  identifier: "",
  color: "",
  mobileNo: ""
};

const initialValuesSecondVerify = {
  code: ""
};

const validationSchemaFirstVerify = Yup.object({
  fullName: Yup.string().required("!نام و نام خانوادگی خود را وارد کنید"),
  brand: Yup.string().required("!برند خودرو را انتخاب کنید"),
  model: Yup.string().required("!مدل خودرو را انتخاب کنید"),
  identifier: Yup.string().required("!پلاک خودرو را وارد کنید"),
  color: Yup.string().required("!رنگ خودرو را وارد کنید"),
  mobileNo: Yup.string().required("!شماره موبایل خود را وارد کنید"),
});

const validationSchemaSecondVerify = Yup.object({
  code: Yup.string().required("!کد تایید را وارد نمایید")
});

const brandOptions = [
  {
    label: "ایران خودرو",
    value: 0,
    models: [{
      label: 'سمند ال ایکس',
      value: 0
    },
    {
      label: 'سمند یاریس',
      value: 1
    }]
  },
  {
    label: "تویوتا",
    value: 1,
    models: [{
      label: 'یاریس',
      value: 0
    },
    {
      label: 'رفور',
      value: 1
    }]
  }
]

//#endregion ---------------------------------------------------------------

const FirstPage = (props) => {

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let timer1;
    if (counter > 0) {
      timer1 = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => {
      if (timer1)
        clearTimeout(timer1);
    };
  }, [counter]);

  const [DataForResendVerificationCode, setDataForResendVerificationCode] = useState({
    mobileNo: '',
    name: '',
    nationalCode: ''
  })

  //#region SUBMIT FORMIK ----------------------------------------------------

  const handleResendVerifyCode = async (values) => {

    //console.log("first params resend", DataForResendVerificationCode)
    try {
      const { result, message } = await auth.sendVerificationCode(DataForResendVerificationCode);
      //console.log(result, message)
      if (!result)
        return toast.error(message);
      else {
        setVisibleFirstVerify(false);
        setMobileNo(DataForResendVerificationCode.mobileNo);
        setVisibleSecondVerify(true);
        setCounter(60);
      }
    } catch (err) {
      if (err.response && err.response.status === 401)
        return toast.error(err.response.data.data[0])
    }
  }

  const onSubmitFirstVerify = async (values, props) => {

    let parameters = {
      mobileNo: values.mobileNo,
      fullName: values.fullName,
      brand: values.brand,
      model: values.model,
      identifier: values.identifier,
      color: values.color
    };

    //console.log("first params", parameters)

    try {
      const { result, message } = await auth.sendVerificationCode(_.pick(parameters, ["mobileNo", "fullName", "brand", "model", "identifier", "color"]));
      //console.log(result, message)
      if (!result)
        return toast.error(message);
      else {
        setVisibleFirstVerify(false);
        setMobileNo(values.mobileNo);
        setVisibleSecondVerify(true);
        setCounter(120);
        setDataForResendVerificationCode(_.pick(parameters, ["mobileNo", "fullName", "brand", "model", "identifier", "color"]));
      }
    } catch (err) {
      if (err.response && err.response.status === 401)
        return toast.error(err.response.data.data[0])
    }
  };

  const onSubmitSecondVerify = async (values) => {
    let parameters = {
      code: values.code,
      mobileNo: mobileNo
    };

    //console.log("second params", parameters);
    try {
      const { result, message } = await auth.VerifyCode(_.pick(parameters, ["code", "mobileNo"]));
      //console.log(result, message)
      if (!result)
        return toast.error(message);
      else {
        setVisibleFirstVerify(true);
        setVisibleSecondVerify(false);

        const { state } = props.location;
        //console.log(props, state);
        //console.log('ssssssss', props.location.state);
        //window.location = state && state.from ? state.from.pathname : "/";
        if (state && state.from)
          return props.history.replace(state && state.from ? state.from.pathname : '/userProfile', { ...state.from.state })
        else
          props.history.replace("/userProfile")
        //window.location = "/userProfile";
      }
    } catch (err) {
      if (err.response && err.response.status === 401)
        return toast.error(err.response.data.data[0])
    }

  }
  //#endregion ---------------------------------------------------------------

  //#region STATE ------------------------------------------

  const [show, setShow] = useState(false);
  const [visibleSecondVerify, setVisibleSecondVerify] = useState(false);
  const [visibleFirstVerify, setVisibleFirstVerify] = useState(false);
  const [mobileNo, setMobileNo] = useState(null);
  const [brandStatus, setBrandStatus] = useState("");
  const [models, setModels] = useState([]);
  const [selectModel, setSelectModel] = useState("");

  //#endregion -----------------------------------------------------------

  //#region INITAL FUNCTIONS ---------------------------------------------

  useEffect(() => {
    //console.log(props);
    if (props.location.state) {
      const { message } = props.location.state;
      if (props.location.state && message && message.length > 0) {
        toast.error(message);
      }
    }

    ////console.log('from login effevt', props)

    setTimeout(() => {
      setShow(true);
    }, 1000);

  }, []);

  useEffect(() => {
    let errorMessage = "";
    setVisibleFirstVerify(true);
  }, []);

  const onbrandSelectedChanged = (data) => {
    setModels([]);
    console.log(data);
    setBrandStatus(data.label);
    let eee = _(brandOptions.filter(n => n.label === data.label)).head().models.map(c => {
      return {
        label: c.label,
        value: c.value
      }
    });
    if (eee.length > 0) {
      setModels(eee);
    }
    setSelectModel("");

  }

  //#endregion -----------------------------------------------------------

  return (


    <div className="container">
      <Row className="full-height-vh">
        <Col
          xs="12"
          className="d-flex align-items-center justify-content-center"
        >
          <Card className=" text-center width-400 customBackgroundColor" >
            <CardBody>
              <h2 className="white py-4" style={{ color: 'rgb(100,50,100,1)', fontStyle: "normal", fontWeight: "bold" }}>
                <ReactRevealText show={show}>
                  کارال؛ سامانه فراخوان راننده
                </ReactRevealText>
              </h2>
              {visibleFirstVerify &&
                <div className="pt-2">

                  <Formik
                    initialValues={initialValuesFirstVerify}
                    validationSchema={validationSchemaFirstVerify}
                    onSubmit={async (values) => {
                      ////console.log("values", values);
                      await onSubmitFirstVerify(values, props);
                    }}
                    //validateOnBlur={true}
                    validateOnMount={true}
                    enableReinitialize
                  >
                    {(formik) => {
                      ////console.log("Formik props values", formik);

                      return (
                        <React.Fragment>
                          <Form>
                            <Row>
                              <Col md="12">
                                <FormikControl
                                  control="input"
                                  type="text"
                                  name="fullName"
                                  id="fullName"
                                  className="rtl"
                                  placeholder="نام و نام خانوادگی"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormikControl
                                  control="customSelect"
                                  name="brand"
                                  options={brandOptions.map(c => {
                                    return {
                                      label: c.label,
                                      value: c.value
                                    }
                                  })}
                                  id="brand"
                                  className="ltr"
                                  placeholder="برند خودرو"
                                  classN="rtl"
                                  onSelectedChanged={onbrandSelectedChanged}
                                />
                              </Col>
                            </Row>
                            {brandStatus && <Row>
                              <Col md="12">
                                <FormikControl
                                  control="customSelect"
                                  name="model"
                                  options={models}
                                  id="model"
                                  className="ltr"
                                  placeholder="مدل خودرو"
                                  selectedValue={selectModel}
                                />
                              </Col>
                            </Row>}
                            <Row>
                              <Col md="12">
                                <FormikControl
                                  control="input"
                                  type="text"
                                  name="color"
                                  id="color"
                                  className="rtl"
                                  placeholder="رنگ خودرو"
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <FormikControl
                                  control="inputMaskDebounce"
                                  mask="09999999999"
                                  type="text"
                                  name="mobileNo"
                                  id="mobileNo"
                                  className="rtl"
                                  placeholder="شماره موبایل"
                                />
                              </Col>
                            </Row>

                            <div className="form-actions center">

                              <Button name="firstVerifyButton" color="primary" type="submit" className="mr-1" disabled={!formik.isValid}>
                                <LogIn size={16} color="#FFF" /> Enter
                              </Button>

                            </div>
                          </Form>
                        </React.Fragment>
                      );
                    }}
                  </Formik>
                </div>}
              {
                visibleSecondVerify &&
                <div className="pt-2">
                  <Formik
                    initialValues={initialValuesSecondVerify}
                    validationSchema={validationSchemaSecondVerify}
                    onSubmit={async (values) => {
                      ////console.log("values", values);
                      await onSubmitSecondVerify(values);
                    }}
                    //validateOnBlur={true}
                    validateOnMount={true}
                    enableReinitialize
                  >
                    {(formik2) => {
                      return (
                        <Form>
                          <Row>
                            <Col md="12">
                              <FormikControl
                                control="input"
                                type="number"
                                name="code"
                                id="code"
                                className="rtl"
                                placeholder="کد تأیید"
                              />
                            </Col>
                          </Row>
                          <div className="form-actions center">

                            <Button name="sencondVerifyButton" color="primary" type="submit" className="mr-1" disabled={!formik2.isValid}>
                              <LogIn size={16} color="#FFF" /> ارسال
                            </Button>

                            <Button name="resendSMS" className="ml-1" type="button" color="primary" disabled={counter !== 0}
                              onClick={() => handleResendVerifyCode(formik2.values)}>
                              <LogIn size={16} color="#FFF" /> ارسال مجدد پیامک {counter}
                            </Button>

                          </div>
                        </Form>
                      )
                    }}
                  </Formik>
                </div>
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>


  );
};

export default FirstPage;
