// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

module.exports = class ChimeMeetings {

    // Create an AWS SDK Chime object. Region 'us-east-1' is currently required.
    // Use the MediaRegion property below in CreateMeeting to select the region
    // the meeting is hosted in.


    constructor(AWS, controlRegion, endpoint, chimeMeetingsRegionalEndPoints) {
        this.AWS = AWS;
        this.chime = new AWS.Chime({ region: 'us-east-1' });
        this.regionalEndpoint = "";

        // Set the AWS SDK Chime endpoint. The global endpoint is https://service.chime.aws.amazon.com
        this.chime.endpoint = new AWS.Endpoint(endpoint);
        
        this.useChimeGlobal = (!this.checkValidControlRegion(controlRegion));
        this.controlRegion = controlRegion;
        if (!this.useChimeGlobal) {
            this.chimeMeetings = new AWS.ChimeSDKMeetings({ region: controlRegion });
            this.chimeMeetings.endpoint = chimeMeetingsRegionalEndPoints[endpoint][controlRegion];
            this.regionalEndpoint = chimeMeetingsRegionalEndPoints[endpoint][controlRegion];
        }
    }

    checkValidControlRegion(controlRegion){
        return (controlRegion == 'us-east-1' || controlRegion == 'us-west-2' || controlRegion == 'eu-central-1' || controlRegion == 'ap-southeast-1');
    }

    createMeeting(request) {
        return (this.useChimeGlobal || (typeof this.regionalEndpoint === 'undefined')) ? this.chime.createMeeting(request) : this.chimeMeetings.createMeeting(request);
    }

    createAttendee(request) {
        return (this.useChimeGlobal || (typeof this.regionalEndpoint === 'undefined')) ? this.chime.createAttendee(request) : this.chimeMeetings.createAttendee(request);
    }

    deleteMeeting(request) {
        return (this.useChimeGlobal  || (typeof this.regionalEndpoint === 'undefined')) ? this.chime.deleteMeeting(request) : this.chimeMeetings.deleteMeeting(request);
    }

    startMeetingTranscription(request) {
        return (this.useChimeGlobal || (typeof this.regionalEndpoint === 'undefined')) ? this.chime.startMeetingTranscription(request) : this.chimeMeetings.startMeetingTranscription(request);
    }

    stopMeetingTranscription(request) {
        return (this.useChimeGlobal || (typeof this.regionalEndpoint === 'undefined')) ? this.chime.stopMeetingTranscription(request) : this.chimeMeetings.stopMeetingTranscription(request);
    }

    createMediaCapturePipeline(request) {
        return this.chime.createMediaCapturePipeline(request);
    }

    deleteMediaCapturePipeline(request) {
        return this.chime.deleteMediaCapturePipeline(request);
    }
}
