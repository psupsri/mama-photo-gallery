import firebase from 'firebase'

const put = (key, file) => firebase.storage().ref(`files/${key}`).put(file)

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

export default {
  get,
  set,
  put,
  update,
  getOptions
}
