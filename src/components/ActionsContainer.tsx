import React from 'react'
import { IconLookup } from '@fortawesome/fontawesome-svg-core'
import { Shelf, Book } from '../BooksAPI'
import Action from './Action'

interface Props {
  showAllAction: boolean
  book: Book
}
class ActionsContainer extends React.Component<Props> {
  glassesIcon: IconLookup = { prefix: 'fas', iconName: 'glasses' }
  handSpIcon: IconLookup = { prefix: 'fas', iconName: 'hand-sparkles' }
  checkIcon: IconLookup = { prefix: 'fas', iconName: 'check' }

  render() {
    return (
      <div
        className={
          this.props.showAllAction
            ? 'flex ml-auto space-x-2'
            : 'absolute bottom-0 items-center hidden h-10 p-2 mx-auto space-x-2 transform translate-y-1/2 bg-black -right-2 bg-opacity-5 rounded-2xl group-hover:flex'
        }>
        <Action
          title='Move to Currently Reading'
          icon={this.glassesIcon}
          shelf={Shelf.currentlyReading}
          book={this.props.book}
          alwaysShow={this.props.showAllAction}
        />
        <Action
          title='Move to Want to Read'
          icon={this.handSpIcon}
          shelf={Shelf.wantToRead}
          book={this.props.book}
          alwaysShow={this.props.showAllAction}
        />
        <Action
          title='Move to Read'
          icon={this.checkIcon}
          shelf={Shelf.read}
          book={this.props.book}
          alwaysShow={this.props.showAllAction}
        />
      </div>
    )
  }
}

export default ActionsContainer
