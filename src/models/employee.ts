import { Schema, Model, model} from "mongoose";

interface IEmployee {
  name?: String
  email: String
}

const employeeSchema: Schema = new Schema({
  name: String,
  email: String
}, {
   toJSON: { virtuals: true }
}, { 
  toObject: { virtuals: true }
}, { 
  minimise: false 
})

employeeSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'members',
  justOne: false
})

employeeSchema.virtual('leads', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'lead',
  justOne: false
})

export const Employee: Model<IEmployee> = model<IEmployee>('Employee', employeeSchema)
