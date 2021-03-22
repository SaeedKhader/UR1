import React from 'react'
import { Book, Shelf } from '../BooksAPI'
import { IconLookup } from '@fortawesome/fontawesome-svg-core'
import Action from './Action'
import ActionsContainer from './ActionsContainer'

interface Props {
  book: Book
}

class BookThumbnail extends React.Component<Props> {
  timesIcon: IconLookup = { prefix: 'fas', iconName: 'times' }

  render() {
    const { book } = this.props
    return (
      <div
        className='relative w-56 py-4 mt-16 transition-transform transform group bg-gradient-to-t from-white to-gray-50 rounded-2xl hover:scale-105'
        style={{ boxShadow: '0px 10px 10px 0px rgba(50, 50, 50, 0.02)' }}>
        <div className='relative'>
          <img
            className='mx-auto -mt-16 rounded-md h-36 '
            src={book.imageLinks?.smallThumbnail}
            alt={book.title}
            style={{ boxShadow: '0px 6px 6px 0px rgba(50, 50, 50, 0.1)' }}
          />
          <Action
            title='Delete'
            shelf={Shelf.none}
            icon={this.timesIcon}
            book={book}
            alwaysShow={true}
          />
        </div>
        <h4 className='px-4 mt-4 mb-1 text-sm font-semibold text-center text-gray-800 truncate'>
          {book.title}
        </h4>
        <p className='px-4 mb-2 text-sm text-center text-gray-500'>
          {book.authors[0]}
        </p>
        <ActionsContainer book={book} showAllAction={false} />
      </div>
    )
  }
}

export default BookThumbnail
