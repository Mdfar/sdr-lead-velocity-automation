/**

SDR Lead Velocity Automation

Main entry point for processing inbound leads, qualifying intent,

and pushing to HubSpot CRM. */

const CONFIG = { SHEET_NAME: 'Leads', OPENAI_MODEL: 'gpt-4o', HUBSPOT_PIPELINE_ID: 'default', HUBSPOT_STAGE_ID: 'appointmentscheduled' // Default "New Lead" stage };

function onFormSubmit(e) { const responses = e.namedValues; const leadData = { email: responses['Email Address'][0], name: responses['Full Name'][0], message: responses['How can we help?'][0], company: responses['Company'][0] || 'Unknown' };

processLead(leadData); }

function processLead(leadData) { try { // 1. Enrich & Qualify Lead using AI const qualification = AIService.qualifyLead(leadData.message);

// 2. Draft Personalized Follow-up
const draftEmail = AIService.generateFollowUp(leadData, qualification);

// 3. Sync to HubSpot
const hubspotId = HubSpotService.upsertContact(leadData, qualification);
HubSpotService.createNote(hubspotId, `AI Intent Tag: ${qualification.intent}\nPriority: ${qualification.priority}\nSummary: ${qualification.summary}`);

// 4. Log to Master Sheet
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
sheet.appendRow([
  new Date(),
  leadData.email,
  leadData.name,
  qualification.intent,
  qualification.priority,
  draftEmail,
  '[https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/](https://app.hubspot.com/contacts/YOUR_PORTAL_ID/contact/)' + hubspotId
]);


} catch (err) { Logger.log('Error processing lead: ' + err.toString()); } }