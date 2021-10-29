import React, { useState } from "react";
import { Field } from "formik";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import plateNoPNG from '../../../assets/img/plateNo.png';
import ReactInputMask from "react-input-mask";
import _ from 'lodash';

const CustomPlate = (props) => {
    const {
        label,
        name,
        className,
    } = props;

    const [state, setState] = useState({
        firstPart: '',
        secondPart: '',
        thirdPart: '',
        forthPart: ''
    })
    const classN = className ? className : "ltr";
    const alphabetList = [
        {
            value: '1',
            label: 'الف'
        },
        {
            value: '2',
            label: 'ب'
        },
        {
            value: '3',
            label: 'پ'
        },
        {
            value: '4',
            label: 'ت'
        },
        {
            value: '5',
            label: 'ث'
        },
        {
            value: '6',
            label: 'ج'
        },
        {
            value: '7',
            label: 'چ'
        },
        {
            value: '7',
            label: 'ح'
        },
        {
            value: '8',
            label: 'خ'
        },
        {
            value: '9',
            label: 'د'
        },
        {
            value: '10',
            label: 'ذ'
        },
        {
            value: '11',
            label: 'ر'
        },
        {
            value: '12',
            label: 'ز'
        },
        {
            value: '13',
            label: 'ژ'
        },
        {
            value: '14',
            label: 'س'
        },
        {
            value: '15',
            label: 'ش'
        },
        {
            value: '16',
            label: 'ص'
        },
        {
            value: '17',
            label: 'ض'
        },
        {
            value: '18',
            label: 'ع'
        },
        {
            value: '19',
            label: 'غ'
        },
        {
            value: '20',
            label: 'ف'
        },
        {
            value: '21',
            label: 'ق'
        },
        {
            value: '22',
            label: 'ک'
        },
        {
            value: '23',
            label: 'گ'
        },
        {
            value: '24',
            label: 'ل'
        },
        {
            value: '25',
            label: 'م'
        },
        {
            value: '26',
            label: 'ن'
        },
        {
            value: '27',
            label: 'و'
        },
        {
            value: '28',
            label: 'ه'
        },
        {
            value: '29',
            label: 'ی'
        },
        {
            value: '30',
            label: 'ط'
        },
        {
            value: '31',
            label: 'ظ'
        }
    ]
    const handleChangeFirstPartPlateNo = (event, form) => {
        const temp = event.target.value.replaceAll('_', '')
        if (temp === "" || (temp !== "" && temp.length === 2)) {
            setState(preState => {
                return {
                    ...preState,
                    firstPart: temp
                }
            })

            form.setFieldValue(name, { ...state, firstPart: temp });
            if (props.onSelectedChanged) props.onSelectedChanged({ ...state, firstPart: temp });
        }
    }
    const handleChangeSecondPartPlateNo = (value, form) => {
        setState(preState => {
            return {
                ...preState,
                secondPart: value.label
            }
        })
        form.setFieldValue(name, { ...state, secondPart: value.label });
        if (props.onSelectedChanged) props.onSelectedChanged({ ...state, secondPart: value.label });

    }
    const handleChangeThirdPartPlateNo = (event, form) => {
        const temp = event.target.value.replaceAll('_', '')
        if (temp === "" || (temp !== "" && temp.length === 3)) {
            setState(preState => {
                return {
                    ...preState,
                    thirdPart: temp
                }
            })
            form.setFieldValue(name, { ...state, thirdPart: temp });
            if (props.onSelectedChanged) props.onSelectedChanged({ ...state, thirdPart: temp });
        }
    }
    const handleChangeForthPartPlateNo = (event, form) => {
        const temp = event.target.value.replaceAll('_', '')
        if (temp === "" || (temp !== "" && temp.length === 2)) {
            setState(preState => {
                return {
                    ...preState,
                    forthPart: temp
                }
            })
            form.setFieldValue(name, { ...state, forthPart: temp });
            if (props.onSelectedChanged) props.onSelectedChanged({ ...state, forthPart: temp });
        }
    }
    return (
        <header>
            <div className="head-text">
                <div className="head-image">
                    <img src={plateNoPNG} alt="plateNo" style={{ width: "100%", height: "100%" }} />
                </div>
                <div className="text-on-image" style={{ width: "100%", height: "100%",fontWeight: "bold", fontSize: "1.5rem", direction: "ltr" }}>
                    <FormGroup >
                       
                        <Field name={name}>
                            {(fieldProps) => {
                                const { form, meta } = fieldProps;
                                //console.log("Render props", props);
                                console.log(state)
                                return (
                                    <React.Fragment>
                                        <table style={{width:"100%",position:"absolute"}}>
                                            <tbody>
                                                <tr>
                                                     <td style={{paddingTop:"1.5vh", width: "10%", height: "100%"}}>
                                                        <ReactInputMask
                                                            type="text"
                                                            mask="99"
                                                            id="first"
                                                            onChange={(event) => handleChangeFirstPartPlateNo(event, form)}
                                                            placeholder="11"
                                                            onBlur={() => form.setFieldTouched(name, true)}
                                                            autocomplete="off"
                                                            className="form-control" 
                                                           style={{ width: "100%", height: "100%", marginBottom: "1%" }}
                                                        />
                                                    </td> 
                                                    <td style={{paddingTop:"1.2vh",width: "13%", height: "100%"}}>
                                                         <Select
                                                            style={{ width: "100%", height: "100%", marginBottom: "1rem"}}
                                                            // className="d-flex justify-content-md-center"
                                                            isMulti={false}
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            // defaultValue={selectedValue}
                                                            name="second"
                                                            options={alphabetList}
                                                            placeholder='الف'
                                                            onChange={(value) => handleChangeSecondPartPlateNo(value, form)}
                                                            onBlur={() => form.setFieldTouched(name, true)}
                                                        /> 
                                                    </td>
                                                    <td style={{paddingTop:"3.5vh",
                                                    width: "8%", 
                                                    height: "100%",marginRight:"10%"}}>
                                                        <ReactInputMask
                                                            type="text"
                                                            mask="999"
                                                            id="third"
                                                            onChange={(event) => handleChangeThirdPartPlateNo(event, form)}
                                                            placeholder="123"
                                                            className="form-control"
                                                            onBlur={() => form.setFieldTouched(name, true)}
                                                            autocomplete="off"
                                                            style={{ width: "100%", height: "100%", marginBottom: "1rem" }}
                                                        /> 
                                                    </td>
                                                    <td style={{paddingTop:"3.5vh", width: "10%", height: "100%",
                                                    paddingRight:"15%",
                                                    marginLeft:"10%"}}>
                                                        <ReactInputMask
                                                            type="text"
                                                            mask="99"
                                                            id="forth"
                                                            onChange={(event) => handleChangeForthPartPlateNo(event, form)}
                                                            placeholder="99"
                                                            className="form-control"
                                                            onBlur={() => form.setFieldTouched(name, true)}
                                                            autocomplete="off"
                                                            style={{ width: "100%", height: "100%", 
                                                            marginBottom: "1rem" }}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {meta.touched && meta.error ? (
                                            <div className="error">{meta.error}</div>
                                        ) : null}
                                    </React.Fragment>
                                );
                            }}
                        </Field>
                    </FormGroup>
                </div>
            </div>
        </header>


    );
};

export default CustomPlate;
