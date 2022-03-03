const auth ="0i-LvSnpQI2xW7tJEUP47Sa7UiCOZg48czCWJ9kmZkw";
const input = document.querySelector('input');
const searchBtn = document.querySelector('.fa-search');
const closeBtn = document.querySelector('.fa-times')

let search = false;
let query = "Java";

input.addEventListener('input', (e) => {
    e.preventDefault();
    query = e.target.value;
    clearSearch();

});


async function getData(query) {
    const data = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=${auth}`);
    const result = await data.json();
    result.results.forEach(photo => {
        const picterest = document.createElement('div');
        picterest.innerHTML = `<img src=${photo.urls.regular} class="image-result">
            <p>Photograph : ${photo.user.name}</p>
            <a href=${photo.urls.regular} class="download-link">download</a>
        `;
        document.querySelector('.image-galery').appendChild(picterest).classList.add('container-image')
    });
}

getData(query)

input.addEventListener('keypress', (e) => {
    if(e.key === "Enter") {
        addSearch()
    } 
})

function clearSearch() {
    if(input.value !== "") {
        closeBtn.classList.remove("active-close")
    }
    else {
        closeBtn.classList.add("active-close")
    }
}

clearSearch()

closeBtn.addEventListener('click', () => {
    input.value = "";
    closeBtn.classList.add("active-close")
})

searchBtn.addEventListener('click', addSearch)

function addSearch() {
    if(input.value === "") {
        return getData("")
    } else {
        clear()
        search = true;
        getData(query)
        input.value = query
    }
}

function clear() {
    input.value = "";
    document.querySelector('.image-galery').innerHTML = "";
}