// Modules
import React, {Component} from 'react';
import Parser from 'rss-parser';
import __PANEL from './Panel';
import Utils from './Utils';

// Components
import Header from './Header';
import Board from './Board';
import ScrollTop from './ScrollTop';

// Stylesheet
import './App.css';
import './css/Responsive.css';
import './css/PanelScrollbar.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            isLoaded: false,
            totalItemsLen: 0,
            currentTab: 'DEV',
            tabState: Object.keys(__PANEL).map(key => __PANEL[key].state ? __PANEL[key].state : ''),
        };
        this.boardContainerRef = React.createRef();
    }

    getTotalItemsLen(datas) {
        let dataLen = 0;

        if (datas) {
            datas.map(el => el ? dataLen += el.items.length : dataLen);
        }
        return dataLen;
    }

    checkSessionStorage() {
        if (sessionStorage.getItem(this.state.currentTab)) {
            let sessionDatas = JSON.parse(sessionStorage.getItem(this.state.currentTab));
            this.setState({
                datas: sessionDatas,
                isLoaded: true,
                totalItemsLen: this.getTotalItemsLen(sessionDatas)
            });
            return true;
        }
        return false;
    }

    fetchData() {
        let datasParsed = [];
        let parser = new Parser();
        let flux = __PANEL[this.state.currentTab].flux;

        if(!this.checkSessionStorage()) {
            Promise.all(flux.map(url => {
                return parser.parseURL(Utils.cors(url), (err, feed) => {
                    if (err) return;
                    
                    let result = {
                        description: feed.description,
                        image: feed.image,
                        items: feed.items.slice(0, 5),
                        link: feed.link,
                        title: feed.title
                    };

                    datasParsed.push(result);

                    return this.setState({
                        datas: datasParsed,
                        isLoaded: true,
                        totalItemsLen: this.getTotalItemsLen(datasParsed)
                    },
                        sessionStorage.setItem(
                            this.state.currentTab, 
                            JSON.stringify(datasParsed)
                        )
                    );
                });
            }));
        }
    }

    toggleClick = (id, title) => {
        let sliced = this.state.tabState.slice();

        for (let i = 0; i < sliced.length; i++) {
            i === id ? sliced[i] = 'active' : sliced[i] = '';
        }

        if (!this.state.isLoaded) return;
            
        return this.setState({
                tabState: sliced,
                currentTab: title,
                totalItemsLen: 0,
                isScrolled: false
            }, this.fetchData);
    }

    clearSession = () => {
        sessionStorage.clear();
        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const {
            isLoaded, 
            datas, 
            totalItemsLen, 
            currentTab, 
            tabState, 
        } = this.state;
    
        return (
            <div className="App">
                <Header clearSession={this.clearSession}/>

                <div className="button-tab">
                {Object.keys(__PANEL).map((key, id) => (
                    <button key={id} className={`btn ${tabState[id]}`} title={key} onClick={() => this.toggleClick(id, key)}>
                        <span className="tab-emoji" role="img" aria-label="Emoji">{__PANEL[key].emoji}</span>
                        <span className="tab-name">{key}</span>
                    </button>
                ))}
                </div>
                <div className={`board-container ${currentTab}`} ref={this.boardContainerRef}>
                    <div className="boardContainerTitle">
                        <h2>{currentTab}</h2>
                        <span>{`${totalItemsLen} articles`}</span>
                    </div>
                    {!isLoaded ? <h1 className="loading">{`Loading ${currentTab} RSS feeds...`}</h1>
                    : datas.map((el, id) => <Board key={id} id={id} feed={el}/>)}
                </div>
                <ScrollTop boardContainerRef={this.boardContainerRef}/>
            </div>
        )
    }
}

export default App;