import React, {Component} from 'react';
import Utils from './Utils';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            time: Utils.getCurTime('long'),
            viewWidth: 0,
            viewHeight: 0,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateTime() {
        setInterval(() => {
            this.state.viewWidth > 700 ?
            this.setState({time : Utils.getCurTime('long')})
            :
            this.setState({time : Utils.getCurTime('short')})
        }, 500);
    }

    changeTheme() {
        let color = `#${((1<<24) * Math.random() | 0).toString(16)}`;

        return document.body.style = `background-color: ${color}`;
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
                    <a 
                        href='https://twitter.com/Evodfeaea' 
                        title='Check my Twitter!' 
                        target="_blank" rel="noopener noreferrer"
                    >
                        <img src={Utils.getSrcImg('twitter', 'png')} alt="Twitter" />
                    </a>
                    <a 
                        href='https://github.com/mberger75' 
                        title='Check my Github!' 
                        target="_blank" rel="noopener noreferrer"
                    >
                        <img src={Utils.getSrcImg('github', 'png')} alt="Github" />
                    </a>
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