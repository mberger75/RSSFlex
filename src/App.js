import React, {Component} from 'react';
import Board from './Board';
import PANEL from './Panel';
import RSSParser from 'rss-parser';
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
            dataLen: 0,
            isEmpty: false,
            currentTab: 'FRONT',
            tabState: Object.keys(PANEL).map(key => PANEL[key].state),
            time: getCurTime(),
        };
    }

    getIcon(link) {
        const size = 144;
        const regex = /\.(com|net|org|fr|blog|info)\/?$/i;

        let url = regex.test(link.split('/')[2]) ? link.split('/')[2] : 'rss.com';

        return `https://api.faviconkit.com/${url}/${size}`;

    }

    getLength = datas => {
        let dataLen = 0;

        if (datas) {
            datas.map(el => el ? dataLen += el.items.length : dataLen);
        }
        else {
            dataLen = 0;
        }

        return dataLen;
    }

    fetchData() {
        let datas = [];
        let parser = new RSSParser();
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
        
        this.setState({isLoaded: false});

        if (PANEL[this.state.currentTab].flux.length <= 0) {
            return this.setState({isEmpty: true});
        }
        else {
            Promise.all(PANEL[this.state.currentTab].flux.map(url => {
                return parser.parseURL(CORS_PROXY + url, (err, feed) => {
                    if (err) return;
    
                    datas.push(feed);

                    return this.setState({
                        datas: datas,
                        isLoaded: true,
                        isEmpty: false,
                        dataLen: this.getLength(datas)
                    });
                });
            }));
        }
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
            dataLen: 0,
            isEmpty: false
        }, this.fetchData);
    }

    checkIfEmptyAndReturnVue(isEmpty, curTab) {
        let state = !isEmpty ? `Loading ${curTab} RSS feeds...` : `${curTab} doesn't have RSS feeds yet`;

        return <h1 className="loading">{state}</h1>
    }

    render() {
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
                {Object.keys(PANEL).map((key, id) => (
                    <button 
                        key={id}
                        className={`btn ${this.state.tabState[id]}`}
                        onClick={() => this.toggleTabOnClick(id, key)}
                    >
                        <span role='img' aria-label='emoji'>{PANEL[key].emoji}</span>&nbsp;{key}
                        {this.state.tabState[id] === 'active' ? 
                            <div className="dataLength">&nbsp;{this.state.dataLen}</div> 
                            : null}
                    </button>
                ))}
                </header>
                <div className={`board-container ${this.state.currentTab}`}>
                    {!this.state.isLoaded ? 
                        this.checkIfEmptyAndReturnVue(this.state.isEmpty, this.state.currentTab) 
                    :
                        this.state.datas.map((el, id) => (
                            el ? <Board 
                                    key={id} 
                                    id={id} 
                                    favicon={this.getIcon(el.link)} 
                                    title={el.title} 
                                    link={el.link} 
                                    items={el.items}
                                /> 
                            : <div key={id} className="board-error">({id}) RSS feed OFF</div>
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