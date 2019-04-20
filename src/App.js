import React, {Component} from 'react';
import Panel from './Panel';
import FLUX from './Flux';
import Parser from 'rss-parser';
import {getCurTime} from './utils';
import './App.css';
import './css/Responsive.css';
import './css/PanelScrollbar.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            datas: [],
            isLoaded: false,
            time: getCurTime(),
            currentTab: 'FRONT',
            tabState: Object.keys(FLUX).map(key => FLUX[key].state ? FLUX[key].state : FLUX[key].state = 'inactive'),
            dataLen: 0,
        };
    }

    getIcon(link) {

        let shortLink = link.split('/')[2];

        if (link) {
            return `https://api.faviconkit.com/${shortLink}/144`;
        }
        else {
            return `https://api.faviconkit.com/rss.com/144`;;
        }
    }

    getLength = datas => {
        let dataLen = 0;

        if (datas) {
            datas.map(el => el ? dataLen += el.items.length : dataLen);
        }

        return dataLen;
    }

    async fetchData() {
        let datas = [];
        let parser = new Parser({
            timeout: 1000,
            maxRedirects: 10,
        });
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        
        this.setState({isLoaded: false});

        await Promise.all(FLUX[this.state.currentTab].links.map(async url => {
            let feed = await parser.parseURL(CORS_PROXY + url);
            datas.push(feed);
            return this.setState({
                datas: datas,
                isLoaded: true,
                dataLen: this.getLength(datas)
            });
        }));

    }

    updateTime() {
        setInterval(() => this.setState({time : getCurTime()}), 500);
    }

    componentDidMount() {
        this.fetchData();
        this.updateTime();
    }

    toggleTabOnClick = (id, title) => {
        let sliced = this.state.tabState.slice();

        for (let i = 0; i < sliced.length; i++) {
            i === id ? sliced[i] = 'active' : sliced[i] = '';
        }

        this.setState({
            tabState: sliced,
            currentTab: title,
        }, this.fetchData);
    }

    render() {
        // console.log(this.state.datas)
        return (
            <div className="App">
                <header className="header-app">
                    <div className="prez">
                        <h1>RSSFlex</h1>
                        <p className="slogan">Simple dashboard</p>
                    </div>
                    <p className="current-time">{this.state.time}</p>
                </header>
                <header className="button-tab">
                {Object.keys(FLUX).map((key, id) => (
                    <button 
                        key={id}
                        className={`btn ${this.state.tabState[id]}`}
                        onClick={() => this.toggleTabOnClick(id, key)}
                    >
                        <span role='img' aria-label='emoji'>{FLUX[key].emoji}</span>&nbsp;{key}
                        {this.state.tabState[id] === 'active' ? 
                            <div className="dataLength">&nbsp;{this.state.dataLen}</div> 
                            : null}
                    </button>
                ))}
                </header>
                <div className={`panel-container ${this.state.currentTab}`}>
                    {!this.state.isLoaded ? <h1 className="loading">Loading...</h1> :
                        this.state.datas.map((el, id) => (
                            el ? 
                                <Panel 
                                    key={id} id={id} 
                                    favicon={this.getIcon(el.link)} 
                                    title={el.title} 
                                    link={el.link} 
                                    items={el.items}
                                /> 
                            : <div key={id} className="panel-error">FLUX({id}) HS</div>
                        ))}
                </div>
                <footer className="footer">
                    <a href="https://github.com/mberger75" target="_blank" rel="noopener noreferrer">
                        Développé par MB
                        <img src="https://bit.ly/2IuMMdr" alt="Github"></img>
                    </a>
                </footer>
            </div>
        )
    }
}

export default App;