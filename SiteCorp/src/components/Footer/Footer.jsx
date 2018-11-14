import React, { Component } from 'react';

class Footer extends Component {
    render(){
        return (
            <footer className={"footer" + (this.props.transparent !== undefined ? " footer-transparent":"")}>
                <div className={"container" + (this.props.fluid !== undefined ? "-fluid":"")}>
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="#/dashboard">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#2">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="#3">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#4">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <p className="copyright pull-right">
                        &copy; {1900 + (new Date()).getYear()}
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;
