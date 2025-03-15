import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = require("../DPoS_ABI.json");

export default function AdminDashboard() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [electionActive, setElectionActive] = useState(false);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        async function initBlockchain() {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                setProvider(provider);
                setSigner(signer);
                setContract(contract);

                const active = await contract.electionActive();
                setElectionActive(active);
            }
        }
        initBlockchain();
    }, []);

    async function startElection() {
        if (!contract) return;
        const tx = await contract.startElection();
        await tx.wait();
        setElectionActive(true);
    }

    async function endElection() {
        if (!contract) return;
        const tx = await contract.endElection();
        await tx.wait();
        setElectionActive(false);
    }

    async function getWinner() {
        if (!contract) return;
        const winnerAddress = await contract.getWinner();
        setWinner(winnerAddress);
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Card>
                <CardContent className="p-4 space-y-4">
                    <p>Election Status: {electionActive ? "Active" : "Inactive"}</p>
                    <div className="space-x-4">
                        <Button onClick={startElection} disabled={electionActive}>Start Election</Button>
                        <Button onClick={endElection} disabled={!electionActive}>End Election</Button>
                    </div>
                    <div className="mt-4">
                        <Button onClick={getWinner}>Get Winner</Button>
                        {winner && <p className="mt-2">Winner: {winner}</p>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
