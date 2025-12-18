SDR Lead Velocity Automation

This project automates the core "Execution" tasks of a Junior SDR role in an early-stage SaaS company. It handles inbound lead hygiene, qualification, and momentum maintenance using Google Apps Script, OpenAI, and HubSpot.

Features

Instant Qualification: Uses GPT-4o to analyze inbound messages for intent and priority.

CRM Sync: Automatically creates/updates contacts in HubSpot with custom intent tags.

Automated Hygiene: Maintains clean lead notes and centralized logging in Google Sheets.

Personalized Drafting: Generates a custom follow-up email draft for every lead based on their specific inquiry.

Setup Instructions

Google Sheet: Create a new Google Sheet and name a tab "Leads".

Apps Script: Open Extensions > Apps Script and paste the provided .gs files.

Environment Variables:

Go to Project Settings in Apps Script.

Add Script Properties:

OPENAI_API_KEY: Your OpenAI API key.

HUBSPOT_ACCESS_TOKEN: Your HubSpot Private App Access Token.

Trigger:

Add a "Form Submit" trigger to run onFormSubmit whenever your inbound form is completed.

HubSpot Configuration:

Ensure your HubSpot instance has a custom property lead_intent_tag or update the code to map to an existing field.

Workflow Overview