import firebase from 'firebase';
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA1MTDz0fD72PlHoXmrlSAjdSXkDB_t1oQ',
  authDomain: 'zuff-notes.firebaseapp.com',
  databaseURL: 'https://zuff-notes.firebaseio.com',
  storageBucket: 'zuff-notes.appspot.com',
  rules: {
    read: true,
    write: true,
  },
};
firebase.initializeApp(config);

const database = firebase.database();

export function fetchNotes(update) {
  database.ref('notes').on('value', snapshot => {
    update(snapshot.val());
  });
}

export function pushNote(noteObject) {
  database.ref('notes').push(noteObject);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}

export function moveNote(id, x, y) {
  database.ref('notes').child(id).update({ x, y });
}

export function updateNote(id, isEditing) {
  database.ref('notes').child(id).update({ isEditing });
}

export function updateContent(id, content) {
  database.ref('notes').child(id).update({ content });
}
