document.querySelector('#main-nav').children[0].classList.add('is-active');

Array.prototype.forEach.call(document.querySelectorAll('.local-link'), function (link, i) {
  link.addEventListener('click', function (e) {
    const siblingLinks = e.target.parentElement.parentElement.children;
    [...siblingLinks].forEach(function (link) { link.classList.remove('is-active') });
    e.target.parentElement.classList.add('is-active');
  });
});