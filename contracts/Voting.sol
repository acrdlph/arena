pragma solidity ^0.4.11;

import "./EthPolynomialCurvedToken.sol";
import "./LockableToken.sol";


//Not sure why it needs to be both EthPolynomialCurvedToken and LockableToken, since EthPolynomialCurvedToken is already LockableToken
contract Voting is EthPolynomialCurvedToken, LockableToken {

    //model proposal
    struct Proposal {
        uint id;
        string text;
        uint voteCount;
    }
    //store accounts that have voted
    mapping(address=>bool) public voters;

    // store proposal
    //fetch proposal
    mapping(uint => Proposal) public proposals;

    //store proposals count
    uint public proposalCount;

    //voted event
    event votedEvent (
        uint indexed _candidateId
    );

    function addProposal (string _text) public {
        proposalCount ++;
        proposals[proposalCount] = Proposal(proposalCount, _text, 0);
    }

    function vote (uint _proposalId) public {
        //could also be variable token amount 
        //function vote (uint _proposalId, uint _token) public {

        lock(0x123456, 10, 100);

        // record that account has voted
        voters[msg.sender] = true;

        //check that voter has enough approved token 

        // require valid proposalId

        //lock tokens till end of poll
        //update the voteCount for a proposal
        proposals[_proposalId].voteCount = proposals[_proposalId].voteCount + balanceOf(msg.sender);

        // trigger voted event
        emit votedEvent(_proposalId);
    }

}