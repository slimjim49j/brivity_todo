import firebase from 'firebase';
require("firebase/firestore");

firebase.initializeApp({
  apiKey: 'AIzaSyCvxnlVq0DmWu9Z3rHdwH5kNSxwzfv3nMM',
  authDomain: 'blueroof-todo.firebaseapp.com',
  projectId: 'blueroof-todo'
});

var db = firebase.firestore();

export const fbAddTask = async (task) => {
  return new Promise(function (resolve, reject) {
    db.collection("tasks").add(task).then(docRef => {
      resolve(docRef);
    });
  });
};

export const fbUpdateTask = async (task) => {
  return new Promise(function (resolve, reject) {
    db.collection("tasks").doc(task.id).set(task.task).then(() => {
     resolve()
    });
  });
};

export const fbGetTasks = async () => {
  return new Promise(function (resolve, reject) {
    db.collection("tasks").get().then(querySnapshot => {
     let collection = []
      querySnapshot.forEach((doc) => {
          collection.push({id: doc.id, task: doc.data()});
      });
      resolve(collection)
    });
  });
};