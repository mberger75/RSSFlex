import React, {Component} from 'react';
import {getCurTime, getSrcImg, a} from './utils';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            time: getCurTime('long'),
            viewWidth: 0,
            viewHeight: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateTime() {
        setInterval(() => {
            this.state.viewWidth > 700 ?
            this.setState({time : getCurTime('long')})
            :
            this.setState({time : getCurTime('short')})
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

    render() {
        const {title, slogan, clearSession} = this.props;
        const {time} = this.state;

        return (
            <header className="header-app">
                <div className="prez">
                    <h1>{title}</h1>
                    <p className="slogan">{slogan}</p>
                </div>
                <div className="current-time">{time}</div>
                <div className="icons">
                    <a 
                        href='https://twitter.com/Evodfeaea' 
                        title='Check my Twitter!' 
                        target={a.b} rel={a.r}
                    >
                        <img src={getSrcImg('twitter', 'png')} alt="Twitter" />
                    </a>
                    <a 
                        href='https://github.com/mberger75' 
                        title='Check my Github!' 
                        target={a.b} rel={a.r}
                    >
                        <img src={getSrcImg('github', 'png')} alt="Github" />
                    </a>
                    <img 
                        className="refresh" 
                        title="Clear session" 
                        src={getSrcImg('refresh', 'png')} 
                        onClick={clearSession}
                        alt="Clear session"
                    />
                </div>
            </header>
        )
    }
}

export default Header;