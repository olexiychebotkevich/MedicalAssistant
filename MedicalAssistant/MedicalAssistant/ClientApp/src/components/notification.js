import React, { Component } from 'react';
import {serverUrl} from '../config';
import axios from 'axios';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            applicationServerPublicKey:null,

         };

         this.subscribeForPushNotifications = this.subscribeForPushNotifications.bind(this);
         this.subscribeForPushNotificationsInternal = this.subscribeForPushNotificationsInternal.bind(this);
         this.urlB64ToUint8Array = this.urlB64ToUint8Array.bind(this);
         
         
    }

    urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }

        return outputArray;
    };

    subscribeForPushNotifications(){
        if (this.state.applicationServerPublicKey) {
           this.subscribeForPushNotificationsInternal();
        } else {
            axios.get(`${serverUrl}api/PushNotifications/public-key`)
            .then(function (response) {
                if (response.ok) {
                    return response.text();
                } else {
                    console.log('Failed to retrieve Public Key');
                }
            }).then((applicationServerPublicKeyBase64) =>{
               
                console.log('Successfully retrieved Public Key');

                this.subscribeForPushNotificationsInternal(applicationServerPublicKeyBase64);
            }).catch(function (error) {
                console.log('Failed to retrieve Public Key: ' + error);
            });
        }
      }


      subscribeForPushNotificationsInternal(applicationServerPublicKeyBase64) {
          console.log("subscribeForPushNotificationsInternal");
          this.setState({applicationServerPublicKey:applicationServerPublicKeyBase64});
          console.log("1");
        navigator.serviceWorker.ready.then(registration => {
            console.log("2");
            if (!registration.pushManager) {
              console.log("Push Unsupported")
              return
            }
            console.log("3");
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.state.applicationServerPublicKey
              })
              .then(function (pushSubscription) {
                fetch(`${serverUrl}/api/PushNotifications/subscriptions`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pushSubscription)
                })
                    .then(function (response) {
                        if (response.ok) {
                            console.log('Successfully subscribed for Push Notifications');
                        } else {
                            console.log('Failed to store the Push Notifications subscrition on server');
                        }
                    }).catch(function (error) {
                        console.log('Failed to store the Push Notifications subscrition on server: ' + error);
                    });

            }).catch(function (error) {
                if (Notification.permission === 'denied') {
                   console.log("Notification.permission === 'denied'")
                } else {
                    console.log('Failed to subscribe for Push Notifications: ' + error);
                }
            });
        })
            
    }

    render()
    {
        return(
            <div>
                <button onClick={this.subscribeForPushNotifications}>subscribe</button>
            </div>
        );
    }
}
 
export default Notification;