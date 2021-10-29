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
import { registerDriver, checkUserExistsAlready } from "../../services/register";

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

const RegisterDriverPage = (props) => {
    const [state, setState] = useState({
        driverInfo: "",
        messagesList: [],
        visibleDriverInfo: false,
        editModal: false,
    });

    useEffect(() => {
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

        setTimeout(() => {
            setShow(true);
        }, 1000);
    }, []);

    const onSubmit = async (values) => {
        //console.log(values);
        try {
            let res = await checkUserExistsAlready({ mobileNo: values.mobileNo });
            if (!res.data.result) {
                return toast.error(res.data.data[0]);
            }
            let res2 = await registerDriver({ mobileNo: values.mobileNo });
            if (res2.data.result) {
                return toast.success(res2.data.data[0]);
            }

        } catch (error) {

        }

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
                                     کارال سامانه فراخوان راننده
                                </h2>
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
                                            برای مجهز کردن خودروتان به کارال با وارد کردن شماره تلفن همراه خود ثبت درخواست نمایید
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
                                                        <Col>
                                                            <FormikControl
                                                                control="customInput"
                                                                mask="99999999999"
                                                                type="text"
                                                                name="mobileNo"
                                                                id="mobileNo"
                                                                className="ltr"
                                                                // placeholder="شماره موبایل"
                                                                label="شماره همراه"
                                                            />
                                                        </Col>
                                                        <Col md="4" style={{ paddingTop: "1.4rem" }}>
                                                            <Button color="danger" type="sumbit">
                                                                ثبت
                                                            </Button>
                                                        </Col>

                                                    </Row>
                                                </Form>
                                            </React.Fragment>
                                        );
                                    }}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default RegisterDriverPage;
