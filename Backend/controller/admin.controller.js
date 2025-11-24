import User from "../model/usermodel.js";
import Place from "../model/place.model.js";
import EditSuggestion from "../model/editSuggestion.model.js";
import ClaimRequest from "../model/claimRequest.model.js";

export const getAdminRequests = async (req, res) => {
  try {
    const pendingUsers = await User.find({ adminRequestStatus: "pending" });
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const resolveAdminRequest = async (req, res) => {
  const { userId } = req.params;
  const { action } = req.body;

  if (!["approve", "deny"].includes(action)) {
    return res.status(400).json({ message: "Invalid action." });
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.adminRequestStatus !== "pending") {
      return res
        .status(404)
        .json({ message: "Request not found or already resolved." });
    }

    if (action === "approve") {
      user.role = "admin";
      user.adminRequestStatus = "approved";
    } else {
      user.adminRequestStatus = "none";
    }

    await user.save();
    res.status(200).json({ message: `User request has been ${action}d.` });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const getEditSuggestions = async (req, res) => {
  try {
    const suggestions = await EditSuggestion.find({ status: "pending" })
      .populate("user", "username")
      .populate("place", "name");
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resolveEditSuggestion = async (req, res) => {
  const { suggestionId } = req.params;
  const { action } = req.body;
  try {
    const suggestion = await EditSuggestion.findById(suggestionId);
    if (!suggestion)
      return res.status(404).json({ message: "Suggestion not found." });
    suggestion.status = action;
    await suggestion.save();
    res.status(200).json({ message: `Suggestion has been ${action}.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClaimRequests = async (req, res) => {
  try {
    const requests = await ClaimRequest.find({ status: "pending" })
      .populate("user", "username")
      .populate("place", "name");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resolveClaimRequest = async (req, res) => {
  const { claimId } = req.params;
  const { action } = req.body;
  try {
    const claim = await ClaimRequest.findById(claimId)
      .populate("user")
      .populate("place");
    if (!claim)
      return res.status(404).json({ message: "Claim request not found." });
    if (action === "approved") {
      claim.status = "approved";
      claim.place.claimedBy = claim.user._id;
      claim.user.role = "owner";
      await claim.place.save();
      await claim.user.save();
    } else {
      claim.status = "rejected";
    }
    await claim.save();
    res.status(200).json({ message: `Claim request has been ${action}.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
