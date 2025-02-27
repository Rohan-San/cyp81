// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Delegated Proof of Stake (DPoS) based E-Voting Smart Contract
// This contract enables scalable voting by allowing voters to delegate their votes to trusted candidates (validators), 
// reducing the number of transactions while maintaining election integrity.

contract DPoS_EVoting {
    // Structure to represent a candidate in the election
    struct Candidate {
        address candidateAddress;
        uint256 voteCount;
    }

    // Structure to represent a voter and their delegation details
    struct Voter {
        bool hasVoted;
        address delegate;
    }

    address public electionAdmin; // Administrator of the election
    mapping(address => Voter) public voters; // Mapping to track voters and their delegation status
    Candidate[] public candidates; // List of candidates
    mapping(address => uint256) public candidateIndex; // Mapping from candidate address to their index in the array
    bool public electionActive; // Election status flag

    // Events for logging important contract activities
    event VoteDelegated(address indexed voter, address indexed delegate);
    event VoteCast(address indexed candidate, uint256 totalVotes);
    event CandidateAdded(address indexed candidate);
    event ElectionStarted();
    event ElectionEnded();

    // Modifier to restrict actions to only the admin
    modifier onlyAdmin() {
        require(msg.sender == electionAdmin, "Only admin can perform this action");
        _;
    }

    // Modifier to allow actions only when election is active
    modifier electionOngoing() {
        require(electionActive, "Election is not active");
        _;
    }

    // Constructor to initialize the election administrator
    constructor() {
        electionAdmin = msg.sender;
    }

    // Function to add a candidate to the election (only admin)
    function addCandidate(address _candidate) public onlyAdmin {
        require(candidateIndex[_candidate] == 0, "Candidate already exists");
        candidates.push(Candidate({candidateAddress: _candidate, voteCount: 0}));
        candidateIndex[_candidate] = candidates.length;
        emit CandidateAdded(_candidate);
    }

    // Function to start the election (only admin)
    function startElection() public onlyAdmin {
        require(!electionActive, "Election already started");
        electionActive = true;
        emit ElectionStarted();
    }

    // Function to end the election (only admin)
    function endElection() public onlyAdmin {
        require(electionActive, "Election not started");
        electionActive = false;
        emit ElectionEnded();
    }

    // Function to allow voters to delegate their vote to a candidate
    function delegateVote(address _delegate) public electionOngoing {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(_delegate != msg.sender, "Cannot delegate to self");
        voters[msg.sender].delegate = _delegate;
        voters[msg.sender].hasVoted = true;
        emit VoteDelegated(msg.sender, _delegate);
    }

    // Function to cast a vote for a candidate, either directly or via delegation
    function vote(address _candidate) public electionOngoing {
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(candidateIndex[_candidate] != 0, "Invalid candidate");

        address delegate = voters[msg.sender].delegate;
        if (delegate == address(0)) {
            // Direct voting by the voter
            candidates[candidateIndex[_candidate] - 1].voteCount++;
        } else {
            // Delegated voting (votes go to the delegate)
            require(candidateIndex[delegate] != 0, "Invalid delegate");
            candidates[candidateIndex[delegate] - 1].voteCount++;
        }

        voters[msg.sender].hasVoted = true;
        emit VoteCast(_candidate, candidates[candidateIndex[_candidate] - 1].voteCount);
    }

    // Function to retrieve the total votes for a candidate
    function getCandidateVotes(address _candidate) public view returns (uint256) {
        require(candidateIndex[_candidate] != 0, "Invalid candidate");
        return candidates[candidateIndex[_candidate] - 1].voteCount;
    }

    // Function to determine the winner of the election
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
