import firebase from 'firebase'

const getCurrentUser = () => firebase.auth().currentUser

const set = (id, val) => {
  firebase.database()
    .ref(`users/${id}`)
    .set(val)
}

export default {
  getCurrentUser,
  set
}
