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
  },
  findMovieByPayload(id, name, genres = null) {
    return new Promise( (resolve, reject) => {
      let link = ['/movies?']
      if (id) link.push(`movie_id=${id}&`)
      if (name) link.push(`name=${name}&`)
      if (genres || genres === 0) link.push(`genres=${genres}`) //на бэке ге корректго отрабатывает
      link = link.join('')
      $http.get(link)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    } )
  },
  getMovieSessions(id) {
    return new Promise( (resolve, reject) => {
      $http.get(`/movieShows?movie_id=${id}`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    } )
  },
  showPlaces(id, time, date) {
    return new Promise( (resolve, reject) => {
      $http.get(`/showPlaces?movie_id=${id}&daytime=${time}&showdate=${date}`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    } )
  },
  bookPlace(id, row, seat, time, date) {
    return new Promise( (resolve, reject) => {
      $http.post(`/bookPlace`, {
        movie_id: id,
        row,
        seat,
        'Showdate': date,
        daytime: time,
      })
        .then((res) => {
          resolve(res.data.data)
        })
        .catch(error => {
          reject(error)
        })
    } )
  },

}
