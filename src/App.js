import React, {Component} from 'react';
import Panel from './Panel';
import FLUX, {API} from './Flux';
import {getCurTime} from './utils';
import './App.css';
import './Responsive.css';
import './PanelScrollbar.css';

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

    getIcon(feed) {
        if (feed) {
            let shortUrl = feed.link.split('/')[2];
    
            if(feed.image.trim() === '') {
                return `https://api.faviconkit.com/${shortUrl}/144`;
            }
            else {
                return feed.image;
            }
        }
        else {
            return `https://api.faviconkit.com/rss.com/144`;
        }
    }

    getItemArrLength = (datas) => {
        let dataLen = 0;
        datas.map(el => dataLen += el.items.length);
        return dataLen;
    }

    fetchData() {
        let promises = FLUX[this.state.currentTab].url.map(url => {
            return fetch(API.url + encodeURIComponent(url) + API.key)
        });

        Promise.all(promises)
        .then(results => Promise.all(results.map(res => res.json())))
        .then(datas => this.setState({
            datas: datas, 
            isLoaded: true, 
            dataLen: this.getItemArrLength(datas)
        }))
        .catch(err => console.log(err));
    }

    updateTime() {
        setInterval(() => this.setState({time : getCurTime()}), 1000);
    }

    componentDidMount() {
        this.fetchData(this.state.currentTab);
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
                        {this.state.tabState[id] === 'active' ? <div className="dataLength">&nbsp;{this.state.dataLen}</div> : null}
                    </button>
                ))}
                </header>
                <div className={`panel-container ${this.state.currentTab}`}>
                    {!this.state.isLoaded ? <h1 className="loading">Loading...</h1> :
                        this.state.datas.map((el, id) => <Panel key={id} id={id} favicon={this.getIcon(el.feed)} title={el.feed.title} link={el.feed.link} items={el.items}/>)}
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