// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract DPoS_EVoting {
    struct Candidate {
        address candidateAddress;
        uint256 voteCount;
    }

    struct Voter {
        bool hasVoted;
        address delegate;
    }

    address public electionAdmin;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    mapping(address => uint256) public candidateIndex;
    bool public electionActive;

    event VoteDelegated(address indexed voter, address indexed delegate);
    event VoteCast(address indexed candidate, uint256 totalVotes);
    event CandidateAdded(address indexed candidate);
    event ElectionStarted();
    event ElectionEnded();

    modifier onlyAdmin() {
        require(msg.sender == electionAdmin, "Only admin can perform this action");
        _;
    }

    modifier electionOngoing() {
        require(electionActive, "Election is not active");
        _;
    }

    constructor() {
        electionAdmin = msg.sender;
    }

    function addCandidate(address _candidate) public onlyAdmin {
        require(candidateIndex[_candidate] == 0, "Candidate already exists");
        candidates.push(Candidate({candidateAddress: _candidate, voteCount: 0}));
        candidateIndex[_candidate] = candidates.length;
        emit CandidateAdded(_candidate);
    }

    function startElection() public onlyAdmin {
        require(!electionActive, "Election already started");
        electionActive = true;
        emit ElectionStarted();
    }

    function endElection() public onlyAdmin {
        require(electionActive, "Election not started");
        electionActive = false;
        emit ElectionEnded();
    }

    function delegateVote(address _delegate) public electionOngoing {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(_delegate != msg.sender, "Cannot delegate to self");
        voters[msg.sender].delegate = _delegate;
        voters[msg.sender].hasVoted = true;
        emit VoteDelegated(msg.sender, _delegate);
    }

    function vote(address _candidate) public electionOngoing {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(candidateIndex[_candidate] != 0, "Invalid candidate");

        address delegate = voters[msg.sender].delegate;
        if (delegate == address(0)) {
            candidates[candidateIndex[_candidate] - 1].voteCount++;
        } else {
            require(candidateIndex[delegate] != 0, "Invalid delegate");
            candidates[candidateIndex[delegate] - 1].voteCount++;
        }

        voters[msg.sender].hasVoted = true;
        emit VoteCast(_candidate, candidates[candidateIndex[_candidate] - 1].voteCount);
    }

    function getCandidateVotes(address _candidate) public view returns (uint256) {
        require(candidateIndex[_candidate] != 0, "Invalid candidate");
        return candidates[candidateIndex[_candidate] - 1].voteCount;
    }

    function getWinner() public view returns (address) {
        require(!electionActive, "Election still ongoing");
        address winner;
        uint256 highestVotes = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > highestVotes) {
                highestVotes = candidates[i].voteCount;
                winner = candidates[i].candidateAddress;
            }
        }
        return winner;
    }
}
