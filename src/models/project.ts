import { Schema, Model, model } from 'mongoose'
import { Employee } from './employee'
import { from } from 'apollo-link';
interface IProject {
  title: String
  description?: String
  live: Boolean
  hours: Number
  lead: String
}

const projectSchema: Schema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  live: {
    type: Boolean,
    default: false
  },
  hours: Number,
  lead: {
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee'
  }]
})

export const Project: Model<IProject> = model<IProject>('Project', projectSchema)
