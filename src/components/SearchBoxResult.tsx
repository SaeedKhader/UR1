import React from 'react'
import { Book } from '../BooksAPI'
import ActionsContainer from './ActionsContainer'

interface Props {
  book: Book
}

class SearchBoxResult extends React.Component<Props> {
  render() {
    const { book } = this.props
    return (
      <div className='flex items-center justify-between w-full pr-2 space-x-2 rounded-md hover:bg-gray-50'>
        <div className='flex space-x-2'>
          {book.imageLinks ? (
            <img
              className='h-16 rounded-md'
              src={book.imageLinks.smallThumbnail}
              alt='No Cover Found'
            />
          ) : (
            <div className='h-16 bg-gray-300 rounded-md w-11' />
          )}
          <div className='pb-2 mt-auto'>
            <h5 className='font-bold text-gray-700'>{book.title}</h5>
            {book.authors && this.authers(book.authors)}
          </div>
        </div>
        <ActionsContainer book={book} showAllAction={true} />
      </div>
    )
  }

  authers = (authors: string[]) => {
    return (
      <p className='text-sm text-gray-500 truncate'>
        {authors.map(
          (a, i) =>
            `${a}${authors.length > 1 && i + 1 !== authors.length ? ', ' : ''}`
        )}
      </p>
    )
  }
}

export default SearchBoxResult
