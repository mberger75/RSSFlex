import React, {Component} from 'react';
import './App.css';

class Panel extends Component {

    stripXml(xml) {
        let regex = /<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g;
        return xml.replace(regex, '');
    }

    checkIfXmlAndReturnExtract = (description) => {
        let empty = '';

        if (description.trim().charAt(0) === '<') {
            let res = this.stripXml(description.substring(0, 140));
            return res.trim() !== '' && res.trim().length > 30 ? res + '...' : empty;
        }
        else {
            if (description.length > 30) {
                return description.substring(0, 140) + '...';
            }
            else {
                return empty;
            }
        }
    }

    getFrFormatDate(timestamp) {
        let date = timestamp.split(' ')[0].split('-');
        let time = timestamp.split(' ')[1].substring(0, 5);

        return `Le ${date[2]}/${date[1]}/${date[0]} à ${time}`;
    }

    render() {
        const {favicon, title, items} = this.props;

        return (
            <div className={'panel'}>
                <header className="header-panel">
                    <img className="icon" src={favicon} alt=""/>
                    <h1>{title}</h1>
                </header>
                <Articles 
                    items={items} 
                    getDate={this.getFrFormatDate} 
                    getContent={this.checkIfXmlAndReturnExtract}
                />
            </div>
        )
    }
}

const Articles = ({items, getDate, getContent}) => (
    <div className="articles">
        {items.map(({link, content, title, pubDate, description}) => (
            <div key={link} className="content">
                <a className="article" href={link} target="_blank" rel="noopener noreferrer">
                    <p className="title">{title}</p>
                    <p className="date">{getDate(pubDate)}</p>
                    <p className="description">
                        {content !== '' ? getContent(content) : getContent(description)}
                    </p>
                    <hr/>
                </a>
            </div>
        ))}
    </div>
)

export default Panel;