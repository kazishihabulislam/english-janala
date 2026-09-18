// const lessons = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/levels/all');
//     return res.json();
// }
// lessons().then(data => {
//     const lessonContainer = document.getElementById('lesson-container');
//     lessonContainer.innerHTML = data.data.map(lesson => `
//         <div class="card flex justify-center items-center">
//         <button class="btn border-1 border-primary text-lg font-normal secondary-color "><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
//         </div>
//     `).join('')

// });

const showSpinner = (status) => {
    if (status == true) {
        document.getElementById('loadingSpinner').classList.remove("hidden")
        document.getElementById('lesson-details-container').classList.add('hidden')
    } else {
        document.getElementById('loadingSpinner').classList.add("hidden")
        document.getElementById('lesson-details-container').classList.remove("hidden")

    }


}

const pronounceWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);

    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);
}

const createElements = (arr) =>
    arr
        .map(
            (element) => `
        <span class="btn bg-blue-100 rounded-sm mb-1 text-xl font-normal">
          ${element}
        </span>
      `
        )
        .join("");

const lessonButton = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn")
    lessonBtn.forEach(btn => btn.classList.remove('active-lesson'))
}

const loadWordLevel = (lessonId) => {
    showSpinner(true)
    const uri = (`https://openapi.programming-hero.com/api/level/${lessonId}`)
    fetch(uri)
        .then(res => res.json())
        .then(data => {
            lessonButton()
            const clickBtn = document.getElementById(`active-lesson-${lessonId}`)
            clickBtn.classList.add("active-lesson")
            getLessonDetails(data.data)
        })
}

const loadDetails = async (id) => {
    const url = (`https://openapi.programming-hero.com/api/word/${id}`)
    const res = await fetch(url)
    const details = await res.json()
    displayDetails(details.data)
}

const displayDetails = (details) => {
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = ""
    document.getElementById("details_modal").showModal()
    const detailsModal = document.createElement('div')
    console.log(details);
    detailsModal.innerHTML = `
                <div class="rounded-lg border-blue-100 border bg-gray-50 space-y-4 p-6">
                <h2 class="text-2xl font-bold font-bangla">${details.word ? details.word : " কোনো শব্দ পাওয়া যায়নি"} (<i class="fa-solid fa-microphone-lines"></i>: ${details.pronunciation} )</h2>
                <div>
                <p class="font-semibold text-xl mb-2">Meaning</p>
                <p class="text-2xl font-medium font-bangla">${details.meaning ? details.meaning : "অর্থ পাওয়া যায়নি"}</p>
                </div>
                <div>
                <p class="font-semibold text-xl">Example</p>
                <p class="text-xl font-normal font-bangla">${details.sentence ? details.sentence : "Sentence পাওয়া যায়নি"}</p>
                </div>
                <div class="space-y-2">
                <p class="font-semibold text-xl font-bangla">সমার্থক শব্দ গুলো</p>
                <div>${createElements(details.synonyms)}</div>
                </div>
                </div>
                `
    detailsContainer.append(detailsModal)
}

const getLessonDetails = (data) => {
    const lessonDetails = document.getElementById('lesson-details-container')
    lessonDetails.innerHTML = "";
    if (data.length == 0) {
        lessonDetails.innerHTML = `
        <div class="flex justify-center items-center mx-auto space-y-4 grow">
         <div class="flex  w-16 items-center justify-center">
         <img src="./assets/alert-error.png">
         </div>
         <div class="text-center">
         <h2 class="text-3xl py-2 font-bold text-base-content">
            No Vocabulary Available
         </h2>
         <p class="max-w-md text-sm leading-6 text-base-content/60">
          This lesson doesn't have any vocabulary words available yet.
         </p>
         <p class="max-w-md text-sm leading-6 text-base-content/60">Please try another lesson.</p></div>
    </div>
        
        `
        showSpinner(false)
        return
    }
    data.forEach(wordDetails => {
        const wordCard = document.createElement('div');
        wordCard.classList.add = "flex items-center mx-auto"
        wordCard.innerHTML = `
                <div class="card w-96 card-border bg-base-100">
                <div class="card-body text-center space-y-5">
                <h2 class="text-2xl font-bold">${wordDetails.word ? wordDetails.word : " কোনো শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold text-xl">Meaning / Pronunciation</p>
                <p class="text-2xl font-bold font-bangla">${wordDetails.meaning ? wordDetails.meaning : "অর্থ পাওয়া যায়নি"} / ${wordDetails.pronunciation}</p>
                <div class="card-actions flex justify-between items-center">
                <button id="details_${wordDetails.id}" onclick="loadDetails(${wordDetails.id})" class="rounded-full text-xl p-2 btn hover:bg-blue-400"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${wordDetails.word}')"  class="rounded-full text-xl p-2 btn hover:bg-blue-400"><i class="fa-solid fa-volume"></i></button>

            </div>
          </div>
        </div>
                `
        lessonDetails.append(wordCard)
        showSpinner(false)
    })
}

const getLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLessons(data.data))
}

const displayLessons = (lessons) => {
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML = `
       <div class="card flex justify-center items-center">
       <button id="active-lesson-${lesson.level_no}" onclick="loadWordLevel(${lesson.level_no})" class="btn lesson-btn border-1 border-primary text-lg font-normal secondary-color "><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
       </div>
`
        lessonContainer.append(lessonDiv)
    })
}
getLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    lessonButton();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    const url = ("https://openapi.programming-hero.com/api/words/all");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
            // console.log(filterWords);
            getLessonDetails(filterWords)
        })
})

// Footer section CurrentYear function 
const currentYear = document.getElementById("current-year");
currentYear.textContent = new Date().getFullYear();