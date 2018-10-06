const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.newOrder = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snap, context)=> {
    const order = snap.data();
    return admin.firestore().collection('orders').doc(order.oid).get().then(snap => {
      return admin.firestore().collection('messages').doc(order.oid).set(
        {log: `Nuevo pedido realizado con ID ${order.oid}, coste total: ${snap.data().totalCost} €`}
      );
    });
  });
