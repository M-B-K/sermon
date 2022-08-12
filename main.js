// header
let fixednav = document.querySelector(".header");
window.addEventListener("scroll",()=>{
    window.scrollY >100? fixednav.classList.add("active"): fixednav.classList.remove("active");
})

// api
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


// header btn
// let list = document.querySelectorAll(".header .contnieer ul li")
// for(let i = 0; i<list.length; i++){
//     list[i].classList.remove("active")
//     list[i].addEventListener("click",()=>{
//         list[i].classList.add("active")
        
//     })
// }

// console.log(list)
// let ahdithBtn = document.querySelector(".title .btn");
// ahdithBtn.addEventListener('click',()=>{
// ahadithsection.scrollIntoView({
//     behavior: "smooth"
// })
// })