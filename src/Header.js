import React, {Component} from 'react';
import {Time} from './Utils';

class Header extends Component {
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

    icon(conf) {    
        return (
            <a 
                href={conf.href}
                title={conf.title}
                target="_blank" rel="noopener noreferrer"
            >
                <span className={"sprite " + conf.title}></span>
            </a>
        )
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

    render() {
        const {clearSession} = this.props;
        const {time} = this.state;

        return (
            <header className="header-app">
                <div className="prez" title="🎲">
                    <a href="https://rssflex.netlify.com/">
                        <span className="sprite logo"></span>
                    </a>
                    <h1 title="RSSFlex">RSSFlex</h1>
                </div>
                <div className="current-time">{time}</div>
                <div className="icons">
                    {this.icon({title: 'Website', href: 'https://bergermarc.com'})}
                    {this.icon({title: 'Twitter', href: 'https://twitter.com/Evodfeaea'})}
                    {this.icon({title: 'Github', href: 'https://github.com/mberger75'})}
                    <span 
                        className="sprite refresh" 
                        title="Clear session" 
                        onClick={clearSession}
                    >
                    </span>
                </div>
            </header>
        )
    }
}

export default Header;