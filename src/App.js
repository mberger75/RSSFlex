import React, {Component} from 'react';
import Panel from './Panel';
import FLUX, {API} from './Flux';
import Tab, {tabList} from './Tab';
import {getCurTime} from './utils';
import './App.css';
import './PanelScrollbar.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            datas: [],
            isLoaded: false,
            time: getCurTime(),
            tabState: tabList.map(el => el.state),
        };
    }

    getFavicon(feed) {
        let shortUrl = feed.link.split('/')[2];

        if(feed.image.trim() === '') {
            return `https://api.faviconkit.com/${shortUrl}/144`;;
        }
        else {
            return feed.image;
        }
    }

    componentWillMount() {
        let promises = FLUX.map(url => {
            return fetch(API.url + encodeURIComponent(url) + API.key)
        });

        Promise.all(promises)
        .then(results => Promise.all(results.map(res => res.json())))
        .then(datas => this.setState({datas: datas, isLoaded: true}))
        .catch(err => console.log(err));
    }

    componentDidMount() {
        setInterval(() => this.setState({time : getCurTime()}), 1000);
    }

    toggleTabOnClick = (id) => {        
        let sliced = this.state.tabState.slice();

        for (let i = 0; i < sliced.length; i++) {
            i === id ? sliced[i] = 'active' : sliced[i] = 'inactive'
        }
        return this.setState({tabState: sliced});
    }

    switchPanelOnClick(title) {
        console.log(title)
        return true;
    }

    render() {
        const {isLoaded, datas, time, tabState} = this.state;

        if (!isLoaded) return <h1 className="loading">Loading...</h1>

        return (
            <div className="App">
            <header className="header-app">
                <div className="prez">
                    <h1>RSSFlex</h1>
                    <p className="slogan">Simple dashboard</p>
                </div>
                <p className="current-time">{time}</p>
                <div className="addFlux-container">
                    <button className="btnFlux addFlux" title="Add a new flux">
                        +
                    </button>
                </div>
            </header>
                <header className="button-tab">
                {tabList.map((tab, id) => (
                    <Tab 
                        key={id}
                        id={id}
                        state={tabState[id]}
                        emoji={tab.emoji}
                        title={tab.title}
                        toggle={this.toggleTabOnClick}
                        switchPan={this.switchPanelOnClick}
                    />
                ))}
                </header>
                <div className={"panel-container " + tabList[0].title}>
                    {datas.map((el, id) => (
                        <Panel
                            key={id}
                            favicon={this.getFavicon(el.feed)}
                            title={el.feed.title}
                            link={el.feed.link}
                            items={el.items}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default App;