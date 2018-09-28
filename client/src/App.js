import React, { Component } from "react";
import Selector from './components/Selector';
import Video from './components/Video/Video';
import NewProposal from './components/NewProposal/NewProposal';
import Voting from './components/Voting/Voting';
import BondedToken from './components/BondedToken/BondedToken';
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import Content from './components/Content/Content'
import 'bootstrap/dist/css/bootstrap.css'

import "./App.css";

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    account: null,
    accounts: null,
    contract: null,
    storageValue: 0,
    proposals: [],
    newProposal: '',
    loading: true,
    voting: false,
    hasVoted: false,
    totalSupply: null,
    marketCap: null,
    tokenPurchaseAmount: null,
    price: null,
    reward: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const votingContract = truffleContract(VotingContract);
      votingContract.setProvider(web3.currentProvider);
      const instance_voting = await votingContract.deployed();
      console.log(instance_voting);
      const instance_voting_address = instance_voting.address;

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3, accounts, account: accounts[0], contract: instance_voting, contractAddress: instance_voting_address
      });
      this.getVotingResults();
      this.getContractData();
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  /////////////////////////////////////////////////////////
  //stuff from greg / dappuniversity

  watchEvents = () => {
    // TODO: trigger event when vote is counted, not when component renders
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
  }

  // later castVote should include number of token used for vote
  castVote = (proposalId) => {
    this.setState({ voting: true })
    const { accounts, contract } = this.state;
    contract.vote(proposalId, { from: accounts[0] }).then((result) =>
      this.setState({ hasVoted: true })
    )
  }
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

  getVotingResults = async () => {
    const { contract } = this.state;
    const proposalCount = await contract.proposalCount()

    for (var i = 1; i <= proposalCount; i++) {
      contract.proposals(i).then((candidate) => {
        const candidates = [...this.state.proposals]
        candidates.push({
          id: candidate[0],
          name: candidate[1],
          voteCount: parseInt(candidate[2]) / 10 ** 18
        });
        this.setState({ proposals: candidates })
        console.log(this.state.proposals);
      });
    }
  }

  getContractData = async () => {
    const { contract } = this.state;
    const totalSupplyBN = await contract.totalSupply();
    const totalSupply = (parseInt(totalSupplyBN) / 10 ** 18).toFixed(3);
    const tokenBalanceBN = await contract.balanceOf(this.state.account);
    const tokenBalance = (parseInt(tokenBalanceBN) / 10 ** 18).toFixed(20);
    this.setState({
      totalSupply: totalSupply,
      tokenBalance: tokenBalance
    })
  }

  addProposal = (proposalText) => {
    const { accounts, contract } = this.state;
    contract.addProposal(proposalText, { from: accounts[0] }
    );
    // todo: update state when proposal added event is emitted
  }

  buyToken = async () => {
    const { accounts, contract } = this.state;
    const priceBN = await contract.priceToMint.call(this.state.tokenPurchaseAmount);
    contract.mint(this.state.tokenPurchaseAmount, { from: accounts[0], value: priceBN, gas: 300000 })
  }

  sellToken = async () => {
    const { accounts, contract } = this.state;
    contract.burn(this.state.tokenPurchaseAmount, { from: accounts[0], gas: 300000 })
  }

  amountChangeHandler = (event) => {
    const tokenAmountDec = event.target.value * (10**18);
    this.setState({ tokenPurchaseAmount: tokenAmountDec });
  }

  priceChangeHandler = async () => {
    const { contract } = this.state;
    const rewardBN = await contract.rewardForBurn.call(this.state.tokenPurchaseAmount);
    const priceBN = await contract.priceToMint.call(this.state.tokenPurchaseAmount);
    this.setState({ reward: rewardBN.toNumber()/10**18, price: priceBN.toNumber()/10**18 });

  } 
  

  proposalChangedHandler = (event) => {
    this.setState({ newProposal: event.target.value })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Selector />
        <Video />
        <NewProposal changed={this.proposalChangedHandler} add={this.addProposal} text={this.state.newProposal} />
        {/*<Voting />*/}
        <Content
          candidates={this.state.proposals}
          hasVoted={this.state.hasVoted}
          castVote={this.castVote} />

        <p> Your account: {this.state.account}</p>
        <p> Your ACH token balance: {this.state.tokenBalance} </p>

        <BondedToken supply={this.state.totalSupply} buy={this.buyToken} sell={this.sellToken} change={this.amountChangeHandler} />
        <p><small> Contract address: {this.state.contractAddress}</small></p>

      </div>
    );
  }
}

export default App;
