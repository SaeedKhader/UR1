import React from 'react'
import * as BooksAPI from '../BooksAPI'
import { debounce } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconLookup } from '@fortawesome/fontawesome-svg-core'
import SearchBoxResult from './SearchBoxResult'

interface ContextState {
  results: BooksAPI.Book[]
  setResults: (resutls: BooksAPI.Book[]) => void
}

export const SearchBoxContext = React.createContext({} as ContextState)

interface Props {
  books: BooksAPI.Book[]
  onClose: () => void
}

interface State {
  query: string
  results: BooksAPI.Book[]
  setResults: (results: BooksAPI.Book[]) => void
  isLoading: boolean
  noResults: boolean
}

class SearchBox extends React.Component<Props, State> {
  setResults = (results: BooksAPI.Book[]) => {
    this.setState(() => ({ results: results }))
  }

  state = {
    query: '',
    results: [],
    setResults: this.setResults,
    isLoading: false,
    noResults: false
  }

  searchInput: HTMLInputElement | null = null

  componentDidMount() {
    this.searchInput?.focus()
  }

  search = debounce((query: string) => {
    this.setState(() => ({
      isLoading: this.state.query !== '' ? true : false
    }))
    BooksAPI.search(query).then((books: BooksAPI.Book[]) => {
      if (Array.isArray(books)) {
        books.map((book) => {
          this.props.books.forEach((b) => {
            if (book.id === b.id) {
              book.shelf = b.shelf
            }
          })
          return book
        })
      }
      this.setState(() => ({
        results: Array.isArray(books) && this.state.query !== '' ? books : [],
        isLoading: false,
        noResults: !Array.isArray(books) && query !== ''
      }))
    })
  }, 200)

  updateQuery = (query: string) => {
    this.setState(() => ({
      query: query,
      noResults: false
    }))
    query !== ''
      ? this.search(query)
      : this.setState(() => ({
          results: []
        }))
  }

  render() {
    const searchIcon: IconLookup = { prefix: 'fas', iconName: 'search' }
    const loadingIcon: IconLookup = { prefix: 'fas', iconName: 'spinner' }
    return (
      <SearchBoxContext.Provider
        value={{
          results: this.state.results,
          setResults: this.state.setResults
        }}>
        <div
          onClick={this.props.onClose}
          className='fixed inset-0 flex items-start justify-center bg-black bg-opacity-20'>
          <div
            onClick={(e) => e.stopPropagation()}
            className='w-full max-w-3xl px-4 mt-24 overflow-hidden bg-white rounded-lg shadow-lg'>
            <div className='flex items-center px-2 space-x-2 text-green-600'>
              <FontAwesomeIcon
                icon={this.state.isLoading ? loadingIcon : searchIcon}
                pulse={this.state.isLoading ? true : false}
                fixedWidth={true}
              />
              <input
                ref={(inputEl) => (this.searchInput = inputEl)}
                className='w-full h-20 text-lg text-gray-800 rounded-t-lg focus:outline-none'
                placeholder='Search By Title Or Auther'
                value={this.state.query}
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
            {this.state.results.length > 0 && (
              <div className='py-2 space-y-2 overflow-y-scroll border-t max-h-72'>
                {this.state.results.map((book: BooksAPI.Book) => (
                  <SearchBoxResult key={book.id} book={book} />
                ))}
              </div>
            )}
            {this.state.noResults && (
              <p className='p-2 mb-1 text-gray-600 border-t'>
                No resutl found for "{this.state.query}"
              </p>
            )}
          </div>
        </div>
      </SearchBoxContext.Provider>
    )
  }
}

export default SearchBox
