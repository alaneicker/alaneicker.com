(function () {
  const toggleMobileNav = () => {
    const mobileNav = document.querySelector('#main-nav');
    const isOpen = mobileNav.classList.contains('is-open');
    mobileNav.classList[isOpen ? 'remove' : 'add']('is-open');
  };

  // Sets initial active #main-nav menu item
  document.querySelector('#main-nav').children[0].classList.add('is-active');
  
  // Sets active #main-nav menu item on click
  Array.prototype.forEach.call(document.querySelectorAll('.jump-link'), link => {
    link.addEventListener('click', e => {
      const siblingLinks = e.target.parentElement.parentElement.children;
      [...siblingLinks].forEach(link => { link.classList.remove('is-active') });
      e.target.parentElement.classList.add('is-active');
      toggleMobileNav();
    });
  });

  // toggles mobile version of #main-nav
  document.querySelector('#mobile-nav-btn').addEventListener('click', toggleMobileNav);

  // Swipe detection to close mobile #main-nav
  document.body.addEventListener('swipeleft', toggleMobileNav);

  // Auto-selects #main-nav menu item on scroll
  document.querySelector('#layout-body').addEventListener('scroll', e => {

    const getTopOffset = id => {
      return document.querySelector(id).offsetTop - 60;
    };

    const setSelected = hash => {
      const element = document.querySelector('#main-nav > li > [href="' + hash + '"]');
      const siblingLinks = element.parentElement.parentElement.children;
      
      [...siblingLinks].forEach(link => { link.classList.remove('is-active') });
      
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

  // PWA setup
  const registerServiceWorker = () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => {
        console.log('[ServiceWorker] Registered');
      }).catch(err => {
        console.log('[ServiceWorker] Registration error', err);
      });
  };

  const addBeforeInstallPromtEvent = () => {
    window.addEventListener('beforeinstallprompt', e => {
          
      setTimeout(() => {
        e.prompt();
      }, 20000);
      
      e.userChoice.then(outcome => { 
        console.log(outcome);
      }, err => {
        console.log('Error: ', err);
      }); 
    });
  };

  ('serviceWorker' in navigator && registerServiceWorker());
  ('beforeinstallprompt' in window && addBeforeInstallPromtEvent());

  // Image lazy loading
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
  });
}());