import { changeYear, DOMGridToArray, initDOMGrid } from './DOM'
import { createGitHistory } from './git'
import './style.css'

let year = 2022
const timeline = initDOMGrid()
document.getElementById('timeline_wrapper')?.appendChild(timeline)

document.getElementById('export_button')?.addEventListener('click', () => {
  const contributions = DOMGridToArray(timeline)
  const fileContent = createGitHistory(year, contributions)

  const downloadLink = document.createElement('a')
  downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContent))
  downloadLink.setAttribute('download', 'setup.sh')
  downloadLink.style.display = 'none'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
})

document.getElementById('year_select')?.addEventListener('change', ({ target }) => {
  if (target instanceof HTMLInputElement) {
    year = target.valueAsNumber
    changeYear(year, timeline)
  }
})
