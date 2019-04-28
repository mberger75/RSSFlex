import React, {Component} from 'react';
import Utils, {Time} from './Utils';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            time: Time.now('long'),
            viewWidth: 0,
            viewHeight: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateTime() {
        setInterval(() => {
            if (this.state.viewWidth > 700) {
                return this.setState({time : Time.now('long')})
            }
            else {
                return this.setState({time : Time.now('short')})
            }
        }, 500);
    }

    changeTheme() {
        let colors = ['#02ad02', '#8282ee', '#3fe5e5', '#8b0000', '#002900', '#ff69b4'];
        let color = colors[Math.floor(Math.random() * colors.length)]

        return document.body.style = `background-color: ${color}`;
    }

    getIcon(conf) {
        let title = conf.name.charAt(0).toUpperCase() + conf.name.slice(1);
    
        return (
            <a 
                href={conf.href}
                title={title}
                target="_blank" rel="noopener noreferrer"
            >
                <img 
                    src={Utils.getSrcImg(conf.name, 'png')} 
                    alt={title}
                />
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
        const {title, slogan, clearSession} = this.props;
        const {time} = this.state;

        return (
            <header className="header-app">
                <div className="prez" title="🎲" onClick={() => this.changeTheme()}>
                    <h1>{title}</h1>
                    <p className="slogan">{slogan}</p>
                </div>
                <div className="current-time">{time}</div>
                <div className="icons">
                    {this.getIcon({name: 'website', href: 'https://bergermarc.com'})}
                    {this.getIcon({name: 'twitter', href: 'https://twitter.com/Evodfeaea'})}
                    {this.getIcon({name: 'github', href: 'https://github.com/mberger75'})}
                    <img 
                        className="refresh" 
                        title="Clear session" 
                        src={Utils.getSrcImg('refresh', 'png')} 
                        onClick={clearSession}
                        alt="Clear session"
                    />
                </div>
            </header>
        )
    }
}

export default Header;