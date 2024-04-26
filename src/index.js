// src/index.js
// Entry point for the GConnect.js library

const { google } = require('googleapis');
const auth = require('./auth');
const GmailService = require('./services/gmail');
const DriveService = require('./services/drive');
const SheetsService = require('./services/sheets');
const CalendarService = require('./services/calendar');

class GConnect {
    constructor(credentials) {
        this.authClient = auth.initializeAuth(credentials);
        this.gmail = new GmailService(this.authClient);
        this.drive = new DriveService(this.authClient);
        this.sheets = new SheetsService(this.authClient);
        this.calendar = new CalendarService(this.authClient);
    }
}

module.exports = GConnect;
