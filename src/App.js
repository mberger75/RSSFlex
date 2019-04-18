import React, {Component} from 'react';
import Panel from './Panel';
import FLUX, {API} from './Flux';
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
        };
    }

    getFavicon(feed) {
        if(feed.image.trim() === '') {
            return `https://api.faviconkit.com/${feed.link.split('/')[2]}/144`;;
        }
        else {
            return feed.image;
        }
    }

    componentWillMount() {
        let promises = FLUX.map(url => fetch(API.url + url + API.key));

        Promise.all(promises)
        .then(results => Promise.all(results.map(res => res.json())))
        .then(datas => this.setState({datas: datas, isLoaded: true}))
        .catch(err => console.log(err));
    }

    componentDidMount() {
        setInterval(() => this.setState({time : getCurTime()}), 1000);
    }

    render() {
        const {isLoaded, datas, time} = this.state;

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
                    <button className="btnFlux addFlux" title="Add a new flux">+</button>
                </div>
            </header>
                <header className="button-tab">
                    <button className='btn'>DEV FRONTEND</button>
                    <button className='btn'>DEV BACKEND</button>
                    <button className='btn'>WEBDESIGN</button>
                    <button className='btn'>HIGH-TECH</button>
                    <button className='btn'>MOBILE</button>
                </header>
                <div className="panel-container frontend">
                {datas.map((el, id) => (
                    <Panel 
                        key={id}
                        favicon={this.getFavicon(el.feed)} 
                        title={el.feed.title} 
                        items={el.items}
                    />
                ))}
                </div>
            </div>
        )
    }
}

export default App;