import React, { useEffect, useState } from "react";
import { Row, Col, Button, FormGroup, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { toast } from 'react-toastify';
import { Table, Tag } from 'antd';
import antdClass2 from "../../assets/css/vendors/customAntdTable.css";
import _ from 'lodash';
import * as carService from '../../services/carService';
import { Formik, Form } from "formik";
import FormikControl from "../../components/common/formik/FormikControl";
import * as Yup from 'yup';

toast.configure({ bodyClassName: "customFont" });

const CarPage = (props) => {

    //#region cars and Initial Functions -----------------------------------------

    const CreateCarInitialValues = {
        brand: '',
        color: '',
        name: ''
    }

    const CreateCarValidationSchema = Yup.object({
        name: Yup.string().required("!نام خودرو را وارد کنید"),
        brand: Yup.string().required(" !برند خودرو را وارد کنید"),
        color: Yup.string().required("!رنگ خودرو را وارد کنید")
    });

    const Columns = [
        {
            title: 'ردیف',
            key: 'index',
            render: (text, record, index) => index,
            width: '1vw'
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
            render: text => (
                <Tag color="geekblue">{
                    text
                }</Tag>
            ),
            width: '5vw'
        },
        {
            title: 'رنگ',
            dataIndex: 'Color',
            key: 'color',
            width: '7vw'
        },
    ];

    const [state, setState] = useState({
        gpsTypesList: [{ label: "Type 0", value: 0 }, { label: "Type 1", value: 1 }],
        carsList: [],
        carsListForGrid: [],
        currentCar: {},
        createCarInfoModal: false
    });

    const createDataModelForDataTabel = (data) => {
        return data.map(item => {
            return { ...item, key: item.id }
        })
    }

    const loadCarInfo = () => {
        carService.getAllCars()
        .then(response => {
            if (response.data.result) {
                const data = response.data.data;
                setState(prevState => {
                    return {
                        ...prevState,
                        carsList: data, carsListForGrid: createDataModelForDataTabel(data)
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
        loadCarInfo();
    }, [])

    //#endregion ---------------------------------------------------------

    //#region Create Vehicle Info ----------------------------------------

    const handleCreateCarInfo = (record) => {
        setState(prevState => {
            return {
                ...prevState,
                currentCar: {}
            }
        });
        createCarInfoToggle();
    }

    const createCarInfoToggle = () => {
        setState(prevState => {
            return {
                ...prevState,
                createCarInfoModal: !prevState.createCarInfoModal
            }
        });
    }

    const handleSubmitCreateCarInfo = (values) => {

        carService.addNewCarInfo(_.pick(values, ["name", "brand", "color"]))
            .then(response => {
                if (response.data.result) {

                    loadCarInfo();
                    createCarInfoToggle();
                    return toast.success("اطلاعات خودرو با موفقیت ثبت گردید")
                }
                else {
                    return toast.error("امکان اضافه کردن اطلاعات خودرو مقدور نیست");
                }
            })
            .catch(error => {
                //console.log(error.message);
            })
    }

    const handleCancelCreateCarInfo = () => {
        setState(prevState => {
            return {
                ...prevState,
                currentCar: {}
            }
        });
        createCarInfoToggle();
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
                                        onClick={handleCreateCarInfo}>اضافه کردن اطلاعات خودرو</button>
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="12">
                                    <Table
                                        className={antdClass2}
                                        columns={Columns}
                                        dataSource={state.carsListForGrid}
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
                isOpen={state.createCarInfoModal}
                toggle={createCarInfoToggle}
                className={props.className + " customFont"}
                backdrop="static"
            // dir="rtl"
            >
                <ModalHeader toggle={createCarInfoToggle} className="customFont text-right">اضافه کردن اطلاعات خودرو</ModalHeader>
                <ModalBody className="text-center">
                    <Formik
                        initialValues={CreateCarInitialValues}
                        validationSchema={CreateCarValidationSchema}
                        onSubmit={async (values) => {
                            ////console.log("values", values);
                            await handleSubmitCreateCarInfo(values);
                        }}
                        validateOnBlur={true}
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
                                                    name="name"
                                                    id="name"
                                                    className="rtl"
                                                    placeholder="نام خودرو"
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormikControl
                                                    control="input"
                                                    type="text"
                                                    name="brand"
                                                    id="brand"
                                                    className="rtl"
                                                    placeholder="برند خودرو"
                                                />
                                            </Col>
                                        </Row>
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
                                        <div className="form-actions center">
                                            <Button color="primary" type="submit" className="mr-1" disabled={!formik.isValid}>
                                                {/* <LogIn size={16} color="#FFF" />  */}
                                                Save
                                            </Button>
                                            <Button color="secondary" type="button" onClick={handleCancelCreateCarInfo}>
                                                Cancel
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

export default CarPage;
