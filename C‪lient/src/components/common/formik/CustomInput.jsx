import React, { Component, useState, useCallback, useEffect } from "react";
import ReactInputMask from "react-input-mask";
import _ from "lodash";
import { Field } from "formik";
import { FormGroup, Label } from "reactstrap";

const CustomInput = (props) => {
  const [state, setState] = useState({
    value: props.defaultValue,
    defaultDebounceTime:
      props.debounceTime && props.debounceTime !== 0 ? props.debounceTime : 0,
    mask: props.mask,
  });

  useEffect(() => {
    console.log(props.defaultValue)
    setState(prevState =>{
      return{
        ...prevState,
        value:props.defaultValue
      }
    })
  }, [props.defaultValue])

  const onChange = (e, form) => {
    e.persist();
    if (e.target)
    // if (
    //   _(e.target.value).replace("_", "").length === state.mask.length ||
    //   _(e.target.value).replace("_", "").length === 0
    // ) 
    {
      console.log("onChange", e);

      const debounceFunction = _.debounce(() => {
      
        if (state.mask !== "" && state.mask.length > 0) {
          if (
            _(e.target.value).replace("_", "").length === state.mask.length ||
            _(e.target.value).replace("_", "").length === 0
          ) {
            form.setFieldValue(
              props.name,
              props.toUppercase ? _(e.target.value).toUpper() : e.target.value
            );
            if (props.onChange) props.onChange(e.target.value);
          }
        } else {
          form.setFieldValue(
            props.name,
            props.toUppercase ? _(e.target.value).toUpper() : e.target.value
          );
          if (props.onChange) props.onChange(e.target.value);
        }
      }, 0);

      debounceFunction();
    }
  };

  const { type, label, name, className, placeholder } = props;
  const classN = "form-control " + className;
  const defalutType = type ? type : "text";

  return (
    <FormGroup>
      {label !== null && label !== "" && <Label for={name}>{label}</Label>}
      <Field name={name}>
        {(Fieldprops) => {
          const { form, meta } = Fieldprops;
          return (
            <div>
              <ReactInputMask
                mask={state.mask}
                //defaultValue={state.value}
                id={name}
                type={defalutType}
                onBlur={() => form.setFieldTouched(name, true)}
                onChange={(e) => onChange(e, form)}
                placeholder={placeholder}
                className={classN}
                autoComplete="off"
              />
              {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
              ) : null}
            </div>
          );
        }}
      </Field>
    </FormGroup>
  );
};

export default CustomInput;
