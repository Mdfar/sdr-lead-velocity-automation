/**

Interface for HubSpot CRM API. */

const HubSpotService = {

upsertContact: function(lead, qual) { const apiKey = PropertiesService.getScriptProperties().getProperty('HUBSPOT_ACCESS_TOKEN'); const url = "https://api.hubapi.com/crm/v3/objects/contacts";

const payload = {
  properties: {
    email: lead.email,
    firstname: lead.name.split(' ')[0],
    lastname: lead.name.split(' ').slice(1).join(' '),
    company: lead.company,
    lead_intent_tag: qual.intent, // Custom property
    hs_lead_status: 'NEW'
  }
};

const options = {
  method: "post",
  contentType: "application/json",
  headers: { Authorization: "Bearer " + apiKey },
  payload: JSON.stringify(payload),
  muteHttpExceptions: true
};

const res = UrlFetchApp.fetch(url, options);
const data = JSON.parse(res.getContentText());

// If contact exists, HubSpot returns 409, handled here for simplicity
return data.id || "existing_contact"; 


},

createNote: function(contactId, content) { const apiKey = PropertiesService.getScriptProperties().getProperty('HUBSPOT_ACCESS_TOKEN'); const url = "https://api.hubapi.com/crm/v3/objects/notes";

const payload = {
  properties: { hs_note_body: content, hs_timestamp: new Date().toISOString() },
  associations: [{ to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }] }]
};

UrlFetchApp.fetch(url, {
  method: "post",
  contentType: "application/json",
  headers: { Authorization: "Bearer " + apiKey },
  payload: JSON.stringify(payload)
});


} };