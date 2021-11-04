import React, { useEffect, useState } from "react";
import { Row, Col, Button, FormGroup, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { toast } from 'react-toastify';
import { Table, Tag } from 'antd';
import antdClass2 from "../../assets/css/vendors/customAntdTable.css";
import _ from 'lodash';
import * as userService from '../../services/user';
import * as carService from '../../services/carService';
import * as qrCodeService from '../../services/qrCodeService';
import * as assignService from '../../services/userCarAssign';
import { Formik, Form } from "formik";
import FormikControl from "../../components/common/formik/FormikControl";
import * as Yup from 'yup';
import Plate from "../../components/common/plate";
import CustomPlateReading from '../../components/common/formik/CustomPlateReading';

toast.configure({ bodyClassName: "customFont" });

const UserPage = (props) => {

    //#region cars and Initial Functions -----------------------------------------

    const CreateAssignInitialValues = {
        user: '',
        qrCode: '',
        car: '',
        //effectiveDate: '',
        plateNo: ''
    }

    const CreateAssignValidationSchema = Yup.object({
        user: Yup.object().required("کاربر را انتخاب کنید !"),
        qrCode: Yup.object().required("کد تولید شده را انتخاب کنید !"),
        car: Yup.object().required("نوع و مدل ماشین را انتخاب کنید !"),
        plateNo: Yup
            .object()
            .required("شماره پلاک را وارد کنید !")
            .test("validPlateNo", "شماره پلاک را وارد کنید", (value) => {
                console.log("validPlateNo", value)
                if (value && 
                    (value.firstPart !=='' && value.firstPart !== undefined && value.firstPart.length === 2) &&
                    (value.secondPart !=='' && value.secondPart !== undefined && value.secondPart.length === 1) &&
                    (value.thirdPart !=='' && value.thirdPart !== undefined && value.thirdPart.length === 3) &&
                    (value.forthPart !=='' && value.forthPart !== undefined && value.forthPart.length === 2)) {
                    return true;
                }
                else {
                    return false;
                }
            }),
        //effectiveDate: Yup.string().required("تاریخ اعتبار را انتخاب کنید !")
    });

    const Columns = [
        {
            title: 'ردیف',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: '2vw'
        },
        {
            title: 'نام و نام خانوادگی',
            key: 'name',
            render: (text, record, index) => record.FullName,
            width: '7vw'
        },
        {
            title: 'شماره پلاک',
            dataIndex: 'PlateNo',
            key: 'plateNo',
            render: text => (
                // <Tag color="geekblue">{
                //     text
                // }</Tag>
                // <Plate plateNo={text} height="7vh" width="14vw" fontSize="1.5vw" />
               // <Plate plateNo={text} height="100%" width="100%" fontSize="1.1em" />
               <CustomPlateReading plateNo={text}/>
            ),
            width: '16vw'
        },
        {
            title: 'نام خودرو',
            dataIndex: 'Name',
            key: 'name',
            width: '7vw'
        },
        {
            title: 'برند خودرو',
            dataIndex: 'Brand',
            key: 'brand',
            width: '7vw'
        },
        {
            title: 'رنگ خودرو',
            dataIndex: 'Color',
            key: 'color',
            width: '7vw'
        },
        {
            title: 'تاریخ اعتبار',
            dataIndex: 'EffectiveDate',
            key: 'effectiveDate',
            width: '7vw'
        }
    ];

    const [state, setState] = useState({
        assignsList: [],
        assignsListForGrid: [],
        currentAssign: {},
        createAssignInfoModal: false,
        carsList: [],
        qrCodesList: [],
        usersList: []
    });

    const createDataModelForDataTabel = (data) => {
        return data.map(item => {
            return { ...item, key: item.UserCarAssign_ID }
        })
    }

    const loadUsersInfo = () => {
        userService.getAllUsers().then(response => {
            if (response.data.result) {
                console.log(response)
                setState(prevState => {
                    return {
                        ...prevState,
                        usersList: response.data.data
                    }
                });
            }
            else {
                return toast.error('نوع کاربری یافت نشد با ادمین سایت تماس بگیرید');
            }
        })
            .catch(error => {
                //
            })
    }

    const loadCarsInfo = () => {
        carService.getAllCars().then(response => {
            if (response.data.result) {
                console.log(response)
                setState(prevState => {
                    return {
                        ...prevState,
                        carsList: response.data.data
                    }
                });
            }
            else {
                return toast.error('نوع کاربری یافت نشد با ادمین سایت تماس بگیرید');
            }
        })
            .catch(error => {
                //
            })
    }

    const loadAssignsInfo = () => {
        assignService.getAllUserCarAssignInfo()
            .then(response => {
                console.log(response)
                if (response.data.result) {
                    const data = response.data.data;
                    setState(prevState => {
                        return {
                            ...prevState,
                            assignsList: data, assignsListForGrid: createDataModelForDataTabel(data)
                        }
                    });
                }
                else {
                    return toast.warning("اطلاعاتی برای نمایش وجود ندارد");
                }
            })
            .catch(error => {
                //
            })
    }

    const loadQrCodesInfo = () => {
        qrCodeService.getAllQrLinks()
            .then(response => {
                console.log(response)
                if (response.data.result) {
                    const data = response.data.data;
                    setState(prevState => {
                        return {
                            ...prevState,
                            qrCodesList: data
                        }
                    });
                }
                else {
                    return toast.warning("اطلاعاتی برای نمایش وجود ندارد");
                }
            })
            .catch(error => {
                //
            })
    }
    useEffect(() => {
        loadUsersInfo();
        loadCarsInfo();
        loadQrCodesInfo();
        loadAssignsInfo();
    }, [])

    //#endregion ---------------------------------------------------------

    //#region Create User Info ----------------------------------------

    const handleCreateUserInfo = (record) => {
        setState(prevState => {
            return {
                ...prevState,
                currentAssign: {}
            }
        });
        createUserInfoToggle();
    }

    const createUserInfoToggle = () => {
        setState(prevState => {
            return {
                ...prevState,
                createAssignInfoModal: !prevState.createAssignInfoModal
            }
        });
    }

    const handleSubmitCreateUserInfo = (values) => {
        const parameters = {
            carId: values.car.value,
            userId: values.user.value,
            //effectiveDate: values.effectiveDate,
            qrCodeId: values.qrCode.value,
            plateNo: `${values.plateNo.firstPart}${values.plateNo.secondPart}${values.plateNo.thirdPart}${values.plateNo.forthPart}`
        }
        console.log(parameters);
        assignService.addNewAssignInfo(parameters)
            .then(response => {
                if (response.data.result) {
                    loadAssignsInfo();
                    createUserInfoToggle();
                    return toast.success("تخصیص کاربر به کد و ماشین با موفقیت انجام شد")
                }
                else {
                    return toast.error("امکان تخصیص کاربر وجود ندارد");
                }
            })
            .catch(error => {
                //console.log(error.message);
            })
    }

    const handleCancelCreateUserInfo = () => {
        setState(prevState => {
            return {
                ...prevState,
                currentAssign: {}
            }
        });
        createUserInfoToggle();
    }

    //#endregion ---------------------------------------------------------


    return (
        <React.Fragment>
            <div className="container">
                <Row className="customBackgroundColor ">
                    <Col md="12" className="mt-2">
                        <FormGroup>
                            <Row className="d-flex ">
                                <Col md="3">
                                    <button className="btn btn-warning rtl"
                                        style={{ direction: 'rtl', float: 'right' }}
                                        type="button"
                                        onClick={handleCreateUserInfo}>تخصیص</button>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <Table
                                    
                                    style={{ width: '100%', height: '100%' }}
                                        className={antdClass2}
                                        rowClassName={antdClass2}
                                        columns={Columns}
                                        dataSource={state.assignsListForGrid}
                                        pagination={false}
                                        scroll={{ x: 1000, y: 400 }}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Modal
                isOpen={state.createAssignInfoModal}
                toggle={createUserInfoToggle}
                className={props.className + " customFont"}
                backdrop="static"
                dir="ltr"
            >
                <ModalHeader toggle={createUserInfoToggle} className="customFont text-right">اضافه کردن اطلاعات کاربر</ModalHeader>
                <ModalBody className="text-center">
                    <Formik
                        initialValues={CreateAssignInitialValues}
                        validationSchema={CreateAssignValidationSchema}
                        onSubmit={async (values) => {
                            ////console.log("values", values);
                            await handleSubmitCreateUserInfo(values);
                        }}
                        validateOnBlur={true}
                        validateOnMount={true}
                        enableReinitialize
                    >
                        {(formik) => {
                            console.log("Formik props values", formik.values);

                            return (
                                <React.Fragment>
                                    <Form>
                                        <Row>
                                            <Col md="12">
                                                <FormikControl
                                                    control="customSelect"
                                                    name="car"
                                                    options={state.carsList.map(c => {
                                                        return {
                                                            label: `${c.Name} ${c.Brand} ${c.Color}`,
                                                            value: c.ID
                                                        }
                                                    })}
                                                    id="car"
                                                    className="rtl"
                                                    classN="rtl"
                                                    label="ماشین"
                                                    placeholder="ساندرو رنو سفید"
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormikControl
                                                    control="customSelect"
                                                    name="user"
                                                    options={state.usersList.map(c => {
                                                        return {
                                                            label: `${c.FirstName} ${c.LastName} ${c.MobileNo}`,
                                                            value: c.ID
                                                        }
                                                    })}
                                                    id="user"
                                                    className="rtl"
                                                    classN="rtl"
                                                    label="کاربر"
                                                    placeholder="نام و نام خانوادگی و موبایل"
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormikControl
                                                    control="customSelect"
                                                    name="qrCode"
                                                    options={state.qrCodesList.map(c => {
                                                        return {
                                                            label: c.No,
                                                            value: c.ID
                                                        }
                                                    })}
                                                    id="qrCode"
                                                    className="rtl"
                                                    classN="rtl"
                                                    label="کد تولید شده"
                                                    placeholder="QR Code"
                                                />
                                            </Col>
                                        </Row>
                                        {/* <Row>
                                            <Col md="12" className={"ltr"}>
                                                <FormikControl
                                                    control="customDateTimePicker"
                                                    name="effectiveDate"
                                                    id="effectiveDate"
                                                    className="ltr"
                                                    label="تاریخ اعتبار"
                                                />
                                            </Col>
                                        </Row> */}
                                        <Row>
                                            <Col md="12" className={"ltr"}>
                                                <FormikControl
                                                    control="customPlate"
                                                    type="text"
                                                    name="plateNo"
                                                    id="plateNo"
                                                    className="ltr"
                                                />
                                                {/* <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="plateNo"
                                                    id="plateNo"
                                                    className="ltr"
                                                    //placeholder="نام کاربری"
                                                    label="شماره پلاک"
                                                /> */}
                                            </Col>
                                        </Row>
                                        <div className="form-actions center">
                                            <Button color="primary" type="submit" className="ml-1" disabled={!formik.isValid}>
                                                {/* <LogIn size={16} color="#FFF" />  */}
                                                ذخیره
                                            </Button>
                                            <Button color="secondary" type="button" onClick={handleCancelCreateUserInfo}>
                                                لغو
                                            </Button>
                                        </div>
                                    </Form>
                                </React.Fragment>
                            );
                        }}
                    </Formik>

                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default UserPage;
