import React, { Component } from "react";
import { Label, Row, Col, FormGroup } from "reactstrap";
import plateNoPNG from '../../assets/img/plateNo.png';

class Plate extends Component {

    dict = {
        "1": "الف",
        "2": "ب",
        "3": "و"
    }

    constructor(props) {
        super(props);
        const data = this.props.plateNo.split("-");
        const first = this.props.plateNo.substring(0, 2);
        const seocnd = this.props.plateNo.substring(2, 3);
        const third = this.props.plateNo.substring(3, 6);
        const forth = this.props.plateNo.substring(6, 8);
        //console.log(data,first, seocnd, third, forth)
        this.state = {
            //plateNo: data,
            first:first,
            second:seocnd,
            third:third,
            forth:forth
        }
    }

    render() {

        return (

            <header>
                <div className="head-text">
                    <div className="head-image">
                        <img src={plateNoPNG} alt="plateNo" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="text-on-image" style={{ fontWeight: "bold", fontSize: "1.5vw", direction: "rtl",marginTop:"0.5rem" }}>
                        {/* <span className="ml-3">{this.state.plateNo[2]}</span>
                        <span className="ml-4">{this.state.plateNo[3]}</span>
                        <span className="ml-3">{this.dict[this.state.plateNo[1]]}</span>
                        <span>{this.state.plateNo[0]}</span> */}

                        <span className="ml-4">{this.state.third}</span>
                        <span className="ml-3">{this.state.forth}</span>
                        <span className="ml-3">{this.state.second}</span>
                        <span>{this.state.first}</span>
                    </div>
                </div>
            </header>

        );
    }
}

export default Plate;
