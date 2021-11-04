import React from "react";
import { Row, Col, Form } from 'reactstrap';
import "../../../assets/css/vendors/customPlateReading.css";


class Plate extends React.Component {

    constructor(props) {
        super(props);
        const first = this.props.plateNo.substring(0, 2);
        const seocnd = this.props.plateNo.substring(2, 3);
        const third = this.props.plateNo.substring(3, 6);
        const forth = this.props.plateNo.substring(6, 8);
        //console.log(data,first, seocnd, third, forth)
        this.state = {
            first: first,
            second: seocnd,
            third: third,
            forth: forth
        }
    }
    render() {
        return (
            <div id="bodyPlate">
                <div className="customFont">
                    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@600&family=Markazi+Text:wght@600&display=swap"
                     rel="stylesheet" />
                    <div className="containerPlate">
                        <div className="license-plate">
                            <div className="blue-column">
                                <div className="flag">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="text">
                                    <div>I.R.</div>
                                    <div>IRAN</div>
                                </div>
                            </div>

                            <span className="customFont">
                                {/* ۲۶ */} {this.state.first}
                            </span>
                            <span className="alphabet-column customFont">
                                {/* ی */} {this.state.second}
                            </span>
                            <span className="customFont">
                                {/* ۸۳۷ */} {this.state.third}
                            </span>
                            <div className="iran-column customFont">
                                <span>ایــران</span>
                                <strong>
                                    {/* ۲۰ */} {this.state.forth}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Plate;
