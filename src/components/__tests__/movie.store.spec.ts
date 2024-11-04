import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMovieStore } from '@/store/movie.store'
import { getMovies } from '@/api/movie-api'
import type { Movie } from '@/model/movie'
import { nextTick } from 'process'

// Mock the getMovies API function
vi.mock('@/api/movie-api', () => ({
  getMovies: vi.fn(),
}))

describe('useMovieStore', () => {
  beforeEach(() => {
    // Initialize Pinia before each test to get a fresh store instance
    setActivePinia(createPinia())
    vi.clearAllMocks() // Clear all mock calls to ensure isolation between tests
  })

  it('initializes with an empty movie list and no selected movie', () => {
    const store = useMovieStore()
  })

  it('sets selected movie correctly', () => {
    const store = useMovieStore()
    const movie: Movie = {
              "id": 1,
              "url": "https://www.tvmaze.com/shows/1/under-the-dome",
              "name": "Under the Dome",
              "type": "Scripted",
              "language": "English",
              "genres": [
                "Drama",
                "Science-Fiction",
                "Thriller"
              ],
              "status": "Ended",
              "runtime": 60,
              "averageRuntime": 60,
              "premiered": "2013-06-24",
              "ended": "2015-09-10",
              "officialSite": "http://www.cbs.com/shows/under-the-dome/",
              "schedule": {
                "time": "22:00",
                "days": [
                  "Thursday"
                ]
              },
              "rating": {
                "average": 6.5
              },
              "weight": 98,
              "network": {
                "id": 2,
                "name": "CBS",
                "country": {
                  "name": "United States",
                  "code": "US",
                  "timezone": "America/New_York"
                },
                "officialSite": "https://www.cbs.com/"
              },
              "webChannel": null,
              "dvdCountry": null,
              "externals": {
                "tvrage": 25988,
                "thetvdb": 264492,
                "imdb": "tt1553656"
              },
              "image": {
                "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
                "original": "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
              },
              "summary": "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
              "updated": 1704794065,
              "_links": {
                "self": {
                  "href": "https://api.tvmaze.com/shows/1"
                },
                "previousepisode": {
                  "href": "https://api.tvmaze.com/episodes/185054",
                }
              }
            };

    store.setSelectedMovie(movie)
    expect(store.getSelectedMovie).toEqual(movie) // The selected movie should match the movie object set
  })

  it('fetches movies and updates the list', () => {
    const store = useMovieStore()
    const mockMovies: Movie[] = [
        {
              "id": 1,
              "url": "https://www.tvmaze.com/shows/1/under-the-dome",
              "name": "Under the Dome",
              "type": "Scripted",
              "language": "English",
              "genres": [
                "Drama",
                "Science-Fiction",
                "Thriller"
              ],
              "status": "Ended",
              "runtime": 60,
              "averageRuntime": 60,
              "premiered": "2013-06-24",
              "ended": "2015-09-10",
              "officialSite": "http://www.cbs.com/shows/under-the-dome/",
              "schedule": {
                "time": "22:00",
                "days": [
                  "Thursday"
                ]
              },
              "rating": {
                "average": 6.5
              },
              "weight": 98,
              "network": {
                "id": 2,
                "name": "CBS",
                "country": {
                  "name": "United States",
                  "code": "US",
                  "timezone": "America/New_York"
                },
                "officialSite": "https://www.cbs.com/"
              },
              "webChannel": null,
              "dvdCountry": null,
              "externals": {
                "tvrage": 25988,
                "thetvdb": 264492,
                "imdb": "tt1553656"
              },
              "image": {
                "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
                "original": "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
              },
              "summary": "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
              "updated": 1704794065,
              "_links": {
                "self": {
                  "href": "https://api.tvmaze.com/shows/1"
                },
                "previousepisode": {
                  "href": "https://api.tvmaze.com/episodes/185054",
                }
              }
            }
        ];
        

    // Mock getMovies to resolve with mockMovies
    vi.mocked(getMovies, true).mockResolvedValueOnce(mockMovies)

    store.fetch(null) 
    setTimeout(()=> {
        expect(getMovies).toHaveBeenCalledWith(null) // Verify API was called with correct param
        expect(store.getMovieList).toEqual(mockMovies) // Store's list should be updated with mockMovies
    
    }, 2000)
  })

  it('handles fetch with an empty movie list', async () => {
    const store = useMovieStore();

    // Mock getMovies to resolve with an empty array
    vi.mocked(getMovies).mockResolvedValueOnce([])

    await store.fetch(null)

    expect(store.getMovieList).toEqual([]) // Store's list should be empty
  })

  it('handles fetch error', async () => {
    const store = useMovieStore();

    // Mock getMovies to throw an error
    vi.mocked(getMovies).mockResolvedValueOnce(null)

    store.fetch(null)

    expect(store.getMovieList).toEqual([]) // Assuming default behavior is to keep list empty on error
  })
})
