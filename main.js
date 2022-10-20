/*********************************** Active Header When ScrollY > 100  ****************************************/

let fixednav = document.querySelector(".header");
window.addEventListener("scroll", () => {
  window.scrollY > 100
    ? fixednav.classList.add("active")
    : fixednav.classList.remove("active");
});

/*********************************** Responsive Navbar  ****************************************/
let list = document.querySelector(".header ul");
let nav_icon = document.querySelector(".header .bars");

nav_icon.addEventListener("click", () => {
  list.classList.toggle("active");

  if (list.classList.contains("active") == true) {
    fixednav.classList.add("active");
  } else if (
    list.classList.contains("active") == false &&
    window.scrollY < 100
  ) {
    fixednav.classList.remove("active");
  }
});

/*********************************** Exeplore Button  ****************************************/
let exploreBtn = document.querySelector(".title .btn");
let ahadithsection = document.querySelector(".ahadith");
exploreBtn.addEventListener("click", () => {
  ahadithsection.scrollIntoView({
    behavior: "smooth",
  });
});

/************************************** Up Button  *******************************************/
let span = document.querySelector(".up");
window.onscroll = function () {
  this.scrollY >= 200
    ? span.classList.add("show")
    : span.classList.remove("show");
};

span.onclick = function () {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

/*********************************** Go Section When Link Is clickable  ****************************************/
let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".header ul li");

links.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".header ul li.active").classList.remove("active");
    link.classList.add("active");
    let target = link.dataset.filter;
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

/*********************************** Get aHadith From Api ****************************************/
let ahadithcontnieer = document.querySelector(".ahadithcontnieer");
let ahadith_next = document.querySelector(".ahadith .bottun .next");
let ahadith_prev = document.querySelector(".ahadith .bottun .prev");
let ahadith_number = document.querySelector(".ahadith .bottun .number");
let hadithindex = 0;
hadithchanger();
function hadithchanger() {
  const apiUrl =
    "https://www.hadithapi.com/api/hadiths?apiKey=$2y$10$NnJbDjV2YFeiaii4ORQteezEUzRtLYcXrqedlLgpdhR1s9FKhu";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let hadiths = data.hadiths.data;
      gethadith();
      ahadith_next.addEventListener("click", () => {
        hadithindex == 24 ? (hadithindex = 0) : hadithindex++;
        gethadith();
      });
      ahadith_prev.addEventListener("click", () => {
        hadithindex == 0 ? (hadithindex = 24) : hadithindex--;
        gethadith();
      });
      function gethadith() {
        ahadithcontnieer.innerText = hadiths[hadithindex].hadithArabic;
        ahadith_number.innerText = `25 / ${hadithindex + 1}`;
      }
    });
}

/*********************************** Get Quran From Api ****************************************/
let surahscontnieer = document.querySelector(".surahcontnieer");
getsurah();
function getsurah() {
  const apiUrl = "https://api.alquran.cloud/v1/meta";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let surahs = data.data.surahs.references;
      let quran_next = document.querySelector(".quran .bottun .next");
      let quran_prev = document.querySelector(".quran .bottun .prev");
      let quran_number = document.querySelector(".quran .bottun .number");
      let surahindex = 0;
      let end, start;
      let surahtitle;
      getsurah();

      quran_next.addEventListener("click", () => {
        surahindex == 100
          ? (surahindex += 14)
          : surahindex == 114
          ? (surahindex = 0)
          : (surahindex += 20);
        getsurah();
      });
      quran_prev.addEventListener("click", () => {
        surahindex == 14
          ? (surahindex = 0)
          : surahindex == 0
          ? (surahindex = 114)
          : (surahindex -= 20);
        getsurah();
      });
      function getsurah() {
        start = surahindex == 114 ? (start = 0) : (start = surahindex);
        end =
          surahindex == 100
            ? (end = surahindex + 14)
            : surahindex == 114
            ? (end = 20)
            : (end = surahindex + 20);
        quran_number.innerText = `${start} الى ${end}`;
        surahscontnieer.innerHTML = ``;
        let x;
        end - start == 14 ? (x = 14) : (x = 20);
        for (start; start < end; start++) {
          surahscontnieer.innerHTML += `
                <div class="surah">
                    <p>${surahs[start].name}</p>
                    <p>${surahs[start].englishName}</p>
                </div>`;
        }
        surahtitle = document.querySelectorAll(".surah");
        let popup = document.querySelector(".popup");
        let help = document.querySelector(".help");
        let ayatcontnieer = document.querySelector(".ayat");
        let headername = document.querySelector(".popup .close p");

        surahtitle.forEach((title, index) => {
          title.addEventListener("click", () => {
            help.classList.add("active");
            fetch(`https://api.alquran.cloud/v1/surah/${index + 1 + end - x}`)
              .then((response) => response.json())
              .then((data) => {
                ayatcontnieer.innerHTML = "";
                let ayatts = data.data.ayahs;
                let indexe = index;
                ayatts.forEach((ayatt) => {
                  popup.classList.add("active");

                  headername.innerText = `${data.data.name}`;
                  if (indexe == 0) {
                    if (ayatt.numberInSurah == 1) {
                      ayatcontnieer.innerHTML += `
                                    <p style="text-align: center;">${ayatt.text} {${ayatt.numberInSurah}}</p>`;
                    } else {
                      ayatcontnieer.innerHTML += `
                                    <span >${ayatt.text} {${ayatt.numberInSurah}} </span>`;
                    }
                  } else {
                    if (ayatt.numberInSurah == 1) {
                      ayatcontnieer.innerHTML += `
                                    <p style="text-align: center;">${ayatt.text} </p>`;
                    } else {
                      ayatcontnieer.innerHTML += `
                                    <span>${ayatt.text} {${
                        ayatt.numberInSurah - 1
                      }} </span>`;
                    }
                  }
                });
              });
          });
        });
        let closepop = document.querySelector("i.fa-times");
        closepop.addEventListener("click", () => {
          popup.classList.remove("active");
          help.classList.remove("active");
        });
      }
    });
}

/*********************************** Get Prayer-Time From Api ****************************************/
let boxs = document.querySelector(".praycontnieer .boxs");
getpraytime();
function getpraytime() {
  fetch(
    " https://api.aladhan.com/v1/timingsByCity?city=syria&country=aleppo%20Emirates&method=8"
  )
    .then((response) => response.json())
    .then((data) => {
      let timings = data.data.timings;
      // boxs.innerHTML = ""
      for (let time in timings) {
        boxs.innerHTML += `
            <div class="box">
                <p class="time">
                    ${timings[time]}
                </p>
                <p class="name">
                    ${time}
                </p>
            </div>`;
      }
    });
}

/*************************************************** Page Loader ****************************************************/
let loader = document.getElementById("preLoader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});
