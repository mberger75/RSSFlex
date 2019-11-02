import React, {Component} from 'react';
import {Time} from './Utils';

import './css/Board.css';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            boardClass: '',
            seemore: '➕'
        }
    }

    getCleanTitle(link, title) {
        const regex = /\.(com|net|org|fr|blog|info)\/?$/i;
        return regex.test(link.split('/')[2]) ? link.split('/')[2] : title
    }

    itemSeen(e) {
        const seenClass = "article-seen";

        if (!e.currentTarget.classList.contains(seenClass)) {
            return e.currentTarget.classList.add(seenClass);
        }
    }

    displayBoard = e => {
        let board = e.currentTarget.closest(".board");
        let activeClass = 'board-active';

        if(!board.classList.contains(activeClass))
            return this.setState({ boardClass: activeClass, seemore: '➖' });
        return this.setState({ boardClass: '', seemore: '➕' });
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
                <div className="article-wrapper">{feed.items.map(item => generateItem(item))}</div>
                <div className="spacer"></div>
            </div>
        );
    }
}

const generateItem = item => {
    const { title, categories, link, pubDate, content } = item;

    const getCat = cat => (cat && typeof cat[0] === 'string') && String(cat[0]);
    const shorten = str => str.substring(0, 140);
    const utf8 = str => str
        .replace(/&#8217;|&#39;/g, `'`)
        .replace(/&eacute;|&egrave;|&ecirc;|&euml;/g, 'e')
        .replace(/&agrave;|&acirc;/g, 'a')
        .replace(/&ccedil;/, 'ç')
        .replace(/&#32;/, '');

    const cleanXML = xml => xml.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '')


    const clean = txt => shorten(utf8(cleanXML(String(txt))));

    return (
        <article key={link} className="article" onClick={(e) => this.itemSeen(e)}>
            <div className="content">
                <a className="content-main" href={link} title={link} target="_blank" rel="noopener noreferrer">
                    <p className="title">{title}</p>
                    {getCat(categories) && <p className="categorie">{getCat(categories)}</p>}
                    {pubDate && <p className="date">{Time.beautify(pubDate)}</p>}
                    <p className="description">{clean(content)}...</p>
                    <hr/>
                </a>
            </div>
        </article>
    );
}

export default Board;