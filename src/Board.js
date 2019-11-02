import React, {Component} from 'react';
import {Time} from './Utils';
import './App.css';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            boardClass: '',
            seemore: '➕'
        }
    }

    cleanXml = (raw) => {
        const description = String(raw);
        const def = false;

        const shorten = str => str.substring(0, 140) + '...';
        const cleanXml = description.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '');

        if (description.trim().charAt(0) !== '<') {
            return description.trim().length >= 50 ? shorten(description) : def;
        }
        return cleanXml.trim().length >= 50 ? shorten(cleanXml) : def;
    }

    getCleanTitle(link, title) {
        const regex = /\.(com|net|org|fr|blog|info)\/?$/i;
        return regex.test(link.split('/')[2]) ? link.split('/')[2] : title
    }

    getFirstCategory(categories) {
        return categories && typeof categories[0] === 'string'? String(categories[0]) : false;
    }

    itemSeen(e) {
        const seenClass = "article-seen";

        if (!e.currentTarget.classList.contains(seenClass)) {
            return e.currentTarget.classList.add(seenClass);
        }
    }

    generateItem = item => (
        <article key={item.link} className="article" onClick={(e) => this.itemSeen(e)}>
            <div className="content">
                <a className="content-main" href={item.link} title={item.link} target="_blank" rel="noopener noreferrer">
                    <p className="title">{item.title}</p>
                    {this.getFirstCategory(item.categories) &&
                    <p className="categorie">
                        {this.getFirstCategory(item.categories)}
                    </p>}
                    {item.pubDate && <p className="date">{Time.beautify(item.pubDate)}</p>}
                    {this.cleanXml(item.content) && 
                        <p className="description" dangerouslySetInnerHTML={
                        {__html: this.cleanXml(item.content)}
                    }/>}
                    <hr/>
                </a>
            </div>
        </article>
    )

    displayBoard = (e) => {
        let board = e.currentTarget.closest(".board");
        let activeClass = 'board-active';

        if(!board.classList.contains(activeClass)) {
            return this.setState({
                boardClass: activeClass,
                seemore: '➖'
            });
        }
        else {
            return this.setState({
                boardClass: '',
                seemore: '➕'
            });
        }
    }

    render() {
        const { feed } = this.props;
        const { boardClass, seemore } = this.state;

        return (
            <div className={`board ${boardClass}`}>
                <header className="header-board">
                    <img className="icon" src={feed.image} alt="Icon"/>
                    <a className="boardTitle" href={feed.link} title={feed.link} target="_blank" rel="noopener noreferrer">
                        {this.getCleanTitle(feed.link, feed.title)}
                    </a>
                    <div className="seemore" onClick={(e) => this.displayBoard(e)}>
                        <span className="plus" role="img" aria-label="Emoji">{seemore}</span>
                    </div>
                    <div className="itemLen">{feed.items.length}</div>
                </header>
                <div className="article-wrapper">
                    {feed.items.map(item => this.generateItem(item))}
                </div>
                <div className="spacer"></div>
            </div>
        )
    }
}

export default Board;