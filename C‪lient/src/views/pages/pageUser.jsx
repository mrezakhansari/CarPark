import React, { useEffect, useState } from "react";
import { Row, Col, Button, FormGroup, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { toast } from 'react-toastify';
import { Table, Tag } from 'antd';
import antdClass2 from "../../assets/css/vendors/customAntdTable.css";
import _ from 'lodash';
import * as userService from '../../services/user';
import { Formik, Form } from "formik";
import FormikControl from "../../components/common/formik/FormikControl";
import * as Yup from 'yup';
import * as auth from '../../services/authService';

toast.configure({ bodyClassName: "customFont" });

const UserPage = (props) => {

    //#region cars and Initial Functions -----------------------------------------

    const CreateUserInitialValues = {
        firstName: '',
        lastName: '',
        mobileNo: '',
        //email: '',
        userType: '',
        //address: ''
    }

    const CreateUserValidationSchema = Yup.object({
        firstName: Yup.string().required("نام کاربر را وارد کنید !"),
        lastName: Yup.string().required("نام خانوادگی کاربر را وارد کنید !"),
        mobileNo: Yup.string().required("شماره موبایل را وارد کنید !"),
        // userType: Yup.object().required("نوع کاربری را وارد کنید !").test('usertype','نوع کاربری را وارد کنید',(value)=>{
        //     if (state.userLogined.userType !=="Admin") return true;
        //     else return false;
        // }),
        //email: Yup.string().email("آدرس ایمیل را درست وارد کنید !")
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
            render: (text, record, index) => `${record.FirstName} ${record.LastName}`,
            width: '7vw'
        },
        {
            title: 'شماره موبایل',
            dataIndex: 'MobileNo',
            key: 'mobileNo',
            render: text => (
                <Tag color="geekblue">{
                    text
                }</Tag>
            ),
            width: '5vw'
        },
        {
            title: 'آدرس ایمیل',
            dataIndex: 'Email',
            key: 'email',
            width: '7vw'
        },
        {
            title: 'نام کاربری',
            dataIndex: 'UserCode',
            key: 'userCode',
            width: '7vw'
        },
        {
            title: 'آدرس',
            dataIndex: 'Address',
            key: 'address',
            width: '7vw'
        }
    ];

    const [state, setState] = useState({
        usersList: [],
        usersListForGrid: [],
        currentUser: {},
        createUserInfoModal: false,
        userTypesList: [],
        userLogined: {}
    });

    const createDataModelForDataTabel = (data) => {
        return data.map(item => {
            return { ...item, key: item.ID }
        })
    }

    const loadUserTypesInfo = () => {
        userService.getUserTypes().then(response => {
            if (response.data.result) {
                setState(prevState => {
                    return {
                        ...prevState,
                        userTypesList: response.data.data
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

    const loadUsersInfo = () => {
        userService.getAllUsers()
            .then(response => {
                if (response.data.result) {
                    const data = response.data.data;
                    setState(prevState => {
                        return {
                            ...prevState,
                            usersList: data, usersListForGrid: createDataModelForDataTabel(data)
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
        loadUserTypesInfo();
        const user = auth.getCurrentUser();
        setState(prevState => {
            return {
                ...prevState,
                userLogined: user
            }
        })
    }, [])

    //#endregion ---------------------------------------------------------

    //#region Create User Info ----------------------------------------

    const handleCreateUserInfo = (record) => {
        setState(prevState => {
            return {
                ...prevState,
                currentUser: {}
            }
        });
        createUserInfoToggle();
    }

    const createUserInfoToggle = () => {
        setState(prevState => {
            return {
                ...prevState,
                createUserInfoModal: !prevState.createUserInfoModal
            }
        });
    }

    const handleSubmitCreateUserInfo = (values) => {
        const temp = _.pick(values, ["firstName", "lastName", "mobileNo", "userCode"]);
        let parameters = { ...temp, userType: 3, userCode: values.mobileNo, password: "", address: "", email: "" }
        if (state.userLogined.userType === "Admin") {
            parameters = { ...parameters, userType: values.userType.value }
        }
        //       console.log(parameters);
        userService.addNewUserInfoFull(parameters)
            .then(response => {
                if (response.data.result) {
                    loadUsersInfo();
                    createUserInfoToggle();
                    return toast.success("اطلاعات کاربر با موفقیت ثبت گردید")
                }
                else {
                    return toast.error("امکان اضافه کردن اطلاعات کاربر مقدور نیست");
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
                currentUser: {}
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
                            <Row className="d-flex justify-content-md-center">
                                <Col md="3">
                                    <button className="btn btn-warning rtl"
                                        style={{ direction: 'rtl', float: 'right' }}
                                        type="button"
                                        onClick={handleCreateUserInfo}>اضافه کردن اطلاعات کاربر</button>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <Table
                                        className={antdClass2}
                                        columns={Columns}
                                        dataSource={state.usersListForGrid}
                                        pagination={false}
                                        scroll={{ x: 'max-content', y: 600 }}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
            <Modal
                isOpen={state.createUserInfoModal}
                toggle={createUserInfoToggle}
                className={props.className + " customFont"}
                backdrop="static"
            // dir="rtl"
            >
                <ModalHeader toggle={createUserInfoToggle} className="customFont text-right">اضافه کردن اطلاعات کاربر</ModalHeader>
                <ModalBody className="text-center">
                    <Formik
                        initialValues={CreateUserInitialValues}
                        validationSchema={CreateUserValidationSchema}
                        onSubmit={async (values) => {
                            ////console.log("values", values);
                            await handleSubmitCreateUserInfo(values);
                        }}
                        validateOnBlur={true}
                        validateOnMount={true}
                        enableReinitialize
                    >
                        {(formik) => {
                            console.log("Formik props values", state.userLogined);

                            return (
                                <React.Fragment>
                                    <Form>
                                        <Row>
                                            <Col md="6">
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    className="rtl"
                                                    //placeholder="نام"
                                                    label="نام"
                                                />
                                            </Col>
                                            <Col md="6">
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    className="rtl"
                                                    //placeholder="نام خانوادگی"
                                                    label="نام خانوادگی"
                                                />
                                            </Col>

                                        </Row>
                                        <Row>
                                            {/* <Col md="6">
                                                <FormikControl
                                                    control="input"
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    className="ltr"
                                                    //placeholder="آدرس ایمیل"
                                                    label="آدرس ایمیل"
                                                />
                                            </Col> */}
                                            <Col md="12">
                                                <FormikControl
                                                    control="inputMaskDebounce"
                                                    mask="09999999999"
                                                    type="text"
                                                    name="mobileNo"
                                                    id="mobileNo"
                                                    className="ltr"
                                                    //placeholder="شماره موبایل"
                                                    label="شماره موبایل"
                                                />
                                            </Col>
                                        </Row>
                                        {state && state.userLogined.userType === "Admin" && <Row>
                                            <Col md="12">
                                                <FormikControl
                                                    control="customSelect"
                                                    name="userType"
                                                    options={state.userTypesList.map(c => {
                                                        return {
                                                            label: c.Name,
                                                            value: c.ID
                                                        }
                                                    })}
                                                    id="userType"
                                                    className="ltr"
                                                    //placeholder="کاربری"
                                                    classN="rtl"
                                                    label="کاربری"
                                                />
                                            </Col>
                                        </Row>}
                                        {/* <Row>
                                            <Col>
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    className="rtl"
                                                    //placeholder="آدرس"
                                                    label="آدرس"
                                                />
                                            </Col>
                                        </Row> */}
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
