import React from 'react';

class ButtonToTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isScrolled: false,
        }
    }

    upPageClick() {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
        return this.setState({isScrolled: false});
    }

    handleScroll = () => {
        window.onscroll = () => {
            if (window.pageYOffset >= this.props.boardRef.current.offsetTop)
                return this.setState({isScrolled: true});
            return this.setState({isScrolled: false});
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            this.state.isScrolled &&
            <div className="btn-top" onClick={() => this.upPageClick()}>
                <span role="img" aria-label="Emoji Top">🔝</span>
            </div>
        )
    }
}

export default ButtonToTop;