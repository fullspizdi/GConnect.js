// src/services/drive.js
// Service class for interacting with Google Drive API

const { google } = require('googleapis');

class DriveService {
    /**
     * Initializes a new instance of the DriveService class.
     * @param {google.auth.OAuth2} authClient - The authenticated OAuth2 client.
     */
    constructor(authClient) {
        this.drive = google.drive({ version: 'v3', auth: authClient });
    }

    /**
     * Uploads a file to Google Drive.
     * @param {Object} fileMetadata - Metadata for the file to upload.
     * @param {Object} media - Media object specifying the path to the file and its MIME type.
     * @returns {Promise} A promise that resolves with the file upload response.
     */
    uploadFile(fileMetadata, media) {
        const params = {
            resource: fileMetadata,
            media: media,
            fields: 'id'
        };

        return new Promise((resolve, reject) => {
            this.drive.files.create(params, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(file.data);
                }
            });
        });
    }

    /**
     * Lists files in Google Drive.
     * @param {string} pageSize - The number of files to list.
     * @returns {Promise} A promise that resolves with the list of files.
     */
    listFiles(pageSize = 10) {
        const params = {
            pageSize: pageSize,
            fields: 'nextPageToken, files(id, name)'
        };

        return new Promise((resolve, reject) => {
            this.drive.files.list(params, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.data.files);
                }
            });
        });
    }

    /**
     * Deletes a file from Google Drive.
     * @param {string} fileId - The ID of the file to delete.
     * @returns {Promise} A promise that resolves when the file is deleted.
     */
    deleteFile(fileId) {
        return new Promise((resolve, reject) => {
            this.drive.files.delete({ fileId: fileId }, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.data);
                }
            });
        });
    }
}

module.exports = DriveService;
