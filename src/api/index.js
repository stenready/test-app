import axios from "axios";
const $http = axios.create({
  baseURL: 'https://cinema-api-test.y-media.io/v1',
});

export default {
  getMovies() {
    return new Promise( (resolve, reject) => {
      $http.get('/movies')
        .then((res) => {
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    } )
  }
}
