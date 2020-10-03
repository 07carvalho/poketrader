import index from './index';

export default {
  getPokemon: (pokemon) => {
    return new Promise((resolve, reject) => {
      index.get('/api/v1/pokemon/' + pokemon)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          // reject(Error(error))
        })
      })
  },
  postEvaluation: (data) => {
    return new Promise((resolve, reject) => {
      index.post('/api/v1/evaluation/', data)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          // reject(Error(error))
        })
      })
  }
}