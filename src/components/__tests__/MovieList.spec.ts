
import { mount } from "@vue/test-utils";
import MovieList from "../MovieList.vue";

import { nextTick } from 'vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import MovieCard from '@/components/MovieCard.vue'

// Mock data
const mockMovieList = [
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
          "name": "The Enemy Within"
        }
      }
    }
]

const mockStore = {
  getMovieList: mockMovieList,
  fetch: vi.fn(),
  setSelectedMovie: vi.fn(),
}

// Mock the `useMovieStore` composable to return our mock store object
vi.mock('@/store/movie.store', () => ({
  useMovieStore: () => mockStore,
}))

describe('MovieList', () => {
  beforeEach(() => {
    // Reset mock functions and data before each test to ensure isolation
    mockStore.fetch.mockClear()
    mockStore.setSelectedMovie.mockClear()
    mockStore.getMovieList = mockMovieList  // Reset to default mock data
  })

  it('fetches movies on mount', async () => {
    mount(MovieList)
    
    // Ensure fetch is called on component mount
    expect(mockStore.fetch).toHaveBeenCalledWith(null)
  })

  it('renders the list of movies when getMovieList is populated', async () => {
    const wrapper = mount(MovieList)

    // Wait for computed properties to update
    await nextTick()

    // Check that each movie is rendered with MovieCard component
    const movieCards = wrapper.findAllComponents(MovieCard)
    expect(movieCards.length).toBe(mockMovieList.length)
  })

  it('renders no movies when getMovieList is empty', async () => {
    // Mock an empty movie list
    mockStore.getMovieList = []

    const wrapper = mount(MovieList)
    await nextTick()

    // Check that no MovieCard components are rendered
    const movieCards = wrapper.findAllComponents(MovieCard)
    expect(movieCards.length).toBe(0)
  })

  it('calls setSelectedMovie with the correct movie data when a movie is clicked', async () => {
    const wrapper = mount(MovieList)

    // Wait for movies to render
    await nextTick()

    // Simulate clicking on the first movie
    await wrapper.find('button').trigger('click')

    // Verify setSelectedMovie is called with the correct data
    expect(mockStore.setSelectedMovie).toHaveBeenCalledWith(mockMovieList[0])
  })

  it('simulates fetch throwing an error', async () => {
    // Mock fetch to throw an error
    mockStore.fetch.mockImplementationOnce(() => {
      throw new Error('Fetch failed')
    })

    // Mount the component and check if error handling works
    try {
      mount(MovieList)
      await nextTick()
    } catch (e: any) {
      expect(e.message).toBe('Fetch failed')
    }
  })
})