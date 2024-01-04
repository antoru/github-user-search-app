////////////////////////////////////////////////
///////////// dark mode ////////////////////////
////////////////////////////////////////////////

const darkModeButton = document.querySelector(".header__switch");
const element = document.body;
const header__switch__txt_el = document.querySelector('.header__switch__txt');

const darkModeFunction = () => {
    element.classList.toggle("dark-mode");
    const header__switch__txt = header__switch__txt_el.innerHTML.trim();
    const header__switch__txt_new = header__switch__txt === 'dark' ? 'light' : 'dark';
    header__switch__txt_el.textContent = header__switch__txt_new;
}

darkModeButton.addEventListener('click', darkModeFunction);

////////////////////////////////////////////////
///////////// search api ///////////////////////
////////////////////////////////////////////////

const search__input = document.querySelector('.search__input');
const search__button = document.querySelector('.search__button');
const result__img = document.querySelector('.result__img img');
const result__user = document.querySelector('.result__user');
const result__header__title = document.querySelector('.result__header__title');
const result__header__date = document.querySelector('.result__header__date');
const result__bio = document.querySelector('.result__bio');
const item__desc__repos = document.querySelector('.item__desc--repos');
const item__desc__followers = document.querySelector('.item__desc--followers');
const item__desc__following = document.querySelector('.item__desc--following');
const item__txt__location = document.querySelector('.js-location-txt');
const item__txt__twitter = document.querySelector('.js-twitter-txt');
const item__txt__blog = document.querySelector('.js-blog-txt');
const item__txt__company = document.querySelector('.js-company-txt');
const search__err = document.querySelector('.search__err');
const result = document.querySelector('.result');

const searchUser = async (user) => {

    const res = await fetch(`https://api.github.com/users/${user}`);
    const object = await res.json();
    const avatar_url = object.avatar_url;
    const name = object.name;
    const username = object.login;
    const bio = object.bio;
    const repos = object.public_repos;
    const followers = object.followers;
    const following = object.followers;
    const location = object.location;
    const twitter_username = object.twitter_username;
    const blog = object.blog;
    const company = object.company;
    const joined = object.created_at;
    const date = new Date(joined);
    const formattedDate = `Joined ${date.toDateString()}`;

    if (!username) {

        search__err.style.display = 'block';
        result.style.opacity = '0.05';

    } else {

        result.style.opacity = '1';
        search__err.style.display = 'none';

        result__img.src = avatar_url && avatar_url;
        result__user.textContent = username && username;
        result__header__title.textContent = name ? name : 'Not available';
        result__bio.textContent = bio ? bio : 'Not available';

        result__header__date.textContent = formattedDate;
        item__desc__repos.textContent = repos;
        item__desc__followers.textContent = followers;
        item__desc__following.textContent = following;

        if (location) {
            item__txt__location.textContent = location ? location : 'Not available';
        } else {
            item__txt__location.textContent = 'Not available';
            document.querySelectorAll('.footer__item')[0].classList.add('footer__item--notAvailable');
        }

        if (twitter_username) {
            item__txt__twitter.textContent = twitter_username;
        } else {
            item__txt__twitter.textContent = 'Not available';
            document.querySelectorAll('.footer__item')[1].classList.add('footer__item--notAvailable');
        }

        if (blog) {
            item__txt__blog.textContent = blog;
        } else {
            item__txt__blog.textContent = 'Not available';
            document.querySelectorAll('.footer__item')[2].classList.add('footer__item--notAvailable');
        }

        if (company) {
            item__txt__company.textContent = company;
        } else {
            item__txt__company.textContent = 'Not available';
            document.querySelectorAll('.footer__item')[3].classList.add('footer__item--notAvailable');
        }

    }

}

search__input.addEventListener("input", function () {
    result.style.opacity = '0.05';
});

search__button.addEventListener("click", function () {
    searchUser(search__input.value)
});

