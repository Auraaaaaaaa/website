const text = document.querySelector('.slide-in');
const sections = document.querySelectorAll('section');

const debounce = (func, wait = 20, immediate = true) => {
  let timeout;
  return () => {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const slideIn = () => {
  const slideInAt = (window.scrollY + window.innerHeight) - text.offsetHeight / 2;
  const textBottom = text.offsetTop + text.offsetHeight;
  const isHalfShown = slideInAt > text.offsetTop;
  const isNotScrolledPast = window.scrollY < textBottom;

  if (isHalfShown && isNotScrolledPast) {
    text.classList.add('active');
  } else {
    text.classList.remove('active');
  }
};

const changeColor = debounce(() => {
  const midHeight = window.scrollY + (window.innerHeight / 2);
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionBottom = sectionTop + sectionHeight;
    const isHalfShown = midHeight >= sectionTop + (sectionHeight / 3) && midHeight <= sectionBottom - (sectionHeight / 3);
    if (isHalfShown) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
});

window.addEventListener('scroll', () => {
  slideIn();
  changeColor();
});
