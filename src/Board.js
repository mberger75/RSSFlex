import React, {Component} from 'react';
import './App.css';

class Board extends Component {

    stripXml(xml) {
        let regex = /<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g;
        return xml.replace(regex, '');
    }

    checkIfXmlAndReturnExtract = (description) => {
        let empty = '';

        if (description.trim().charAt(0) === '<') {
            return this.stripXml(description).trim() !== '' ?
                this.stripXml(description).substring(0, 140) + '...' : 
                empty;
        }
        else {
            return description.length > 10 ?
                description.substring(0, 140) + '...' : 
                empty;
        }
    }

    getFormatDate(rawDate) {
        return `${rawDate.split(' ')[1]} ${rawDate.split(' ')[2]} ${rawDate.split(' ')[3]}`;
    }

    getCleanTitle(link, title) {
        const regex = /\.(com|net|org|fr|blog|info)\/?$/i;

        return regex.test(link.split('/')[2]) ? link.split('/')[2] : title
    }

    render() {
        const {favicon, title, items, link, id} = this.props;
        return (
            <div className={`board ${id}`}>
                <header className="header-board">
                    <img className="icon" src={favicon} alt=""/>
                    <a className="boardTitle" href={link} title={'Lien vers ' + link} target="_blank" rel="noopener noreferrer">
                        {this.getCleanTitle(link, title)}
                    </a>
                    <div className="dataLength">{items.length}</div>
                </header>
                <Articles
                    items={items} 
                    getContent={this.checkIfXmlAndReturnExtract}
                    getDate={this.getFormatDate}
                />
                <div className="spacer"></div>
            </div>
        )
    }
}

const Articles = ({items, getContent, getDate}) => (
    <div className="articles">
        {items.map((el) => (
            <div key={el.link} className="content">
                <a className="article" href={el.link} target="_blank" rel="noopener noreferrer">
                    <p className="title">{el.title}</p>
                    <p className="categorie">{el.categories && typeof el.categories[0] === 'string' ? String(el.categories[0]) : ''}</p>
                    <p className="date">{el.pubDate && getDate(el.pubDate)}</p>
                    <p className="description" dangerouslySetInnerHTML={
                        { __html: getContent(String(el.content)) }
                    }/>
                    <hr/>
                </a>
            </div>
        ))}
    </div>
)

export default Board;