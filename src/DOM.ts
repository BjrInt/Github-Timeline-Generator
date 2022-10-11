export type YearBounds = [number, number]

export type Contribution = null | number

/**
 * The max number of squares displayed in the timeline
 */
export const GRID_SIZE = 371

/**
 * Returns the first and last day (0 indexed) of a given year
 * ex: [ 2, 6 ] means that January 1st is a Tuesday and December 31st is a Saturday
 */
const getYearBoundaries = (year: number): YearBounds => {
  const startOffset = new Date(Date.UTC(year, 0, 1, 4, 0)).getDay()
  const endOffset = new Date(Date.UTC(year, 11, 31, 4, 0)).getDay()

  return [startOffset, endOffset]
}

/**
 * Returns an array of 371 boolean (53 weeks of 7 days)
 * starting from first sunday of the year to last saturday of the year.
 * Booleans are falsy for values that are not in the year
 */
export const getYearArray = (): boolean[] => {
  const [a, b] = getYearBoundaries(new Date().getUTCFullYear())

  const yearArray = Array.from({ length: GRID_SIZE }, () => true)
  return [
    ...yearArray.slice(0, 7).map((_x, i) => a <= i),
    ...yearArray.slice(7, GRID_SIZE - 7),
    ...yearArray.slice(-7).map((_x, i) => i <= b),
  ]
}

/**
 * Takes a stringified number as an argument and increment it by 1
 * up to 4 maixmum, else put back the value to 0.
 * Returns a String.
 */
export const increment = (n: string, incrementBy: number = 1): string => String((Number(n) + incrementBy) % 5)

/**
 * Returns a DOM contribution grid containing clickable squares for the current year,
 */
export const initDOMGrid = () => {
  const currentYear = getYearArray()
  const _timeline = document.createElement('section')
  _timeline.className = 'timeline'

  for (const date of currentYear) {
    const _div = document.createElement('div')

    _div.className = date ? 'contribution' : 'noop'
    _div.dataset.weight = '0'
    _div.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement) target.dataset.weight = increment(target.dataset.weight)
    })

    _timeline.appendChild(_div)
  }

  return _timeline
}

/**
 * Takes a DOM contribution grid as an argument and returns an array of number of contributions per day
 * (null for days not in the year )
 */
export const DOMGridToArray = (domGrid: HTMLElement): Contribution[] =>
  Array.from(domGrid.children).map((x: HTMLElement) => {
    if (x.className === 'contribution') return Number(x.dataset.weight)
    return null
  })

/**
 * Mutates an existing DOM grid, so that first and last day of the year are properly displayed
 */
export const changeYear = (year: number, domGrid: HTMLElement) => {
  const [a, b] = getYearBoundaries(year)
  const children = Array.from(domGrid.children)

  children.slice(0, 7).forEach((day, i) => (i < a ? (day.className = 'noop') : (day.className = 'contribution')))
  children.slice(-7).forEach((day, i) => (i > b ? (day.className = 'noop') : (day.className = 'contribution')))
}

/**
 * Takes a string as an argument and triggers a browser file download containing the argument.
 */
export const downloadFile = (fileContent: string) => {
  const downloadLink = document.createElement('a')
  downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent))
  downloadLink.setAttribute('download', 'setup.sh')
  downloadLink.style.display = 'none'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
