import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/js/navabar.component";
import Dashboard from "./components/js/dashboard.component"
import CreateElection from "./components/js/CreateElection.component"
import Active from "./components/js/Active";

import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import MainContract from './build/contracts/MainContract.json'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
	        electionCount: 0
        }
        this.loadWeb3();
    }

    async loadWeb3() {
        let web3 = window.web3;  
      
        //set web3 & truffle contract
        if (typeof web3 !== 'undefined') {
        
            //Setup Web3 Provider
            this.web3Provider = web3.currentProvider;  
            this.web3 = new Web3(web3.currentProvider);  
            
            //Setup Contract
            this.MainContract = TruffleContract(MainContract);  
            this.MainContract.setProvider(this.web3Provider);
            
            //Setup account
            var accounts = await this.web3.eth.getAccounts();
            this.setState({account: accounts[0]});

            return this.web3;

        }else{  
            this.isWeb3 = false;  
        }
    }

    async loadInstance() {
        //Setup Contract Instance
        this.mainInstance = await this.MainContract.deployed();
        return this.mainInstance;
    }

    async componentDidMount() {
        
    }

    render() {
        return (
            <Router>
                <Navbar account = {this.state.account}/><br/>
                {<Route path="/dashboard" exact component={Dashboard} />}
                {<Route path="/createElection" exact component={() => <CreateElection account={this.state.account}/>}/>}
                {<Route path="/active" exact component={() => <Active account={this.state.account}/>}/>}
            </Router>
        );
    }
}

export default App;
