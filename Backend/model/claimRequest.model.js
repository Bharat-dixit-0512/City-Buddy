import mongoose from "mongoose";
const { Schema } = mongoose;

const claimRequestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    message: { type: String }
}, { timestamps: true });

const ClaimRequest = mongoose.model('ClaimRequest', claimRequestSchema);
export default ClaimRequest;