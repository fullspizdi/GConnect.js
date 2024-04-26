// examples/usage.js
// Demonstrates how to use the GConnect.js library to interact with Google services

const GConnect = require('../src/index.js');

// Replace these with your actual Google API credentials
const credentials = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI'
};

// Initialize GConnect with your credentials
const gconnect = new GConnect(credentials);

// Example usage of the Gmail service to send an email
gconnect.gmail.sendEmail({
  to: 'recipient@example.com',
  subject: 'Important Update',
  text: 'Please review the attached document.'
})
.then(() => console.log('Email sent successfully!'))
.catch(err => console.error('Failed to send email:', err));

// Example usage of the Drive service to upload a file
const fileMetadata = {
  name: 'example.txt',
  mimeType: 'text/plain'
};

const media = {
  mimeType: 'text/plain',
  body: 'Hello, world!'
};

gconnect.drive.uploadFile(fileMetadata, media)
.then(() => console.log('File uploaded successfully!'))
.catch(err => console.error('Failed to upload file:', err));

// Example usage of the Sheets service to add a new sheet
gconnect.sheets.createSheet({
  properties: {
    title: 'Test Sheet'
  }
})
.then(() => console.log('Sheet created successfully!'))
.catch(err => console.error('Failed to create sheet:', err));

// Example usage of the Calendar service to add a new event
const event = {
  summary: 'Team Meeting',
  location: 'Virtual',
  start: {
    dateTime: '2023-10-01T09:00:00-07:00',
    timeZone: 'America/Los_Angeles'
  },
  end: {
    dateTime: '2023-10-01T10:00:00-07:00',
    timeZone: 'America/Los_Angeles'
  }
};

gconnect.calendar.createEvent(event)
.then(() => console.log('Event created successfully!'))
.catch(err => console.error('Failed to create event:', err));
