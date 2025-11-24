import mongoose from "mongoose";
const { Schema } = mongoose;

const editSuggestionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    place: { type: Schema.Types.ObjectId, ref: 'Place', required: true },
    suggestion: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

const EditSuggestion = mongoose.model('EditSuggestion', editSuggestionSchema);
export default EditSuggestion;