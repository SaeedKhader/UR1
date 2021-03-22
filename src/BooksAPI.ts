const api = 'https://reactnd-books-api.udacity.com'

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  Accept: 'application/json',
  Authorization: token
}

export const get = (bookId: string) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => data.books)

export const update = (book: Book, shelf: Shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then((res) => res.json())

export const search = (query: string) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
    .then((res) => res.json())
    .then((data) => data.books)

interface IndustryIdentifier {
  type: string
  identifier: string
}

interface ReadingModes {
  text: boolean
  image: boolean
}

interface PanelizationSummary {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}

export interface Book {
  title: string
  subtitle: string
  authors: string[]
  publisher: string
  publishedDate: string
  description: string
  industryIdentifiers: IndustryIdentifier[]
  readingModes: ReadingModes
  pageCount: number
  printType: string
  categories: string[]
  averageRating: number
  ratingsCount: number
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks?: ImageLinks
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
  id: string
  shelf: Shelf
}

export enum Shelf {
  currentlyReading = 'currentlyReading',
  wantToRead = 'wantToRead',
  read = 'read',
  none = 'none'
}
