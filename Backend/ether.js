const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const contractABI = require("./DPoS_ABI.json");  // Get ABI from Remix
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const contract = new ethers.Contract(contractAddress, contractABI, provider);

app.post("/vote/cast", async (req, res) => {
    const { voterAddress, candidateAddress, privateKey } = req.body;
    
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = contract.connect(wallet);

    try {
        const tx = await contractWithSigner.vote(candidateAddress);
        await tx.wait();
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
