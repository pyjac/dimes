// Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  // Initialize Firebase
const config = {
    apiKey: "AIzaSyAX-6wRnK5o8biAEgh-ggde5f2vrtofW30",
    authDomain: "quarters-c2d6e.firebaseapp.com",
    projectId: "quarters-c2d6e",
};
firebase.initializeApp(config);
const db = firebase.firestore();

class DimesApp extends React.Component {
    state = {
        accounts: [],
        pickedAccount: null,
        amount: null,
        toAddress: null,
        serverResult: null,
    }

    componentDidMount() {
        db.collection('accounts').onSnapshot((querySnapshot) => {
            const accounts = [];
            // TODO: Create another collection with only addresses
            querySnapshot.forEach((doc) => {
                let { publicAddress, balance } = doc.data();
                accounts.push({
                    balance: balance,
                    address: publicAddress
                });
            });

            this.setState({
                accounts
            })
        });
    }

    handleAmountChange = (event) => {
        this.setState({amount: event.target.value});
    }
    
    handleToAddressChange = (event) => {
        this.setState({toAddress: event.target.value});
    }

    handleSendTokenSubmit = () => {
        event.preventDefault();
        fetch(`/api/me/send/${this.state.toAddress}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                me: this.state.pickedAccount.address,
                amount: this.state.amount
            })
        }).then(res => res.json())
        .then(r => this.setState({serverResult: `<a href='https://rinkeby.etherscan.io/tx/${r.result}'>${r.result}</a>`}));
    }

    createAccount = () => {
        // TODO: ERROR and Response handling
        fetch('/api/create-wallet');
    }

    syncAccountsBalances = () => {
        // TODO: ERROR and Response handling
        fetch('/api/sync-balances');
    }



    pickAccount = (index) => {
        this.setState({
            pickedAccount: this.state.accounts[index]
        })
    }

    requestDimes = () => {
         // TODO: ERROR and Response handling
         fetch(`/api/request-token/${this.pickedAccount.address}`);
    }

    getBalance = (address) => {
        // TODO: ERROR and Response handling
        return fetch(`/api/me/check-balance/${address}`).then((response) => response.json());
   }

    render() {
        const { pickedAccount } = this.state;

        return (
            <div className="container-fluid">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-3">Ether Dimes</h1>
                    </div>
                </div>
                <button type="button" className="btn btn-primary btn-lg mx-auto" onClick={this.createAccount}>Create Account</button>
                <button type="button" className="btn btn-primary btn-lg mx-auto" onClick={this.syncAccountsBalances}>Sync Accounts Balances</button>
                <p>Available accounts</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Account</th>
                            <th>Available dimes</th>
                            <th>Pick</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.accounts.map((acc, index) => (
                                <tr>
                                    <th scope="row">{ acc.address }</th>
                                    <td>{ acc.balance }</td>
                                    <td>
                                        {
                                            pickedAccount && pickedAccount.address == acc.address ?
                                            <p> this is me </p> :
                                            <button type="button" className="btn btn-primary btn-sm mx-auto" onClick={() => this.pickAccount(index)}>Pick me</button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {pickedAccount &&
                    <div>
                        <p>Take action for {pickedAccount.address} </p>
                        <div className="form-inline">
                            <div className="form-group">
                                <label for="staticEmail2">Request</label>
                                <input type="text" readonly className="form-control mx-sm-3" id="staticEmail2"/>
                                <label>dimes</label>
                            </div>
                            <button className="btn btn-primary" onClick={this.requestDimes}>submit</button>
                        </div>
                        <form className="form-inline" onSubmit={this.handleSendTokenSubmit}>
                            <div className="form-group">
                                <label for="staticEmail3">Send</label>
                                <input type="text" value={this.state.amount} onChange={this.handleAmountChange} className="form-control mx-sm-3" />
                                <label>tokens to </label>
                                <input type="text" value={this.state.toAddress} onChange={this.handleToAddressChange} className="form-control mx-sm-3" id="staticEmail3"/>
                            </div>
                            <button className="btn btn-primary">submit</button>
                        </form>
                    </div>
                }
                <p dangerouslySetInnerHTML={{__html: this.state.serverResult}}></p>
            </div>

        )
    }
}

ReactDOM.render(<DimesApp />, document.getElementById('root'));