export function testScreenHeight() {
  const check = function() {
    const sh = document.body.getBoundingClientRect().height
    document.documentElement.style.setProperty('--screen-height', `${sh}px`)
  }

  window.addEventListener('DOMContentLoaded', check)
  window.addEventListener('resize', check)
}

export function testScrollbarWidth() {
  const testDiv = document.createElement('div')
  testDiv.style.cssText = `
    position: fixed;
    width: 100%;
    overflow: scroll;
  `
  document.body.insertAdjacentElement('afterbegin', testDiv)

  const value = testDiv.offsetWidth - testDiv.clientWidth

  testDiv.remove()

  document.documentElement.style.setProperty('--scrollbar-width', `${value}px`)
}
