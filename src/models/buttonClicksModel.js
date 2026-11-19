import mongoose from 'mongoose'

const buttonClickSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
    },
    
  },
  {
    timestamps: true,
  }
)

const buttonClickModel = mongoose.models.buttonClickModel || mongoose.model('buttonClick', buttonClickSchema)
export { buttonClickModel }
