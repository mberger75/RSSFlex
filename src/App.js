// Modules
import React from 'react';
import Parser from 'rss-parser';
import __PANEL from './Panel';

// Components
import Header from './component/Header';
import Board from './component/Board';
import ButtonToTop from './component/ButtonToTop';
import Loading from './component/loading';

// Stylesheet / img
import './App.css';
import './component/Responsive.css';
import rssIcon from './img/rssIcon.png';

class App extends React.Component {

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

    async fetchData() {
        this.setState({ isLoaded: false });
        const { currentTab } = this.state;
        const parser = new Parser();
        const limit = arr => len => arr.length >= len ? arr.slice(0, len) : arr;

        const result = await new Promise(res => {
            const result = [];

            __PANEL[currentTab].flux.forEach(async url => {
                const feed = await parser.parseURL(`https://cors-anywhere.herokuapp.com/${url}`);
                const { description, image, items, link, title } = feed;

                result.push({
                    description, link, title,
                    image: image ? image.url : rssIcon,
                    items: limit(items)(20),
                });

                this.setState({ totalItemsLen: this.getTotalItemsLen(result) });
            });

            const duration = 300 * __PANEL[currentTab].flux.length;
            setTimeout(() => res(result), duration);
            console.log(currentTab, duration + 'ms');
        });

        this.setState(
            { datas: result, isLoaded: true },
            sessionStorage.setItem(currentTab, JSON.stringify(result))
        );
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
        const { isLoaded, datas, totalItemsLen, currentTab, tabState } = this.state;

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
                <ButtonToTop boardContainerRef={this.boardContainerRef}/>
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