import { EventEmitter } from 'events'

// Linear interpolation
function lerp(a, b, n) {
  return (1 - n) * a + n * b
}

function distance(x1, y1, x2, y2) {
  const a = x1 - x2
  const b = y1 - y2
  return Math.hypot(a, b)
}

export default class Magnet extends EventEmitter {
  constructor(el) {
    super()
    // DOM elements
    // el: main button
    // text: inner text element

    this.DOM = { el: el }

    this.getMousePos()

    // amounts the button will translate/scale
    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.05 },
      ty: { previous: 0, current: 0, amt: 0.05 }
    }

    // button state (hover)
    this.state = {
      hover: false
    }
    // calculate size/position
    this.calculateSizePosition()
    // init events
    this.initEvents()
    // loop fn
    requestAnimationFrame(() => this.render())

  }

  getMousePos(event) {
    this.mousepos = {
      x: event?.clientX || 0,
      y: event?.clientY || 0
    }
  }

  calculateSizePosition() {
    // size/position
    this.rect = this.DOM.el.getBoundingClientRect()
    // the movement will take place when the distance from the mouse to the center of the button is lower than this value
    this.distanceToTrigger = this.rect.width * 0.85
  }

  initEvents() {
    this.onMousemove = (event) => this.getMousePos(event)
    window.addEventListener('mousemove', this.onMousemove)
  }

  clearEvents() {
    window.removeEventListener('mousemove', this.onMousemove)
  }

  render() {
    this.calculateSizePosition()
    // calculate the distance from the mouse to the center of the button
    const distanceMouseButton = distance(
      this.mousepos.x,
      this.mousepos.y,
      this.rect.left + this.rect.width / 2,
      this.rect.top + this.rect.height / 2
    )

    // new values for the translations and scale
    let x = 0
    let y = 0

    if ( distanceMouseButton < this.distanceToTrigger ) {
      if ( !this.state.hover ) {
        this.enter()
      }
      x = (this.mousepos.x - (this.rect.left + this.rect.width / 2 )) * 0.75
      y = (this.mousepos.y - (this.rect.top + this.rect.height / 2)) * 0.75
    }
    else if ( this.state.hover ) {
      this.leave()
    }

    this.renderedStyles['tx'].current = x
    this.renderedStyles['ty'].current = y

    for (const key in this.renderedStyles ) {
      this.renderedStyles[key].previous = lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].amt
      )
    }

    this.DOM.el.style.cssText = `
      --magnet-tx: ${this.renderedStyles['tx'].previous}px;
      --magnet-ty: ${this.renderedStyles['ty'].previous}px;
      transform: translate3d(var(--magnet-tx), var(--magnet-ty), 0);
    `

    requestAnimationFrame(() => this.render())
  }

  enter() {

  }

  leave() {

  }

  destroy() {
    this.clearEvents()
  }
}
