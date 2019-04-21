import React, {Component} from 'react';
import './App.css';

class Board extends Component {

    getCleanExtract = (description) => {
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

    getDateString(pubDate) {
        return pubDate ? new Date(pubDate).toLocaleDateString() : 'Unknown date';
    }

    article = items => (
        <div className="articles">
            {items.map((el) => (
                <div key={el.link} className="content">
                    <a className="article" href={el.link} title={el.link} target="_blank" rel="noopener noreferrer">
                        <p className="title">{el.title}</p>
                        <p className="categorie">{this.getFirstCategory(el.categories)}</p>
                        <p className="date">{this.getDateString(el.pubDate)}</p>
                        <p className="description" dangerouslySetInnerHTML={
                            {__html: this.getCleanExtract(String(el.content))}
                        }/>
                        <hr/>
                    </a>
                </div>
            ))}
        </div>
    )

    render() {
        const {favicon, title, items, link, id} = this.props;

        return (
            <div className={`board ${id}`}>
                <header className="header-board">
                    <img className="icon" src={favicon} alt=""/>
                    <a className="boardTitle" href={link} title={link} target="_blank" rel="noopener noreferrer">
                        {this.getCleanTitle(link, title)}
                    </a>
                    <div className="dataLength">{items.length}</div>
                </header>
                {this.article(items)}
                <div className="spacer"></div>
            </div>
        )
    }
}

export default Board;