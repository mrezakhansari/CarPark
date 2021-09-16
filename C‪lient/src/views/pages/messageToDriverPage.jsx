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
import url from '../../urls.json';
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
        toast.success(response.data.data[0]);
        setTimeout(() => {
          return props.history.push(url.RegisterDriver);
        }, 2000);
      }
    });
  };

  const onSubmit = (values) => {
    console.log(values);
    registerDriver({ mobileNo: values.mobileNo }).then((response) => {
      if (response.data.result) {
        return toast.success(response.data.data[0]);
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
                                برند: {state.driverInfo.Brand}
                              </span>
                              <br />
                              <span
                                style={{
                                  fontWeight: "1vw",
                                  color: "white",
                                  textAlign: "center",
                                }}
                              >
                                رنگ: {state.driverInfo.Color}
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
                style={{color:"white", backgroundColor:"#0ddb1e"}}
                onClick={() =>
                  handleSubmitSendMessageToDriver(
                    1,
                    "لطفا اقدام به جابجایی خودرو بفرمایید"
                  )
                }
              >
                لطفا اقدام به جابجایی خودرو بفرمایید
              </Button>
            </Col>
            <Col md="12">
              <Button
                style={{color:"white", backgroundColor:"#f01f45"}}
                onClick={() =>
                  handleSubmitSendMessageToDriver(
                    2,
                    "لطفا صدای دزدگیر خودرو را قطع نمایید"
                  )
                }
              >
                لطفا صدای دزدگیر خودرو را قطع نمایید
              </Button>
            </Col>

            {/* <Col md="12">
              <Button
              style={{color:"white", backgroundColor:"#f01f45"}}
                onClick={() =>
                  handleSubmitSendMessageToDriver(3, "خودرو شما تصادف نموده است")
                }
              >
                خودرو شما تصادف نموده است
              </Button>
            </Col> */}
            <Col md="12">
              <Button
              style={{color:"white", backgroundColor:"#ff9900"}}
                onClick={() =>
                  handleSubmitSendMessageToDriver(4, "خودرو شما دچار نشتی می باشد")
                }
              >
                خودرو شما دچار نشتی می باشد
              </Button>
            </Col>
            <Col md="12">
              <Button
              style={{color:"white", backgroundColor:"#4d4dff"}}
                onClick={() =>
                  handleSubmitSendMessageToDriver(5, "درب/پنجره خودرو شما باز می باشد")
                }
              >
                درب/پنجره خودرو شما باز می باشد
              </Button>
            </Col>
            {/* <Col md="12">
              <Button
              style={{color:"white", backgroundColor:"#00005c"}}
                onClick={() =>
                  handleSubmitSendMessageToDriver(7, "در اطراف خودرو شما فعالیت های مشکوکی مشاهده شده")
                }
              >
               در اطراف خودرو شما فعالیت های مشکوکی مشاهده شده
              </Button>
            </Col> */}
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default MessageToDriverPage;
