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

    getFrFormatDate(timestamp) {
        let date = timestamp.split(' ')[0].split('-');
        let time = timestamp.split(' ')[1].substring(0, 5);

        return `Le ${date[2]}/${date[1]}/${date[0]} à ${time}`;
    }

    render() {
        const {favicon, title, items, link} = this.props;

        return (
            <div className={'panel'}>
                <header className="header-panel">
                    <img className="icon" src={favicon} alt=""/>
                    <a className="panelTitle" href={link} title={'Lien vers ' + link} target="_blank" rel="noopener noreferrer">{title}</a>
                    <span className="btnFlux deleteFlux" title="Delete this flux" role="img" aria-label="Delete flux">
                        ❌
                    </span>
                </header>
                <Articles 
                    items={items} 
                    getDate={this.getFrFormatDate} 
                    getContent={this.checkIfXmlAndReturnExtract}
                />
                <div className="spacer"></div>
            </div>
        )
    }
}

const Articles = ({items, getDate, getContent}) => (
    <div className="articles">
        {items.map(({link, content, title, pubDate, description, thumbnail}) => (
            <div key={link} className="content">
                <a className="article" href={link} target="_blank" rel="noopener noreferrer">
                    {  thumbnail !== '' ? <img src={thumbnail} className="thumbnail" alt="thumbnail"></img> : ''}
                    <p className="title">{title}</p>
                    <p className="date">{getDate(pubDate)}</p>
                    <p className="description">
                        {content.length > 30 ? getContent(content) : getContent(description)}
                    </p>
                    <hr/>
                </a>
            </div>
        ))}
    </div>
)

export default Panel;