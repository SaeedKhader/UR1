import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconLookup } from '@fortawesome/fontawesome-svg-core'
import { Book, Shelf } from '../BooksAPI'
import { AppContext } from '../App'
import { SearchBoxContext } from './SearchBox'

interface Props {
  book: Book
  shelf: Shelf
  title: string
  icon: IconLookup
  alwaysShow: boolean
}
interface State {
  isLoading: boolean
}

class Action extends React.Component<Props, State> {
  state = { isLoading: false }

  loadingIcon: IconLookup = { prefix: 'fas', iconName: 'spinner' }

  componentWillUnmount() {
    this.setState = () => {
      return
    }
  }

  render() {
    const { book, title, icon, alwaysShow } = this.props

    return (
      <AppContext.Consumer>
        {({ onUpdateBookShelf }) => (
          <SearchBoxContext.Consumer>
            {({ results, setResults }) => (
              <>
                {(book.shelf !== this.props.shelf || alwaysShow) && (
                  <button
                    title={title}
                    onClick={() => {
                      this.setState(() => ({
                        isLoading: true
                      }))
                      onUpdateBookShelf(
                        book,
                        book.shelf !== this.props.shelf
                          ? this.props.shelf
                          : Shelf.none,
                        () => {
                          this.setState((prefState: State) => ({
                            isLoading: false
                          }))
                          if (alwaysShow && this.props.shelf !== Shelf.none) {
                            const shelf =
                              book.shelf !== this.props.shelf
                                ? this.props.shelf
                                : Shelf.none
                            setResults(
                              results.map((result) =>
                                result.id === book.id
                                  ? { ...book, shelf }
                                  : result
                              )
                            )
                          }
                        }
                      )
                    }}
                    className={
                      this.props.shelf !== Shelf.none
                        ? `${
                            book.shelf === this.props.shelf &&
                            'ring-2 ring-green-600'
                          } text-gray-500 bg-white rounded-full w-7 h-7 hover:text-green-600`
                        : 'absolute opacity-70 hover:opacity-100 -top-3.5 left-0 items-center justify-center hidden text-white bg-red-500 rounded-full w-7 h-7 group-hover:flex'
                    }>
                    <FontAwesomeIcon
                      icon={this.state.isLoading ? this.loadingIcon : icon}
                      pulse={this.state.isLoading ? true : false}
                      fixedWidth={true}
                      color={'currentColor'}
                    />
                  </button>
                )}
              </>
            )}
          </SearchBoxContext.Consumer>
        )}
      </AppContext.Consumer>
    )
  }
}

export default Action
