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
        pickedAccount: null
    }

    componentDidMount() {
        db.collection('accounts').onSnapshot((querySnapshot) => {
            const accounts = [];
            // TODO: Create another collection with only addresses
            querySnapshot.forEach((doc) => {
                accounts.push({
                    address: doc.data().publicAddress
                });
            });
            this.setState({
                accounts
            })
        });
    }

    createAccount = () => {
        // TODO: ERROR and Response handling
        fetch('/api/create-wallet');
    }

    pickAccount = (index) => {
        this.setState({
            pickedAccount: this.state.accounts[index]
        })
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
                                    <td>Mark</td>
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
                            <button className="btn btn-primary">submit</button>
                        </div>
                        <div className="form-inline">
                            <div className="form-group">
                                <label for="staticEmail3">Send</label>
                                <input type="text" readonly className="form-control mx-sm-3" id="staticEmail3"/>
                                <label>tokens to </label>
                                <input type="text" readonly className="form-control mx-sm-3" id="staticEmail3"/>
                            </div>
                            <button className="btn btn-primary">submit</button>
                        </div>
                    </div>
                }
            </div>

        )
    }
}

ReactDOM.render(<DimesApp />, document.getElementById('root'));