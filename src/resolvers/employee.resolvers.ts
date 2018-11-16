import { Employee } from './../models/employee'

export default {
  Query: {
    async getEmployee(parent, { skip, limit, where }, ctx, info) {
      console.log('context: ', ctx._extensionStack.GraphQLExtensionStack);
      let employees = []
      let populateProjects = false
      let populateLeads = false
      let information = JSON.parse(JSON.stringify(info))
      if (information.fieldNodes[0] && information.fieldNodes[0].selectionSet && information.fieldNodes[0].selectionSet.selections ) {
        information.fieldNodes[0].selectionSet.selections.map(selection => {
          if(selection.name.value == 'projects') {
            populateProjects = true
          }
          if(selection.name.value == 'leads') {
            populateLeads = true  
          }
        })
      }

      if (populateLeads && populateProjects) {
        employees = await Employee.find(where)
        .populate('projects')
        .populate('leads')
        .skip(skip)
        .limit(limit)
      } else if (populateLeads) {
        employees = await Employee.find(where)
        .populate('leads')
        .skip(skip)
        .limit(limit)
      } else if (populateProjects) {
        employees = await Employee.find(where)
        .populate('projects')
        .skip(skip)
        .limit(limit)
      } else {
        employees = await Employee.find(where)
        .skip(skip)
        .limit(limit)
      }
      return JSON.parse(JSON.stringify(employees))
    },

    async getEmployeeCount(_, { where }) {
      return Employee.count(where)
    }
  },

  Mutation: {
    async createEmployee(parent, args, ctx, info) {
      const employee = await Employee.create(args.data)
      return JSON.parse(JSON.stringify(employee))
    }
  }
}
