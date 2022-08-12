// header scroll
let fixednav = document.querySelector(".header");
window.addEventListener("scroll",()=>{
    window.scrollY >100? fixednav.classList.add("active"): fixednav.classList.remove("active");
})

// hadith api
let ahadithcontnieer = document.querySelector(".ahadithcontnieer");
let next = document.querySelector(".bottun .next");
let prev = document.querySelector(".bottun .prev");
let number = document.querySelector(".bottun .number");
let hadithindex = 0;
hadithchanger();
function hadithchanger(){
    // https://www.hadithapi.com/docs/hadiths
    const apiUrl= "https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$NnJbDjV2YFeiaii4ORQteezEUzRtLYcXrqedlLgpdhR1s9FKhu";
    fetch(apiUrl).then(response => response.json()).then(data => {
        let hadiths = data.hadiths.data;
        // console.log(hadiths);
        gethadith();
        next.addEventListener('click',()=>{
            hadithindex == 24 ? hadithindex = 0 : hadithindex++;
            gethadith();
        })
        prev.addEventListener('click',()=>{
            hadithindex == 0 ? hadithindex = 24 : hadithindex--;
            gethadith();
        })
        function gethadith(){
            ahadithcontnieer.innerText = hadiths[hadithindex].hadithArabic;
            number.innerText = `25 / ${hadithindex + 1}`
        }
    })
}

// explore btn
let exploreBtn = document.querySelector(".title .btn");
let ahadithsection = document.querySelector(".ahadith");
exploreBtn.addEventListener('click',()=>{
ahadithsection.scrollIntoView({
    behavior: "smooth"
})
})


// header link
let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".header ul li");

links.forEach(link =>{
    link.addEventListener("click",()=>{
        document.querySelector(".header ul li.active").classList.remove("active");
        link.classList.add("active");
        let target = link.dataset.filter;
        sections.forEach(section=>{
            if(section.classList.contains(target)){
                section.scrollIntoView({
                    behavior: "smooth"
                })
            }
        })
    })
})

// http://api.alquran.cloud/v1/meta

let surahscontnieer = document.querySelector(".surahcontnieer")
getsurah();
function getsurah(){
    // https://www.hadithapi.com/docs/hadiths
    const apiUrl= "http://api.alquran.cloud/v1/meta";
    fetch(apiUrl).then(response => response.json()).then(data => {
        let surahs = data.data.surahs.references;
        let count = data.data.surahs.count
        console.log(count)
        for (let index = 0; index < count; index++) {
            surahscontnieer.innerHTML += `
            <div class="surah">
                <p>${surahs[index].name}</p>
                <p>${surahs[index].englishName}</p>
            </div>
            `
            
        }
    })
}