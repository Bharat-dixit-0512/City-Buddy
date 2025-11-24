import ClaimRequest from "../model/claimRequest.model.js";

export const createClaimRequest = async (req, res) => {
    const { placeId, message } = req.body;
    const userId = req.user.id;
    try {
        const existingClaim = await ClaimRequest.findOne({ user: userId, place: placeId, status: 'pending' });
        if (existingClaim) {
            return res.status(409).json({ message: "You already have a pending claim for this business." });
        }
        const newClaim = new ClaimRequest({ user: userId, place: placeId, message });
        await newClaim.save();
        res.status(201).json({ message: "Your claim request has been submitted for review." });
    } catch (error) {
        res.status(500).json({ message: "Server error while creating claim.", error: error.message });
    }
};