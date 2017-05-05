import React from 'react';
import {connect} from 'react-redux';
import CoinActions from '../redux/coins'
import supportedCoins from '../coins'
import supportedCurrencies from '../currencies'

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
        let totalValue      = 0
        let totalInvestment = 0

        this.props.rows.forEach(row => {
            totalValue += row.quantity * this.props.prices[row.coin]
            totalInvestment += row.investment
        })

        const totalBenefit = totalValue - totalInvestment
        const totalROI     = (totalValue - totalInvestment) / totalInvestment * 100

        const currency = supportedCurrencies[this.props.currency]
        return (
            <div>
                <select value={this.props.currency} onChange={e => this.props.changeCurrency(e.target.value)}>
                    {
                        Object.keys(supportedCurrencies).map(x => <option key={x}
                                                                          value={x}>{supportedCurrencies[x]}</option>)
                    }
                </select>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Quantity</td>
                        <td>{`Unit price (${currency})`}</td>
                        <td>{`Value (${currency})`}</td>
                        <td>{`Investment (${currency})`}</td>
                        <td>{`Benefit (${currency})`}</td>
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
                    <tr>
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td>{totalValue.toFixed(2)}</td>
                        <td>{totalInvestment.toFixed(2)}</td>
                        <td>{totalBenefit.toFixed(2)}</td>
                        <td>{totalROI.toFixed(2)}%</td>
                    </tr>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rows    : state.coins.rows,
        prices  : state.coins.prices,
        currency: state.coins.currency,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addRow        : () => dispatch(CoinActions.addRow()),
        updateRow     : (i, update) => dispatch(CoinActions.updateRow(i, update)),
        changeCurrency: (currency) => dispatch(CoinActions.changeCurrency(currency))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
