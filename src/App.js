// Modules
import React from 'react';
import Parser from 'rss-parser';
import MY_FEED from './MY_FEED';

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
            tabLen: 0,
            curTab: 'DEV',
        };
        this.boardRef = React.createRef();
    }

    getTabLen(datas) {
        let dataLen = 0;

        if (datas) {
            datas.forEach(el => el ? dataLen += el.items.length : dataLen);
        }
        return dataLen;
    }

    fetchFromStorage() {
        let sessionDatas = JSON.parse(sessionStorage.getItem(this.state.curTab));

        this.setState({
            datas: sessionDatas,
            isLoaded: true,
            tabLen: this.getTabLen(sessionDatas)
        });
    }

    async fetchData() {
        this.setState({ isLoaded: false });

        const { curTab } = this.state;
        const parser = new Parser();
        const CORS = 'https://cors-anywhere.herokuapp.com';
        const limit = arr => len => arr.length >= len ? arr.slice(0, len) : arr;

        const result = await new Promise(res => {
            const result = [];

            MY_FEED[curTab].flux.forEach(async url => {
                const feed = await parser.parseURL(`${CORS}/${url}`).catch(err => console.log(err));
                if (feed === undefined) return console.log('Error: Cannot fetch', url);

                const { description, image, items, link, title } = feed;

                result.push({
                    description, link, title,
                    image: image ? image.url : rssIcon,
                    items: limit(items)(20),
                });

                this.setState({ tabLen: this.getTabLen(result) });
            });

            const duration = 300 * MY_FEED[curTab].flux.length;
            setTimeout(() => res(result), duration);
            console.log(curTab, duration + 'ms');
        });

        this.setState(
            { datas: result, isLoaded: true },
            sessionStorage.setItem(curTab, JSON.stringify(result))
        );
    }

    findData() {
        if(sessionStorage.getItem(this.state.curTab) !== null)
            return this.fetchFromStorage();
        this.fetchData();
    }

    toggleClick = key => {
        this.setState({
            curTab: key,
            tabLen: 0,
        }, this.findData);
    }

    componentDidMount() {
        this.findData();
    }

    render() {
        const { isLoaded, curTab } = this.state;

        return (
            <div className="App">
                <Header />
                <ResponsiveNav curTab={curTab} isLoaded={isLoaded} toggleClick={this.toggleClick}/>
                <BoardContainer state={this.state} boardRef={this.boardRef}/>
                <ButtonToTop boardRef={this.boardRef}/>
            </div>
        )
    }
}

const BoardContainer = ({ state, boardRef }) => {
    const { datas, curTab, tabLen, isLoaded } = state;

    return (
        <div className={`board-container ${curTab}`} ref={boardRef}>
            <div className="boardContainerTitle">
                <h2>{curTab}</h2>
                <span>{`${tabLen} articles`}</span>
            </div>
            {!isLoaded ? <Loading />
                : datas.map((el, id) => <Board key={id} id={id} feed={el} />)}
        </div>
    );
}

const ResponsiveNav = ({ curTab, isLoaded, toggleClick }) => {
    const fadeOut = { opacity: .5, cursor: 'not-allowed' };
    const fadeIn = { opacity: 1, transition: '.3s' };

    return (
        <div className="button-tab">
            {Object.keys(MY_FEED).map((key, id) => (
                <button
                    key={id}
                    className={curTab === key ? 'btn active' : 'btn'}
                    title={key}
                    onClick={() => isLoaded && toggleClick(key)}
                    style={!isLoaded ? fadeOut : fadeIn}
                >
                    <span className="tab-emoji" role="img" aria-label="Emoji">{MY_FEED[key].emoji}</span>
                    <span className="tab-name">{key}</span>
                </button>
            ))}
        </div>
    );
}

export default App;