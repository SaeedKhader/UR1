import React from 'react'
import { RouterProps } from 'react-router'
import { Route } from 'react-router-dom'
import { Book, Shelf, getAll, update } from './BooksAPI'
import BooksList from './components/BooksList'
import Header from './components/Header'
import SearchBox from './components/SearchBox'

interface ContextState {
  onUpdateBookShelf: (book: Book, shelf: Shelf, completion: () => void) => void
}

export const AppContext = React.createContext({} as ContextState)

interface State {
  books: Book[]
}

class App extends React.Component {
  state: State = {
    books: []
  }

  componentDidMount() {
    getAll().then((books: Book) => {
      this.setState(() => ({ books: books }))
    })
  }

  updateBookShelf = (book: Book, shelf: Shelf, completion: () => void) => {
    update(book, shelf)
      .then(() => {
        this.setState((prevState: State) => ({
          books:
            shelf === Shelf.none
              ? prevState.books.filter((b) => b.id !== book.id)
              : prevState.books.some((b) => b.id === book.id)
              ? prevState.books.map((b) =>
                  b.id === book.id ? { ...b, shelf } : b
                )
              : prevState.books.concat([{ ...book, shelf }])
        }))
      })
      .then(() => {
        completion()
      })
  }

  render() {
    const currentlyReading = this.state.books.filter(
      (book) => book.shelf === Shelf.currentlyReading
    )
    const wantToRead = this.state.books.filter(
      (book) => book.shelf === Shelf.wantToRead
    )
    const read = this.state.books.filter((book) => book.shelf === Shelf.read)

    return (
      <AppContext.Provider value={{ onUpdateBookShelf: this.updateBookShelf }}>
        <Header />
        <main className='container p-8 mx-auto space-y-12'>
          <BooksList
            shelf={Shelf.currentlyReading}
            title='Currently Reading'
            books={currentlyReading}
          />
          <BooksList
            shelf={Shelf.wantToRead}
            title='Want To Read'
            books={wantToRead}
          />
          <BooksList shelf={Shelf.read} title='Read' books={read} />
        </main>
        <Route
          path='/search'
          render={({ history }: RouterProps) => (
            <SearchBox
              books={this.state.books}
              onClose={() => {
                history.push('/')
              }}
            />
          )}
        />
      </AppContext.Provider>
    )
  }
}

export default App
