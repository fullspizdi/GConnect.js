// src/services/gmail.js
// Handles Gmail API interactions for GConnect.js

const { google } = require('googleapis');

class GmailService {
    /**
     * Initializes a new instance of the GmailService class.
     * @param {google.auth.OAuth2} authClient - The authenticated OAuth2 client.
     */
    constructor(authClient) {
        this.gmail = google.gmail({ version: 'v1', auth: authClient });
    }

    /**
     * Sends an email using the Gmail API.
     * @param {Object} emailOptions - The email options including to, subject, and text.
     * @returns {Promise} A promise that resolves when the email is sent.
     */
    sendEmail(emailOptions) {
        const { to, subject, text } = emailOptions;
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            `From: <your-email@gmail.com>`,
            `To: <${to}>`,
            'Content-Type: text/plain; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            text
        ];
        const message = messageParts.join('\n');

        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        return this.gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage
            }
        });
    }
}

module.exports = GmailService;
