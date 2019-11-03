import React from 'react';
import { Time } from '../Utils';

import './Header.css';
import logo from '../img/logo.png';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            time: Time.now(),
            viewWidth: 0,
            viewHeight: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateTime() {
        setInterval(() => {
            return this.setState({time : Time.now()})
        }, 500);
    }

    updateWindowDimensions() {
        this.setState({
            viewWidth: window.innerWidth,
            viewHeight: window.innerHeight
        });
    }

    componentDidMount() {
        this.updateTime();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    clearSession = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    render() {
        const { time } = this.state;

        return (
            <header className="header-app">
                <div className="prez" title="🎲">
                    <a href="https://rssflex.netlify.com/">
                        <img className="sprite logo" src={logo} alt="" />
                    </a>
                    <h1 title="RSSFlex">RSSFlex</h1>
                </div>
                <div className="current-time">{time}</div>
                <div className="nav">
                    <span className="refresh" onClick={this.clearSession} role="img" aria-label="Emoji Refresh">🔄</span>
                </div>
            </header>
        )
    }
}

export default Header;