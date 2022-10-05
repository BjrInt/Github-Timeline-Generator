import { Contribution } from './DOM'

enum Increments {
  DAY = 1000 * 60 * 60 * 24,
  MINUTES = 1000 * 60 * 5,
}

const increaseDate = (date: Date, increment: Increments) => {
  return new Date(date.getTime() + increment)
}

export const createGitHistory = (year: number, contributions: Contribution[]) => {
  let currentDate = new Date(Date.UTC(year, 0, 1, 4, 0))
  let buffer = `git init\ntouch dump.txt\n`

  for (const contribution of contributions) {
    if (contribution !== null) {
      for (let i = 0; i < 4 * contribution; i++) {
        const commitMessage = (15000 + Math.random() * 15000).toString(16).replace('.', '')
        buffer += `echo "${commitMessage}" >> dump.txt\ngit add dump.txt\ngit commit -m '${commitMessage}' --date=${currentDate.toISOString()}\n`
        currentDate = increaseDate(currentDate, Increments.MINUTES)
      }

      currentDate.setUTCHours(4)
      currentDate = increaseDate(currentDate, Increments.DAY)
    }
  }

  return buffer
}
