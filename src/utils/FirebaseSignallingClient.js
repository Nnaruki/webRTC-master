import firebase from 'firebase/app';
import 'firebase/database';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';

export default class FirebaseSignallingClient {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyA_EHsKntZmjsiT9NeXWLBHca-xIVXsraU",
            authDomain: "webrtc-react-firebase-6a6c4.firebaseapp.com",
            databaseURL: "https://webrtc-react-firebase-6a6c4-default-rtdb.firebaseio.com",
            projectId: "webrtc-react-firebase-6a6c4",
            storageBucket: "webrtc-react-firebase-6a6c4.appspot.com",
            messagingSenderId: "361644327667",
            appId: "1:361644327667:web:be2f531eb285a8ea4bad86",
            measurementId: "G-LQ1YZHRVLR"
          };
          // Initialize Firebase
          if (firebase.apps.length === 0 ) firebase.initializeApp(firebaseConfig);
          this.database = firebase.database();
          this.localPeerName = '';
          this.remotePeerName = '';
    }

    setPeerNames(localPeerName, remotePeerName) {
        this.localPeerName = localPeerName;
        this.remotePeerName = remotePeerName;
    
    }

    get targetRef() {
        return this.database.ref(this.remotePeerName);
    }

    async sendOffer(sessionDescription) {
        await this.targetRef.set({
            type:'offer',
            sender: this.localPeerName,
            sessionDescription,
        });
    }
    async sendAnswer(sessionDescription) {
        await this.targetRef.set({
            type: 'answer',
            sender: this.localPeerName,
            sessionDescription,
        });
    }
    async sendCandinate(candidate) {
        await this.targetRef.set({
            type: 'candinate',
            sender: this.localPeerName,
            candidate,
        });
    }


    async remove(path) {
        await this.database.ref(path).remove();
    }
}