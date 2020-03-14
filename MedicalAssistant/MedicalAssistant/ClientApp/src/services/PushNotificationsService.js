import axios from 'axios';
import { serverUrl } from '../config';
import webpush from 'web-push';


export default class PushNotificationsService {

    static subscribeForPushNotifications() {
        let applicationServerPublicKey = urlB64ToUint8Array(webpush.generateVAPIDKeys().publicKey);

        pushServiceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerPublicKey
        }).then(function (pushSubscription) {
            return axios.post(`${serverUrl}api/pushnotifications/Subscriptions`, JSON.stringify(pushSubscription), {
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    console.log('Successfully subscribed for Push Notifications');
                } else {
                    console.log('Failed to store the Push Notifications subscription on server');
                }
            }).catch(function (error) {
                console.log('Failed to store the Push Notifications subscription on server: ' + error);
            });

        }).catch(function (error) {
            if (Notification.permission === 'denied') {

            } else {
                console.log('Failed to subscribe for Push Notifications: ' + error);
            }
        });
    };
}