import React from 'react';
import {connect} from 'react-redux';

class Index extends React.PureComponent {
    static propTypes = {};

    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Quantity</td>
                        <td>Unit price</td>
                        <td>Value</td>
                        <td>Investment</td>
                        <td>Benefit</td>
                        <td>ROI</td>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
