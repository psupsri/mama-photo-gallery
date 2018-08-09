import firebase from 'firebase'

const put = (url, file) => firebase.storage().ref(url).put(file)

const get = (callback) => {
  firebase.database().ref('photos')
    .on('value', (snapshot) => {
      let result = []
      snapshot.forEach((childSnapshot) => {
        let key = childSnapshot.key
        let data = childSnapshot.val()
        data._id = key
        result.push(data)
      })
      callback(result)
    })
}

const getById = (id, callback) => {
  firebase.database().ref(`photos/${id}`)
    .on('value', (snapshot) => {
      callback(snapshot)
    })
}

const set = (url, value) => {
  firebase.database()
    .ref(url)
    .set(value)
}

const update = (url, value) => {
  firebase.database()
    .ref(url)
    .update(value)
}

const getOptions = (id, callback) => {
  firebase.database()
    .ref(`options/${id}`)
    .on('value', (snapshot) => {
      callback(snapshot.val())
    })
}

const getByOwner = (id, callback) => {
  firebase.database()
    .ref('photos')
    .orderByChild('owner')
    .equalTo(id)
    .on('value', (snapshots) => {
      let result = []
      snapshots.forEach((snapshot) => {
        let key = snapshot.key
        let data = snapshot.val()
        data._id = key
        result.push(data)
      })
      callback(result)
    })
}
export default {
  get,
  set,
  put,
  update,
  getOptions,
  getByOwner,
  getById
}
