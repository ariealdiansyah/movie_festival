import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('main', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    movies: [],
    detailMovie: {},
    mostViewed: {},
    mostViewedGenre: {},
  }),
  actions: {
    async fetchMovies() {
      const { data } = await axios.get('http://localhost:3000/movies')
      this.movies = data
    },
    async getDetail(movieId) {
      const { data } = await axios.get(`http://localhost:3000/movies/${movieId}`)
      this.detailMovie = data
    },
    async addMovies(movie) {
      const { data } = await axios.post('http://localhost:3000/movies', movie)
      return data
    },
    async incrementView(movieId) {
      const movie = this.movies.find((m) => m.id === movieId)
      const alreadyView =
        this.user.viewedMovies.length > 0 && this.user.viewedMovies.find((m) => m == movieId)
      if (!movie) return

      if (!alreadyView) {
        movie.views += 1
        this.user.viewedMovies.push(movieId)
      }

      const user = await axios.patch(`http://localhost:3000/users/${this.user.id}`, {
        viewedMovies: this.user.viewedMovies,
      })

      const { data } = await axios.patch(`http://localhost:3000/movies/${movieId}`, {
        views: movie.views,
      })

      this.detailMovie = data
      this.user = user.data
    },
    async vote(movieId, type) {
      // const movie = this.movies.find((m) => m.id === movieId)
      // // console.log('user', this.user, 'movi', movie)
      // if (!movie || !this.user) return alert('Login required!')
      // console.log('mmm', movie)
      // const { data } = await axios.patch(`http://localhost:3000/movies/${movieId}`, {
      //   upvotes: movie.upvotes + 1,
      //   downvotes: movie.downvotes,
      // })

      const movie = this.movies.find((m) => m.id === movieId)
      if (!movie || !this.user) return

      const isUpvote = type === 'upvote'
      const userId = this.user.id

      console.log('movie', movie)
      movie.votes.upvotedBy = movie.votes.upvotedBy.filter((id) => id !== userId)
      movie.votes.downvotedBy = movie.votes.downvotedBy.filter((id) => id !== userId)

      if (isUpvote) {
        movie.votes.upvotedBy.push(userId)
      } else {
        movie.votes.downvotedBy.push(userId)
      }

      if (!this.user.votedMovies.includes(movieId)) {
        this.user.votedMovies.push(movieId)
      }
      const { data } = await axios.patch(`http://localhost:3000/movies/${movieId}`, {
        votes: {
          upvotedBy: movie.votes.upvotedBy,
          downvotedBy: movie.votes.downvotedBy,
        },
        upvotes: movie.votes.upvotedBy.length,
        downvotes: movie.votes.downvotedBy.length,
      })

      await this.fetchMovies()
      this.detailMovie = data
    },
    // async unvote(movieId) {
    //   const movie = this.movies.find((m) => m.id === movieId)
    //   if (!movie || !this.user) return

    //   const { data } = await axios.patch(`http://localhost:3000/movies/${movieId}`, {
    //     upvotes: movie.upvotes,
    //     downvotes: movie.downvotes + 1,
    //   })
    //   await this.fetchMovies()
    //   this.detailMovie = data
    // },
    async login({ email, password }) {
      // const { data } = await axios.post('http://localhost:3000/users', { email, password })
      // const { data } = await axios.get('http://localhost:3000/users', {
      //   params: {
      //     email,
      //     password,
      //   },
      // })
      const { data } = await axios.get('http://localhost:3000/users', {
        params: { email, password },
      })
      if (data.length) {
        this.user = data[0]
        this.isAuthenticated = true
      }

      // this.user = data
    },
    logout() {
      this.isAuthenticated = false
      this.role = null
      this.user = null
    },
    async mostViewed() {
      const { data } = await axios.get(
        'http://localhost:3000/movies?_sort=views&_order=desc&_limit=1',
      )
      this.mostViewed = data[0]
    },
    calculateMostViewed() {
      const genreViews = {}

      this.movies.forEach((movie) => {
        movie.genres.forEach((genre) => {
          genreViews[genre] = (genreViews[genre] || 0) + movie.views
        })
      })

      const mostViewedGenre = Object.entries(genreViews).reduce(
        (a, b) => (b[1] > a[1] ? b : a),
        [this.movies[0], 0],
      )
      console.log('a', genreViews, 'b', mostViewedGenre)
      this.mostViewedGenre = { genre: mostViewedGenre[0], views: mostViewedGenre[1] }
      // this.mostViewed = this.movies.reduce((a, b) => (b.views > a.views ? b : a), null)
    },
    async fetchMostVotedMovies() {
      return this.movies.sort((a, b) => b.upvotes - a.upvotes).slice(0, 5)
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'movie',
        storage: localStorage,
      },
    ],
  },
})
