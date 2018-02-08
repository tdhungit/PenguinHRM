import React, {Component} from 'react';
import {
    Row,
    Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
import Countdown from 'react-countdown-now';

class Index extends Component {
    render() {
        return (
            <div className="index-Index">
                <div className="agile-main-grid">
                    <div className="left-grid text-center change-bg">
                        <div className="center-container">
                            <img src="images/1.png" alt=""/>
                            <h1 className="title-head-w3l text-center">Penguin HRM</h1>
                            <h2>HRM</h2>
                            <span>Open Source</span>

                            <div className="content2">
                                <ul>
                                    <li>
                                        <Link to="/login" className="book popup-with-zoom-anim">Login to Backend</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="wthree-right-grid">
                        <h3 className="txt text-center">the wait is almost over</h3>
                        <div className="countdown">
                            <Countdown
                                date={Date.now() + 6000000000}
                                renderer={renderer}
                            />
                        </div>
                        <div className="clear"></div>
                        <div className="img-grid">
                            <div className="img-txt">
                                <h4>let your imagination flow</h4>
                                <h5 className="txt">We"ll be Launching Soon!</h5>
                                <p> subscribe to be notified.</p>
                            </div>
                            <div className="img-left">
                                <img src="images/2.png" alt=""/>
                            </div>
                        </div>
                        <div className="agileits-copyright text-center">
                            <p>© 2018 &nbsp;Jacky. All rights reserved.| Design by
                                <a href="http://w3layouts.com/">W3layouts</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Complete
const Completionist = () => <h1 className="txt text-center">Welcome to Penguin HRM!</h1>;

// Renderer callback with condition
const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
        // Render a completed state
        return <Completionist/>;
    } else {
        // Render a countdown
        return (
            <Row>
                <Col md="3">
                    <div className="countdown-text">
                        <h3 className="txt text-center">
                            {days}
                            <span>{days == 1 ? 'day' : 'days'}</span>
                        </h3>
                    </div>
                </Col>
                <Col md="3">
                    <div className="countdown-text">
                        <h3 className="txt text-center">
                            {hours}
                            <span>{hours == 1 ? 'hour' : 'hours'}</span>
                        </h3>
                    </div>
                </Col>
                <Col md="3">
                    <div className="countdown-text">
                        <h3 className="txt text-center">
                            {minutes}
                            <span>{minutes == 1 ? 'minute' : 'minutes'}</span>
                        </h3>
                    </div>
                </Col>
                <Col md="3">
                    <div className="countdown-text">
                        <h3 className="txt text-center">
                            {seconds}
                            <span>{seconds == 1 ? 'second' : 'seconds'}</span>
                        </h3>
                    </div>
                </Col>
            </Row>
        );
    }
};

export default  Index;