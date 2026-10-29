import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const feedbackModel = mongoose.models.feedback || mongoose.model('feedback', contactSchema)
export { feedbackModel }
