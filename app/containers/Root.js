import React, {Component, PropTypes} from 'react';
import {connect, Provider} from 'react-redux';
import routes from '../routes';
import {Router} from 'react-router';
import StartupActions from '../redux/startup'

class Root extends Component {
    static propTypes = {
        store  : PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        startup: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.startup()
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history} routes={routes}/>
            </Provider>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        startup: () => dispatch(StartupActions.startup()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
