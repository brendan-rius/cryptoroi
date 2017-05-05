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
        currency        : React.PropTypes.string.isRequired,
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
            <div style={{borderWidth: 1, borderStyle: 'solid', borderColor: 'black', padding: 5, marginTop: 5}}>
                <div>
                    I bought <input type="number" min={0} value={this.props.row.quantity}
                                    onChange={e => this.props.updateQuantity(+e.target.value)}/>
                    <CoinSelector value={this.props.row.coin}
                                  onChange={e => this.props.updateCoin(e.target.value)}/>&nbsp;
                    for a total price of <input type="number" min={0} value={this.props.row.investment}
                                                onChange={e => this.props.updateInvestment(+e.target.value)}/> {this.props.currency}.
                </div>
                <div>
                    <div>
                        The current unit price is <span>{unitPrice.toFixed(2)} {this.props.currency}</span> which values
                        my
                        investment at <span>{value.toFixed(2)} {this.props.currency}</span>.
                    </div>
                    <div>
                        Benefit: {this.props.row.investment ? `${benefit.toFixed(2)} ${this.props.currency}` : '-'}</div>
                    <div>ROI: <span>{this.props.row.investment ? `${roi}%` : '-'}</span></div>
                </div>

            </div>
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
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div>
                        {
                            this.props.rows.map((x, i) => {
                                const row = this.props.rows[i]
                                return (
                                    <Row row={row}
                                         prices={this.props.prices}
                                         updateCoin={coin => this.props.updateRow(i, {coin})}
                                         updateQuantity={quantity => this.props.updateRow(i, {quantity})}
                                         updateInvestment={investment => this.props.updateRow(i, {investment})}
                                         currency={currency}
                                    />
                                )
                            })
                        }
                        <button onClick={() => this.props.addRow()} style={{marginTop: 5}}>+ Add line</button>
                    </div>
                    <div style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 5, flexDirection: 'column'}}>
                        <div>Total value: <span>{totalValue.toFixed(2)}</span></div>
                        <div>Total investment: <span>{totalInvestment.toFixed(2)}</span></div>
                        <div>Total benefit: <span>{totalBenefit.toFixed(2)}</span></div>
                        <div>Total ROI: <span>{totalROI.toFixed(2)}%</span></div>
                    </div>
                </div>
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
