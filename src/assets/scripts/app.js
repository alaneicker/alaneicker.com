document.querySelector('#main-nav').children[0].classList.add('is-active');

Array.prototype.forEach.call(document.querySelectorAll('.local-link'), function (link, i) {
  link.addEventListener('click', function (e) {
    const siblingLinks = e.target.parentElement.parentElement.children;
    [...siblingLinks].forEach(function (link) { link.classList.remove('is-active') });
    e.target.parentElement.classList.add('is-active');
  });
});

document.querySelector('#mobile-nav-btn').addEventListener('click', function () {
  const mobileNav = document.querySelector('#main-nav');
  const isOpen = mobileNav.classList.contains('is-open');
  mobileNav.classList[isOpen ? 'remove' : 'add']('is-open');
});

document.querySelector('#layout-body').addEventListener('scroll', function (e) {

  const getTopOffset = function (id) {
    return document.querySelector(id).offsetTop;
  };

  const setSelected = function (hash) {
    const element = document.querySelector('#main-nav > li > [href="' + hash + '"]');
    const siblingLinks = element.parentElement.parentElement.children;
    
    [...siblingLinks].forEach(function (link) { link.classList.remove('is-active') });
    
    element.parentElement.classList.add('is-active'); 
  };

  const scrollY = e.target.scrollTop;
  const skillsTopOffset = getTopOffset('#skills');
  const codeExperiementsTopOffset = getTopOffset('#code-experiments');
  const careerJourneyTopOffset = getTopOffset('#career-journey');
  const kudosTopOffset = getTopOffset('#kudos');

  let selectedNavItem = '#hero';

  if (scrollY >= skillsTopOffset) {
    selectedNavItem = '#skills';
  } 
  
  if (scrollY >= codeExperiementsTopOffset) {
    selectedNavItem = '#code-experiments';
  } 

  if (scrollY >= careerJourneyTopOffset) {
    selectedNavItem = '#career-journey';
  } 

  if (scrollY >= kudosTopOffset) {
    selectedNavItem = '#kudos';
  } 
  
  setSelected(selectedNavItem);
});