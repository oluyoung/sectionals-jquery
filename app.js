const TIME_OUT = 600 // It should be the same transition time of the sections
const sectionStickHeight = 20;
const sectionStickGap = 16;
const body = document.querySelector('body') // get body
const sectionsQty = document.querySelectorAll('section').length // get all sections or pages
const sectionStick = document.querySelector('.section-stick') // stick showing active page, should be clickable to scroll to page
let startFlag = true //
let initialScroll = window.scrollY
let current = 1,
  main = null,
  next = null

// Add child .stick elements in .section-stick as number of sections exist on page load
Array(sectionsQty)
  .fill()
  .forEach(() => {
    sectionStick.innerHTML = sectionStick.innerHTML + '<div class="stick"></div>'
  });


console.log('SLIDE', current)

// Listening to scroll event
window.onscroll = () => {
  if (startFlag) {
    // should scrollDown to next page if new scroll is greater than initial scroll
    const scrollDown = this.scrollY >= initialScroll
    const scrollLimit = current >= 1 && current <= sectionsQty
    // Verify that the scroll does not exceed the number of sections
    if (scrollLimit) {
      body.style.overflowY = 'hidden' // Lock el scroll during scroll
      if (scrollDown && current < sectionsQty) { // handle scroll down and overflow if last element
        main = document.querySelector(`section.s${current}`)
        next = document.querySelector(`section.s${current + 1}`)
        main.style.transform = 'translateY(-100vh)'; // the 100vh value should be customisable based on container height
        next.style.transform = 'translateY(0)'
        // increase current by 1 to denote next section
        current++
      } else if (!scrollDown && current > 1) { // handle scroll up and if first element
        main = document.querySelector(`section.s${current - 1}`)
        next = document.querySelector(`section.s${current}`)
        main.style.transform = 'translateY(0)'
        next.style.transform = 'translateY(100vh)' // the 100vh value should be customisable based on container height??
        // decrease current by 1 to denote next section
        current--
      }

      // Scroll progressbar
      const active = document.querySelector('.section-stick .stick.active')
      active.style.top = (sectionStickHeight + sectionStickGap) * (current - 1) + 'px'
    }

    // Wait for the scrolling to finish to reset the values
    setTimeout(() => {
      initialScroll = this.scrollY
      startFlag = true
      body.style.overflowY = 'scroll' // Unlock scroll
    }, TIME_OUT)
    startFlag = false
  }
  // Keep scrollbar in the middle of the viewport
  window.scroll(0, window.screen.height)
}


/*
  add methods: onScroll, onScrollEnd, onNextChange, onPrevChange
*/
