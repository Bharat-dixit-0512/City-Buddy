import express from "express";
import {
  getAdminRequests,
  resolveAdminRequest,
  getEditSuggestions,
  resolveEditSuggestion,
  getClaimRequests,
  resolveClaimRequest,
} from "../controller/admin.controller.js";
import {
  verifyToken,
  requireSuperAdmin,
} from "../controller/auth.middleware.js";

const router = express.Router();
router.use(verifyToken, requireSuperAdmin);

router.get("/requests", getAdminRequests);
router.put("/requests/:userId", resolveAdminRequest);
router.get("/suggestions", getEditSuggestions);
router.put("/suggestions/:suggestionId", resolveEditSuggestion);
router.get("/claims", getClaimRequests);
router.put("/claims/:claimId", resolveClaimRequest);

export default router;
