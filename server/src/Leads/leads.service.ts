import express from 'express'
import zoomMeetingsService from '../ZoomMeetings/zoomMeetings.service'
import leadDbOperations from './leads.db.operations'
import { CreateLeadRequest } from './leads.type'

class LeadService {
  async createLead({
    name,
    phoneNumber
  }: {
    name: string
    phoneNumber: string
  }) {
    try {
      const createLeadReq: CreateLeadRequest = {
        name,
        phoneNumber
      }
      const lead = await leadDbOperations.createLead(createLeadReq)
      return lead
    } catch (err) {
      return { errors: [err] }
    }
  }
  async getAllLeads() {
    try {
      const leads = await leadDbOperations.getAllLead()
      return leads
    } catch (err) {
      return { errors: [err] }
    }
  }
}

export default new LeadService()
