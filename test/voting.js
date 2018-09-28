var Voting = artifacts.require("../contracts/Voting.sol");

var votingInstance;
var proposalId;

contract("Voting", function (accounts) {
    it("initializes with 0 proposals", function () {
        return Voting.deployed().then(function (instance) {
            return instance.proposalCount();
        }).then(function (count) {
            assert.equal(count, 2) //TODO: change to 0!
        });
    });

    it("initializes proposal with the correct values", function () {
        return Voting.deployed().then(function (instance) {
            votingInstance = instance;
            return votingInstance.proposals(1);
        }).then(function (proposal) {
            assert.equal(proposal[0], 1, "contains the correct id");
            assert.equal(proposal[1], "Prop1", "contains the correct name");
            assert.equal(proposal[2], 0, "contains the correct vote count");
            return votingInstance.proposals(2);
        }).then(function (proposal) {
            assert.equal(proposal[0], 2, "contains the correct id");
            assert.equal(proposal[1], "Prop2", "contains the correct name");
            assert.equal(proposal[2], 0, "contains the correct vote count");
        });
    });

    it("allows a voter to cast a vote", function () {
        return Voting.deployed().then(function (instance) {
            votingInstance = instance;
            proposalID = 1;
            return votingInstance.vote(proposalID, { from: accounts[0] });
        }).then(function (receipt) {
            return votingInstance.voters(accounts[0]);
        }).then(function (voted) {
            assert(voted, "the voter was marked as voted");
            return votingInstance.proposals(proposalId);
        }).then(function (proposal) {
            var voteCount = proposal[2];
            assert.equal(voteCount, 1, "increments the proposals votecount");
        });
    });
});