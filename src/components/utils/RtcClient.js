export default class RtcClient {
    constructor() {
        const config = {
            iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
        };
        this.rtcPeerConnection = new this.rtcPeerConnection();
        this.localPeerName = '';
        this.remotePeerName = '';
    }
}