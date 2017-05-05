import React from 'react';
import {connect} from 'react-redux';
import CoinActions from '../redux/coins'
import supportedCoins from '../coins'

class CoinSelector extends React.PureComponent {
    static propTypes = {
        value   : React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
    }

    render() {
        return (
            <select onChange={this.props.onChange}>
                {
                    Object.keys(supportedCoins).map(coin => <option key={coin}
                                                                    value={coin}>{supportedCoins[coin]}</option>)
                }
            </select>
        )
    }
}

class Row extends React.PureComponent {
    static propTypes = {
        row             : React.PropTypes.shape({
            coin      : React.PropTypes.string,
            quantity  : React.PropTypes.number,
            investment: React.PropTypes.number,
        }).isRequired,
        prices          : React.PropTypes.object.isRequired,
        updateCoin      : React.PropTypes.func.isRequired,
        updateQuantity  : React.PropTypes.func.isRequired,
        updateInvestment: React.PropTypes.func.isRequired,
    }

    render() {
        const unitPrice = this.props.prices[this.props.row.coin]
        const value     = unitPrice * this.props.row.quantity
        const benefit   = value - this.props.row.investment
        const roi       = ((value - this.props.row.investment) / this.props.row.investment * 100).toFixed(2)

        return (
            <tr>
                <td>
                    <CoinSelector value={this.props.row.coin} onChange={e => this.props.updateCoin(e.target.value)}/>
                </td>
                <td><input type="number" min={0} value={this.props.row.quantity}
                           onChange={e => this.props.updateQuantity(+e.target.value)}/></td>
                <td>{unitPrice.toFixed(2)}</td>
                <td>{value.toFixed(2)}</td>
                <td><input type="number" min={0} value={this.props.row.investment}
                           onChange={e => this.props.updateInvestment(+e.target.value)}/></td>
                <td>{this.props.row.investment ? benefit.toFixed(2) : '-'}</td>
                <td>{this.props.row.investment ? `${roi}%` : '-'}</td>
            </tr>
        )
    }
}

class Index extends React.PureComponent {
    static propTypes = {
        rows  : React.PropTypes.array.isRequired,
        addRow: React.PropTypes.func.isRequired,
    };

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
                    {
                        this.props.rows.map((x, i) => {
                            const row = this.props.rows[i]
                            return (
                                <Row row={row}
                                     prices={this.props.prices}
                                     updateCoin={coin => this.props.updateRow(i, {coin})}
                                     updateQuantity={quantity => this.props.updateRow(i, {quantity})}
                                     updateInvestment={investment => this.props.updateRow(i, {investment})}
                                />
                            )
                        })
                    }
                    </tbody>
                    <button onClick={() => this.props.addRow()}>+</button>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rows  : state.coins.rows,
        prices: state.coins.prices,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addRow   : () => dispatch(CoinActions.addRow()),
        updateRow: (i, update) => dispatch(CoinActions.updateRow(i, update))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
