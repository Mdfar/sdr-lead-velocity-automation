/**

Handles communication with OpenAI for intent tagging and personalization. */

const AIService = {

qualifyLead: function(message) { const prompt = Analyze this inbound SaaS lead message: "${message}" Return JSON only: { "intent": "High/Medium/Low", "priority": "P1/P2/P3", "summary": "1-sentence summary", "concerns": ["objection1", "objection2"] };

const response = this._callOpenAI(prompt);
return JSON.parse(response);


},

generateFollowUp: function(lead, qual) { const prompt = You are an SDR. Draft a short, professional follow-up email to ${lead.name} from ${lead.company}. Lead's message: ${lead.message} AI Intent: ${qual.intent} Focus: Maintain momentum and schedule a brief discovery call. Rules: No fluff, structured, mentions specific details from their message.;

return this._callOpenAI(prompt);


},

_callOpenAI: function(prompt) { const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY'); const url = "https://api.openai.com/v1/chat/completions";

const payload = {
  model: CONFIG.OPENAI_MODEL,
  messages: [{role: "user", content: prompt}],
  temperature: 0.7
};

const options = {
  method: "post",
  contentType: "application/json",
  headers: { Authorization: "Bearer " + apiKey },
  payload: JSON.stringify(payload)
};

const res = UrlFetchApp.fetch(url, options);
const data = JSON.parse(res.getContentText());
return data.choices[0].message.content;


} };