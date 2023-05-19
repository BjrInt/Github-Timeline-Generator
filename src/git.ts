import { Contribution } from './DOM'

enum Increments {
  DAY = 1000 * 60 * 60 * 24,
  MINUTES = 1000 * 60 * 5,
}

/**
 * Takes a Date as an argument and increment it with a given timestamp
 */
const increaseDate = (date: Date, increment: Increments) => new Date(date.getTime() + increment)

/**
 * Generates a script file with git commits for a given year.
 */
export const createGitHistory = (year: number, contributions: Contribution[]): string => {
  let currentDate = new Date(Date.UTC(year, 0, 1, 4, 0))
  let buffer = `git init\ntouch dump.txt\n`

  for (const contribution of contributions) {
    if (contribution !== null) {
      const randomBytes = crypto.getRandomValues(new Uint8Array(4 * contribution))
      for (let i = 0; i < 4 * contribution; i++) {
        const randomByte = randomBytes[i].toString(16)
        buffer += `echo "${randomByte}" >> dump.txt\ngit add dump.txt\ngit commit -m 'add: ${randomByte}' --date=${currentDate.toISOString()}\n`
        currentDate = increaseDate(currentDate, Increments.MINUTES)
      }

      currentDate.setUTCHours(4)
      currentDate = increaseDate(currentDate, Increments.DAY)
    }
  }

  return buffer
}
