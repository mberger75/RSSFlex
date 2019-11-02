// Modules
import React, {Component} from 'react';
import Parser from 'rss-parser';
import __PANEL from './Panel';

// Components
import Header from './Header';
import Board from './Board';
import ScrollTop from './ScrollTop';
import Loading from './loading';

// Stylesheet / img
import './App.css';
import './css/Responsive.css';
import './css/PanelScrollbar.css';
import rssIcon from './img/rssIcon.png';

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
            datas.forEach(el => el ? dataLen += el.items.length : dataLen);
        }
        return dataLen;
    }

    fetchFromStorage() {
        let sessionDatas = JSON.parse(sessionStorage.getItem(this.state.currentTab));

        this.setState({
            datas: sessionDatas,
            isLoaded: true,
            totalItemsLen: this.getTotalItemsLen(sessionDatas)
        });
    }

    fetchData() {
        const { currentTab } = this.state;
        const parser = new Parser();
        const result = [];
        const articleByFeed = 9;

        __PANEL[currentTab].flux.forEach(url => {
            parser.parseURL(`https://cors-anywhere.herokuapp.com/${url}`, (err, feed) => {
                if (err) return console.log(err);

                result.push({
                    description: feed.description,
                    image: feed.image ? feed.image.url : rssIcon,
                    items: feed.items.slice(0, articleByFeed),
                    link: feed.link,
                    title: feed.title,
                });

                this.setState({
                    isLoaded: false,
                    totalItemsLen: this.getTotalItemsLen(result)
                });
            });

            setTimeout(() => {
                this.setState({ datas: result, isLoaded: true },
                sessionStorage.setItem(currentTab, JSON.stringify(result)));
            }, 2000);
        });
    }

    findData() {
        if(sessionStorage.getItem(this.state.currentTab) !== null)
            return this.fetchFromStorage();
        this.fetchData();
    }

    toggleClick = (id, title) => {
        const { tabState } = this.state;
        const sliced = tabState.slice();

        for (let i = 0; i < sliced.length; i++) {
            i === id ? sliced[i] = 'active' : sliced[i] = '';
        }

        this.setState({
            tabState: sliced,
            currentTab: title,
            totalItemsLen: 0,
            isScrolled: false,
            isLoaded: false
        }, this.findData);
    }

    clearSession = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    componentDidMount() {
        this.findData();
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
                <ResponsiveNav tabState={tabState} isLoaded={isLoaded} toggleClick={this.toggleClick}/>
                <div className={`board-container ${currentTab}`} ref={this.boardContainerRef}>
                    <div className="boardContainerTitle">
                        <h2>{currentTab}</h2>
                        <span>{`${totalItemsLen} articles`}</span>
                    </div>
                    {!isLoaded ? <Loading />
                    : datas.map((el, id) => <Board key={id} id={id} feed={el}/>)}
                </div>
                <ScrollTop boardContainerRef={this.boardContainerRef}/>
            </div>
        )
    }
}

const ResponsiveNav = ({ tabState, isLoaded, toggleClick }) => {

    const fadeOut = { opacity: .5, cursor: 'not-allowed' };
    const fadeIn = { opacity: 1, transition: '.3s' };

    return (
        <div className="button-tab">
            {Object.keys(__PANEL).map((key, id) => (
                <button 
                    key={id}
                    className={`btn ${tabState[id]}`}
                    title={key}
                    onClick={() => isLoaded && toggleClick(id, key)}
                    style={!isLoaded ? fadeOut : fadeIn}
                >
                    <span className="tab-emoji" role="img" aria-label="Emoji">{__PANEL[key].emoji}</span>
                    <span className="tab-name">{key}</span>
                </button>
            ))}
        </div>
    );
}

export default App;