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

    render() {
        const {favicon, title, items, link, id} = this.props;

        return (
            <div className={`panel ${id}`}>
                <header className="header-panel">
                    <img className="icon" src={favicon} alt=""/>
                    <a className="panelTitle" href={link} title={'Lien vers ' + link} target="_blank" rel="noopener noreferrer">{title}</a>
                    <div className="dataLength">{items.length}</div>
                </header>
                <Articles
                    items={items} 
                    getContent={this.checkIfXmlAndReturnExtract}
                />
                <div className="spacer"></div>
            </div>
        )
    }
}

// {link, content, title, pubDate, description, thumbnail}

const Articles = ({items, getContent}) => (
    <div className="articles">
        {items.map((el) => (
            <div key={el.link} className="content">
                <a className="article" href={el.link} target="_blank" rel="noopener noreferrer">
                    <p className="title">{el.title}</p>
                    <p className="date">{el.pubDate}</p>
                    <p className="description" dangerouslySetInnerHTML={
                        { __html: getContent(String(el.content)) }
                    }/>
                    <hr/>
                </a>
            </div>
        ))}
    </div>
)

export default Panel;