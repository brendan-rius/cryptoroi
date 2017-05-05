import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {footer} from '../styles/footer.scss';

export default class App extends React.PureComponent {
    static propTypes = {
        children: PropTypes.object
    }

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
}
