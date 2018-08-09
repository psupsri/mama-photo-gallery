import firebase from 'firebase'

const getCurrentUser = () => firebase.auth().currentUser

const set = (id, val) => {
  firebase.database()
    .ref(`users/${id}`)
    .set(val)
}

const getById = (id, callback) => {
  firebase.database()
    .ref(`users/${id}`)
    .on('value', (snapshot) => {
      callback(snapshot)
    })
}

const update = (id, value) => {
  firebase.database()
    .ref(`users/${id}`)
    .update(value)
}

export default {
  getCurrentUser,
  set,
  getById,
  update
}
