import React from 'react'
import { Book, Shelf } from '../BooksAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconLookup, IconName } from '@fortawesome/fontawesome-svg-core'
import BookThumbnail from './BookThumbnail'

interface Props {
  title: string
  books: Book[]
  shelf: Shelf
}

class BooksList extends React.Component<Props> {
  render() {
    const icon: IconLookup = { prefix: 'fas', iconName: this.getIconName() }
    const { title, books } = this.props
    return (
      <section className='w-full'>
        <h1 className='text-2xl font-bold text-gray-800'>
          <FontAwesomeIcon
            className='mr-2'
            icon={icon}
            fixedWidth={true}
            color={'currentColor'}
          />
          {title}
        </h1>
        <div
          className='container flex max-w-full mx-auto mt-6 space-x-8 rounded-lg'
          style={{ minHeight: '224px' }}>
          {books.map((book) => (
            <BookThumbnail key={book.id} book={book} />
          ))}
        </div>
      </section>
    )
  }

  getIconName: () => IconName = () => {
    switch (this.props.shelf) {
      case Shelf.currentlyReading:
        return 'glasses'
      case Shelf.wantToRead:
        return 'hand-sparkles'
      case Shelf.read:
        return 'check'
      default:
        return 'book'
    }
  }
}

export default BooksList
