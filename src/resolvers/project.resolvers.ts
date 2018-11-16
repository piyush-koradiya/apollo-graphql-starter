import { Project } from './../models/project'
export default {
  Query: {
    async getProjects(parent, { skip, limit, where }, ctx, info) {
      let projects = []
      let populateMembers = false
      let populateLead = false
      let information = JSON.parse(JSON.stringify(info))
      if (information.fieldNodes[0] && information.fieldNodes[0].selectionSet && information.fieldNodes[0].selectionSet.selections ) {
        information.fieldNodes[0].selectionSet.selections.map(selection => {
          if(selection.name.value == 'members') {
            populateMembers = true
          }
          if(selection.name.value == 'lead') {
            populateLead = true  
          }
        })
      }

      if (populateLead && populateMembers) {
        projects = await Project.find(where)
        .populate('members')
        .populate('lead')
        .skip(skip)
        .limit(limit)
      } else if (populateLead) {
        projects = await Project.find(where)
        .populate('lead')
        .skip(skip)
        .limit(limit)
      } else if (populateMembers) {
        projects = await Project.find(where)
        .populate('members')
        .skip(skip)
        .limit(limit)
      } else {
        projects = await Project.find(where)
        .skip(skip)
        .limit(limit)
      }
      
      console.log('projects: ', projects)
      return JSON.parse(JSON.stringify(projects))
    },

    async getProjectsCount(_, { where }) {
      return Project.count(where)
    }
  },
  Mutation: {
    async createProject(_, args) {
      const project = await Project.create(args.data)
      return JSON.parse(JSON.stringify(project))
    },

    async updateProject(_, { where, data }) {
      const project = await Project.update(where, data)
      console.log('project: ', project)
      return JSON.parse(JSON.stringify(project))
    }
  }
}
