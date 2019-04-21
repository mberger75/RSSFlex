import React, {Component} from 'react';
import {a, convertDate} from './utils';
import './App.css';

class Board extends Component {

    cleanXml = (raw) => {
        const description = String(raw);
        const def = 'No description';
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
        let def = 'No category';

        return categories && typeof categories[0] === 'string'? String(categories[0]) : def;
    }

    getIcon(link) {
        const size = 144;
        const regex = /\.(com|net|org|fr|blog|info)\/?$/i;
        const url = regex.test(link.split('/')[2]) ? link.split('/')[2] : 'rss.com';

        return `https://api.faviconkit.com/${url}/${size}`;
    }

    itemSeen(e) {
        const seenClass = "article-seen";

        if (!e.currentTarget.classList.contains(seenClass)) {
            return e.currentTarget.classList.add(seenClass);
        }
    }

    generateItem = item => (
        <article key={item.link} className="articles" onClick={(e) => this.itemSeen(e)}>
            <div className="content">
                <a className="article" href={item.link} title={item.link} target={a.b} rel={a.r}>
                    <p className="title">{item.title}</p>
                    <p className="categorie">{this.getFirstCategory(item.categories)}</p>
                    <p className="date">{item.pubDate ? convertDate(item.pubDate) : 'Unknown date'}</p>
                    <p className="description" dangerouslySetInnerHTML={
                        {__html: this.cleanXml(item.content)}
                    }/>
                    <hr/>
                </a>
            </div>
        </article>
    )

    render() {
        const {feed, id} = this.props;

        return (
            <div className={`board ${id}`}>
                <header className="header-board">
                    <img className="icon" src={this.getIcon(feed.link)} alt="Icon"/>
                    <a className="boardTitle" href={feed.link} title={feed.link} target={a.b} rel={a.r}>
                        {this.getCleanTitle(feed.link, feed.title)}
                    </a>
                    <div className="itemLen">{feed.items.length}</div>
                </header>
                {feed.items.map(item => this.generateItem(item))}
                <div className="spacer"></div>
            </div>
        )
    }
}

export default Board;