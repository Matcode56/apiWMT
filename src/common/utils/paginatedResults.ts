import { Query, QueryResult } from 'pg'

export const paginatedResults = (query: QueryResult, numberOffset: number, totalElements: number) => {
  const dataLength: number = query.rows.length
  const remainingElements = totalElements - (numberOffset + dataLength)
  const nextPage: boolean = remainingElements > 0 ? true : false
  return {
    totalElements,
    nextPage,
  }
}

export interface PaginatedResults {
  totalElements: number
  nextPage: boolean
}
