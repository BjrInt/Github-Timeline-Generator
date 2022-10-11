import { changeYear, DOMGridToArray, downloadFile, initDOMGrid } from './DOM'
import { createGitHistory } from './git'
import './style.css'

const timeline = initDOMGrid()
document.getElementById('timeline_wrapper')?.appendChild(timeline)

document.getElementById('export_button')?.addEventListener('click', () => {
  const contributions = DOMGridToArray(timeline)
  const fileContent = createGitHistory(year, contributions)

  downloadFile(fileContent)
})

let year = new Date().getUTCFullYear()
const _yearSelect = document.getElementById('year_select')
if (_yearSelect instanceof HTMLInputElement) {
  _yearSelect.valueAsNumber = year
  _yearSelect.addEventListener('change', ({ target }) => {
    // @ts-ignore
    year = target.valueAsNumber
    changeYear(year, timeline)
  })
}
