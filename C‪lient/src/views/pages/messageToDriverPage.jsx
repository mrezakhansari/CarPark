import React, { useState } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { LogIn } from "react-feather";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import * as auth from "../../services/smsService";
import FormikControl from "../../components/common/formik/FormikControl";

import ReactRevealText from "react-reveal-text";
import { getUserCarAssignInfoBasedOnQrCode } from "../../services/userCarAssign";
import { getMessageTemplates } from "../../services/messageTemplate";
import MinimalStatisticsBG from "../../components/cards/minimalStatisticsBGCard";
import Plate from "../../components/common/plate";
import { saveMessage } from "../../services/userCarAssignMessage";
import { registerDriver } from "../../services/register";

toast.configure({ bodyClassName: "customFont" });

const asd = ["a", "b"];

//#region INITIAL VALUES ---------------------------------------------------

const initialValueRegisterDriver = {
  mobileNo: "",
};

const validationSchemaForRegisterDriver = Yup.object({
  mobileNo: Yup.string().required("!شماره موبایل خود را وارد کنید"),
});

const brandOptions = [
  {
    label: "ایران خودرو",
    value: 0,
    models: [
      {
        label: "سمند ال ایکس",
        value: 0,
      },
      {
        label: "سمند یاریس",
        value: 1,
      },
    ],
  },
  {
    label: "تویوتا",
    value: 1,
    models: [
      {
        label: "یاریس",
        value: 0,
      },
      {
        label: "رفور",
        value: 1,
      },
    ],
  },
];

//#endregion ---------------------------------------------------------------

