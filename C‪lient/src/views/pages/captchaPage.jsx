import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import _ from "lodash";
import { getCaptcha } from "../../services/svgCaptcha";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

class CaptchaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      waiting: false,
    };
  }

  componentDidMount = () => {
    getCaptcha().then(({ data }) => {
      console.log(data);
      if (data.result === true) {
        this.setState({ image: data.data[0]["captchaImage"], waiting: true });
        // this.setState({waiting:true})
        this.props.onCaptchaDataChange(data.data[0]);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps,this.props.defaultValue)
    if (nextProps.reloadCatpcha) this.handleCaptchaChange();
  }

  handleCaptchaChange = () => {
    this.setState({ waiting: false });
    getCaptcha().then(({ data }) => {
      console.log(data);
      if (data.result === true) {
        this.setState({ image: data.data[0]["captchaImage"], waiting: true });
        this.props.onCaptchaDataChange(data.data[0]);
      }
    });
  };

  render() {
    const buff = new Buffer(this.state.image);
    const base64data = buff.toString("base64");
    return (
      <Row>
        <Col md="12" className=" justify-content-md-center">
          <img 
          width = "130vw"
            src={`data:image/svg+xml;base64,${base64data}`}
            alt=""
            style={{ backgroundColor: "rgba(50, 40, 255, 0.400)",border:"1px solid rgba(50, 40, 255, 0.400)",borderRadius:"10px" }}
            onClick={this.handleCaptchaChange}
          />
        </Col>
        {/* <Col
          md="6"
          className="d-flex align-items-center justify-content-center"
        >
          {this.state.waiting && (
            <CountdownCircleTimer
              size={60}
              isPlaying
              duration={30}
              colors={[
                ["#004777", 0.33],
                ["#F7B801", 0.33],
                ["#A30000", 0.33],
              ]}
              onComplete={this.handleCaptchaChange}
            >
              {({ remainingTime }) => {
                return (
                  <div className="timer">
                   <div className="text">Remaining</div> 
                    <div className="value">{remainingTime}</div>

                     <div className="text">seconds</div> 
                  </div>
                );
              }}
            </CountdownCircleTimer>
          )}
        </Col> */}
      </Row>
    );
  }
}

export default CaptchaPage;
