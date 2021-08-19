const navList = document.querySelectorAll('#nav_bar ul li a');

const intersectionObserver = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio < 0.9) {return}
    navList.forEach( e => {
        e.classList.remove('current_nav')
        if(e.hash === `#${entries[0].target.id.split('_')[0]}`){
            e.classList.add('current_nav');
            history.replaceState(undefined, undefined, e.hash);

        }
    })
  }, {threshold: 0.9});

intersectionObserver.observe(document.getElementById('home__container'));
intersectionObserver.observe(document.getElementById('projects__title'));
intersectionObserver.observe(document.getElementById('about__title'));
intersectionObserver.observe(document.getElementById('contact__title'));


const getRepos = async (url) =>{
    try{
        const response = await fetch(url);
        const data = await response.json();
        const repoContainer = document.querySelector('#projects__git_list');
        let holder = ``;
        data.forEach(e => {
            if(e.name === "TZawalich"){return}
            holder +=(`<li>
                <a href="${e.html_url}" target="_blank">
                    <span class="bold">${e.name.replace(/-|_/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, e => e.toUpperCase())}</span>: ${e.description}
                </a>
            </li>`)
        });
        repoContainer.innerHTML = holder
    }catch(e){
        console.log(e, 'Oops, I am an Error')
    }
}

getRepos('https://api.github.com/users/TZawalich/repos')


document.getElementById('nav_bar__mobile_toggle').addEventListener("click", ()=>{
    document.querySelector("#nav_bar ul").classList.toggle("hide_mobile");
})