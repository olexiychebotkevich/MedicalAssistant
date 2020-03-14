import React, { Component } from 'react';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            applicationServerPublicKey:null,
            pushServiceWorkerRegistration:null,
            subscribeButton:null,
            unsubscribeButton:null,
            topicInput:null,
            urgencySelect:null,
            notificationInput:null
         }
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

    initializeUIState() {
        // subscribeButton = document.getElementById('subscribe');
        // subscribeButton.addEventListener('click', subscribeForPushNotifications);

        // unsubscribeButton = document.getElementById('unsubscribe');
        // unsubscribeButton.addEventListener('click', unsubscribeFromPushNotifications);

        // topicInput = document.getElementById('topic');
        // notificationInput = document.getElementById('notification');
        // urgencySelect = document.getElementById('urgency');


        //document.getElementById('send').addEventListener('click', sendPushNotification);

        pushServiceWorkerRegistration.pushManager.getSubscription()
            .then(function (subscription) {
                changeUIState(Notification.permission === 'denied', subscription !== null);
            });
    };


    registerPushServiceWorker() {

     initializeUIState();

    };

    changeUIState(notificationsBlocked, isSubscibed) {

        if (notificationsBlocked) {
            console.log('Permission for Push Notifications has been denied');
        }
    };

     subscribeForPushNotifications() {
        if (this.applicationServerPublicKey) {
            this.subscribeForPushNotificationsInternal();
        } else {
            return axios.get(`${serverUrl}pushnotifications/public-key`)
                .then(function (response) {
                    if (response.ok) {
                        return response.text();
                    } else {
                        console.log('Failed to retrieve Public Key');
                    }
                }).then(function (applicationServerPublicKeyBase64) {
                    this.applicationServerPublicKey = urlB64ToUint8Array(applicationServerPublicKeyBase64);
                    console.log('Successfully retrieved Public Key');

                    this.subscribeForPushNotificationsInternal();
                }).catch(function (error) {
                    console.log('Failed to retrieve Public Key: ' + error);
                });
        }
    };

     subscribeForPushNotificationsInternal() {
        this.pushServiceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.applicationServerPublicKey
        })
            .then(function (pushSubscription) {
                
                axios.post(`${serverUrl}pushnotifications/subscriptions`, JSON.stringify(pushSubscription), {
                    headers: { 'Content-Type': 'application/json'}
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

                this.changeUIState(false, true);
            }).catch(function (error) {
                if (Notification.permission === 'denied') {
                    this.changeUIState(true, false);
                } else {
                    console.log('Failed to subscribe for Push Notifications: ' + error);
                }
            });
    };

    // function unsubscribeFromPushNotifications() {
    //     pushServiceWorkerRegistration.pushManager.getSubscription()
    //         .then(function (pushSubscription) {
    //             if (pushSubscription) {
    //                 pushSubscription.unsubscribe()
    //                     .then(function () {
    //                         fetch('push-notifications-api/subscriptions?endpoint=' + encodeURIComponent(pushSubscription.endpoint), {
    //                             method: 'DELETE',
    //                         })
    //                             .then(function (response) {
    //                                 if (response.ok) {
    //                                     writeToConsole('Successfully unsubscribed from Push Notifications');
    //                                 } else {
    //                                     writeToConsole('Failed to discard the Push Notifications subscrition from server');
    //                                 }
    //                             }).catch(function (error) {
    //                                 writeToConsole('Failed to discard the Push Notifications subscrition from server: ' + error);
    //                             });

    //                         changeUIState(false, false);
    //                     }).catch(function (error) {
    //                         writeToConsole('Failed to unsubscribe from Push Notifications: ' + error);
    //                     });
    //             }
    //         });
    // };

     sendPushNotification(topic,notification,urgency) {
        let payload = { topic: topic, notification: notification, urgency: urgency};
        axios.post(`${serverUrl}pushnotifications/subscriptions`, JSON.stringify(payload), {
            headers: { 'Content-Type': 'application/json'}
        })
            .then(function (response) {
                if (response.ok) {
                    console.log('Successfully sent Push Notification');
                } else {
                    console.log('Failed to send Push Notification');
                }
            }).catch(function (error) {
                console.log('Failed to send Push Notification: ' + error);
            });
    };


         initialize  () {
           

            if (!'serviceWork' in navigator) {
                console.log('Service Workers are not supported');
                return;
            }

            if (!'PushManager' in window) {
                console.log('Push API not supported');
                return;
            }

            this.registerPushServiceWorker();
        }



    render() { 
        return (  
            <div>
               <Button type="danger" onClick={this.subscribeForPushNotifications}>Get notifications</Button>
            </div>
        );
    }
}
 
export default Notification;