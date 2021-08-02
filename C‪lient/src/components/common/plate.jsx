import React, { Component } from "react";
import { Label, Row, Col, FormGroup } from "reactstrap";
import plateNoPNG from '../../assets/img/plateNo.png';

class Plate extends Component {

    dict = {
        "1":"الف",
        "2":"ب",
        "3":"و"
    }

    constructor(props) {
        super(props);
        const data=this.props.plateNo.split("-");
        console.log(data)
        this.state={
            plateNo:data
        }
    }

    render() {

        return (

            <header>
                <div className="head-text">
                    <div className="head-image">
                        <img src={plateNoPNG} alt="plateNo" style={{width:"100%",height:"100%"}}/>
                    </div>
                    <div className="text-on-image" style={{fontWeight:"bold",fontSize:"3.3rem" ,direction:"rtl"}}>
                        <span className="ml-3">{this.state.plateNo[2]}</span>
                        <span className="ml-4">{this.state.plateNo[3]}</span>
                        <span className="ml-3">{this.dict[this.state.plateNo[1]]}</span>
                        <span>{this.state.plateNo[0]}</span>
                    </div>
                </div>
            </header>

        );
    }
}

export default Plate;
