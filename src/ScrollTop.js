import React, {Component} from 'react';
import Utils from './Utils';

class ScrollTop extends Component {
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
            if (window.pageYOffset >= this.props.boardContainerRef.current.offsetTop) {
                return this.setState({isScrolled: true});
            }
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
                <img src={Utils.getSrcImg('arrow-up', 'png')} title="Top" alt="Top"/>
            </div>
        )
    }
}

export default ScrollTop;