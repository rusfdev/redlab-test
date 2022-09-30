import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sDur, msDur } from 'assets/js/animation-duration'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({
  ease: 'power2.inOut',
  duration: sDur[4]
})

function fadeIn({ el, done, duration = sDur[1] }) {
  gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration, onComplete: done })
}

function fadeInLeft({ el, done, duration = sDur[2] }) {
  gsap.fromTo(el, { x: 50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration, ease: 'power2.out', onComplete: done })
}

function fadeOut({ el, done, duration = sDur[1] }) {
  gsap.to(el, { autoAlpha: 0, duration, onComplete: done })
}

function fadeOutLeft({ el, done, duration = sDur[2] }) {
  gsap.to(el, { x: -50, autoAlpha: 0, duration, ease: 'power2.out', onComplete: done })
}

export { gsap, ScrollTrigger, fadeIn, fadeOut, fadeInLeft, fadeOutLeft, sDur, msDur }
