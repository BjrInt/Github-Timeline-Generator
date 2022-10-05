export type YearBounds = [number, number]

export type Contribution = null | number

export const GRID_SIZE = 7 * 53

const getYearBoundaries = (year: number): YearBounds => {
  const startOffset = new Date(Date.UTC(year, 0, 1, 4, 0)).getDay()
  const endOffset = GRID_SIZE - (7 - startOffset)

  return [startOffset, endOffset]
}

export const getYearArray = (): boolean[] => {
  const [a, b] = getYearBoundaries(new Date().getUTCFullYear())

  return Array.from({ length: GRID_SIZE }, (_x, i) => i < a || i > b)
}

export const increment = (n: string, incrementBy: number = 1): string => String((Number(n) + incrementBy) % 5)

export const initDOMGrid = () => {
  const currentYear = getYearArray()
  const _timeline = document.createElement('section')
  _timeline.className = 'timeline'

  for (const date of currentYear) {
    const _div = document.createElement('div')

    _div.className = date ? 'noop' : 'contribution'
    _div.dataset.weight = '0'
    _div.addEventListener('click', ({ target }) => {
      if (target instanceof HTMLElement) target.dataset.weight = increment(target.dataset.weight)
    })

    _timeline.appendChild(_div)
  }

  return _timeline
}

export const DOMGridToArray = (domGrid: HTMLElement): Contribution[] =>
  Array.from(domGrid.children).map((x: HTMLElement) => {
    if (x.className === 'contribution') return Number(x.dataset.weight)
    return null
  })

export const changeYear = (year: number, domGrid: HTMLElement) => {
  const [a, b] = getYearBoundaries(year)
  const children = Array.from(domGrid.children)

  children.slice(0, 7).forEach((day, i) => (i < a ? (day.className = 'noop') : (day.className = 'contribution')))
  children
    .slice(-7)
    .forEach((day, i) => (GRID_SIZE - (7 - i) > b ? (day.className = 'noop') : (day.className = 'contribution')))
}
