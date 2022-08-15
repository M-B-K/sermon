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
    const apiUrl= "https://api.alquran.cloud/v1/meta";
    fetch(apiUrl).then(response => response.json()).then(data => {
        let surahs = data.data.surahs.references;
        let count = data.data.surahs.count
        for (let index = 0; index < count; index++) {
            surahscontnieer.innerHTML += `
            <div class="surah">
                <p>${surahs[index].name}</p>
                <p>${surahs[index].englishName}</p>
            </div>
            `;            
        }
        let surahtitle = document.querySelectorAll(".surah");
        let popup = document.querySelector(".popup");
        let ayatcontnieer = document.querySelector(".ayat");
        let headername = document.querySelector(".popup .close p");
        
        surahtitle.forEach((title, index)=>{
            title.addEventListener("click",()=>{
                fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`).then(response => response.json()).then(data => {
                    ayatcontnieer.innerHTML = "";
                    let ayatts =data.data.ayahs;
                    let indexe = index;
                    ayatts.forEach(ayatt=>{
                        popup.classList.add("active");
                        headername.innerText = `${data.data.name}`;
                        if(indexe == 0){
                            if(ayatt.numberInSurah == 1){
                                ayatcontnieer.innerHTML += `
                                <p>${ayatt.text} {${ayatt.numberInSurah }}</p>`
                            }
                            else {
                                ayatcontnieer.innerHTML += `
                                <span>${ayatt.text} {${ayatt.numberInSurah }} </span>`
                            }
                        }
                        else{
                            if(ayatt.numberInSurah == 1){
                                ayatcontnieer.innerHTML += `
                                <p>${ayatt.text} </p>`
                            }
                            else {
                                ayatcontnieer.innerHTML += `
                                <span>${ayatt.text} {${ayatt.numberInSurah -1}} </span>`
                            }

                        }
                        
                    })

                })
            })
        })
        let closepop = document.querySelector("i.fa-times");
        closepop.addEventListener("click",()=>{
            popup.classList.remove("active");
        })
    })
}