const MessageToDriverPage = (props) => {
  const [state, setState] = useState({
    driverInfo: "",
    messagesList: [],
    visibleDriverInfo: false,
    editModal: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const temp = await getUserCarAssignInfoBasedOnQrCode({
          id: props.match.params.id,
        });
        console.log("res", props, temp);
        if (temp.data.result) {
          setState((prevState) => {
            return {
              ...prevState,
              driverInfo: temp.data.data[0],
              visibleDriverInfo: true,
            };
          });
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              visibleDriverInfo: false,
            };
          });
        }
      } catch (error) {
        console.log("rer");
        setState((prevState) => {
          return {
            ...prevState,
            visibleDriverInfo: false,
          };
        });
      }
    }
    //**************************************************************** */
    async function fetchMessageTemplates() {
      try {
        const temp2 = await getMessageTemplates();
        console.log("getMessageTemplates", temp2.data);
        if (temp2.data.result) {
          setState((prevState) => {
            return {
              ...prevState,
              messagesList: temp2.data.data,
            };
          });
        }
      } catch (error) {
        console.log("rer", error);
      }
    }
    //***************************************************************** */
    fetchData();
    fetchMessageTemplates();
  }, []);

  //#region STATE ------------------------------------------

  const [show, setShow] = useState(false);
  const [visibleFirstVerify, setVisibleFirstVerify] = useState(false);
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

  const onbrandSelectedChanged = (data) => {
    setModels([]);
    console.log(data);
    setBrandStatus(data.label);
    let eee = _(brandOptions.filter((n) => n.label === data.label))
      .head()
      .models.map((c) => {
        return {
          label: c.label,
          value: c.value,
        };
      });
    if (eee.length > 0) {
      setModels(eee);
    }
    setSelectModel("");
  };

  const editToggle = () => {
    console.log(state, state.messagesList.length);
    setState((prevState) => {
      return {
        ...prevState,
        editModal: !state.editModal,
      };
    });
  };

  const handleSendMessageToDriver = () => {
    editToggle();
  };
  const handleCancelSendMessageToDriver = () => {
    editToggle();
  };
  const handleSubmitSendMessageToDriver = (messageId, messageText) => {
    console.log(messageId);
    const data = {
      userCarAssign_id: state.driverInfo.UserCarAssign_ID,
      fromUser_id: state.driverInfo.User_ID,
      toUser_id: state.driverInfo.User_ID,
      messageTemplate_id: messageId,
      messageText: messageText,
    };
    saveMessage(data).then((response) => {
      if (response.data.result) {
        return toast(response.data.data[0]);
      }
    });
  };

  const onSubmit = (values) => {
    console.log(values);
    registerDriver({ mobileNo: values.mobileNo }).then((response) => {
      if (response.data.result) {
        return toast(response.data.data[0]);
      }
    });
  };

  //#endregion -----------------------------------------------------------

  return (
    <React.Fragment>
      <div className="container">
        <Row className="full-height-vh">
          <Col
            xs="12"
            className="d-flex align-items-center justify-content-center"
          >
            <Card className=" text-center width-400 customBackgroundColor">
              <CardBody>
                <h2
                  className="white py-4"
                  style={{
                    color: "rgb(100,50,100,1)",
                    fontStyle: "normal",
                    fontWeight: "bold",
                  }}
                >
                  <ReactRevealText show={show}>
                    کارال سامانه فراخوان راننده
                  </ReactRevealText>
                </h2>
                {state.visibleDriverInfo && (
                  <Row>
                    <Col
                      sm="12"
                      md="12"
                      key={state.driverInfo.UserCarAssign_ID}
                      className="customFont"
                    >
                      <MinimalStatisticsBG
                        cardBgColor="bg-warning btn"
                        statistics={state.driverInfo.UserCarAssign_ID.toString()}
                        textElement={
                          <React.Fragment>
                            <div className="customFont rtl">
                              <strong
                                style={{
                                  fontWeight: "5vw",
                                  textAlign: "center",
                                  direction: "ltr",
                                }}
                              >
                                {state.driverInfo.title}
                                ماشین: {state.driverInfo.Name}
                              </strong>
                              <hr />
                              <span
                                style={{
                                  fontWeight: "1vw",
                                  color: "white",
                                  textAlign: "center",
                                }}
                              >
                                رنگ: {state.driverInfo.Color}
                              </span>
                              <br />
                              <span
                                style={{
                                  fontWeight: "1vw",
                                  color: "white",
                                  textAlign: "center",
                                }}
                              >
                                شماره شهربانی: {state.driverInfo.PlateNo}
                              </span>
                            </div>
                          </React.Fragment>
                        }
                        // text={"asdfasdf"}
                        //iconSide="left"
                        //onClick={handleOrderProduct}
                        key={state.driverInfo.UserCarAssign_ID}
                        textAlign="center"
                      ></MinimalStatisticsBG>
                    </Col>
                    <Col md="12">
                      <Plate plateNo={state.driverInfo.PlateNo} />
                    </Col>
                    <Col className="mt-2" md="12">
                      <Button
                        color="success"
                        onClick={handleSendMessageToDriver}
                      >
                        ارسال پیام به راننده
                      </Button>
                    </Col>
                  </Row>
                )}
                <hr />
                <Row>
                  <Col md="12">
                    <p
                      className="mb-1 ltr"
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "black",
                      }}
                    >
                      ثبت نام به عنوان راننده
                    </p>
                  </Col>
                </Row>
                <Formik
                  initialValues={initialValueRegisterDriver}
                  validationSchema={validationSchemaForRegisterDriver}
                  onSubmit={async (values) => {
                    ////console.log("values", values);
                    await onSubmit(values, props);
                  }}
                  validateOnBlur={true}
                  validateOnMount={true}
                  enableReinitialize
                >
                  {(formik) => {
                    ////console.log("Formik props values", formik);
                    console.log(state);
                    return (
                      <React.Fragment>
                        <Form>
                          <Row>
                            <Col md="4" style={{ paddingTop: "1.4rem" }}>
                              <Button color="danger" type="sumbit">
                                ارسال
                              </Button>
                            </Col>
                            <Col>
                              <FormikControl
                                control="customInput"
                                mask="99999999999"
                                type="text"
                                name="mobileNo"
                                id="mobileNo"
                                className="ltr"
                                placeholder="شماره موبایل"
                              />
                            </Col>
                          </Row>
                        </Form>
                      </React.Fragment>
                    );
                  }}
                </Formik>

                {/* {
                  visibleFirstVerify &&
                  <div className="pt-2">

                    <Formik
                      initialValues={initialValuesFirstVerify}
                      validationSchema={validationSchemaFirstVerify}
                      onSubmit={async (values) => {
                        ////console.log("values", values);
                        await onSubmit(values, props);
                      }}
                      //validateOnBlur={true}
                      validateOnMount={true}
                      enableReinitialize
                    >
                      {(formik) => {
                        ////console.log("Formik props values", formik);
                        console.log(state)
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
                  </div>
                } */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        isOpen={state.editModal}
        toggle={editToggle}
        className={props.className + " customFont"}
        backdrop="static"
        // dir="rtl"
      >
        <ModalHeader toggle={editToggle} className="customFont rtl">
          ارسال پیغام به راننده
        </ModalHeader>
        <ModalBody className="text-center">
          <Row>
            <Col md="12">
              <Button
                color="primary"
                onClick={() =>
                  handleSubmitSendMessageToDriver(
                    1,
                    "  روغن ماشین در حال ریختن است"
                  )
                }
              >
                روغن ماشین در حال ریختن است
              </Button>
            </Col>
            <Col md="12">
              <Button
                color="danger"
                onClick={() =>
                  handleSubmitSendMessageToDriver(
                    2,
                    "بنزین ماشین در حال ریختن است"
                  )
                }
              >
                بنزین ماشین در حال ریختن است
              </Button>
            </Col>

            <Col md="12">
              <Button
                color="success"
                onClick={() =>
                  handleSubmitSendMessageToDriver(3, "جای پارک مناسب نیست")
                }
              >
                جای پارک مناسب نیست
              </Button>
            </Col>
            <Col md="12">
              <Button
                color="warning"
                onClick={() =>
                  handleSubmitSendMessageToDriver(5, " ماشین شما تصادف کرده")
                }
              >
                ماشین شما تصادف کرده
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default MessageToDriverPage;
