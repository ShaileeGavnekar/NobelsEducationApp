import mongoose from 'mongoose'
import debug from 'debug'
import { CreateLeadRequest } from './leads.type'

const log: debug.IDebugger = debug('app:Classs-dao')

export interface ILead {
  name: string
  phoneNumber: string
}

interface ILeadDoc extends ILead, mongoose.Document {}

class LeadDataOperations {
  LeadSchema = new mongoose.Schema(
    {
      name: String,
      phoneNumber: String
    },
    {
      timestamps: true
    }
  )

  Lead = mongoose.model<ILeadDoc>('Lead', this.LeadSchema)

  constructor() {
    log('Created new instance of Lead')
  }

  async createLead(LeadReq: CreateLeadRequest) {
    try {
      const Lead = new this.Lead({ ...LeadReq })
      return await Lead.save()
    } catch (err) {
      return { errors: [err] }
    }
  }

  async getAllLead() {
    try {
      const leads = await this.Lead.find({})
      return leads
    } catch (err) {
      return { errors: [err] }
    }
  }
}

export default new LeadDataOperations()
