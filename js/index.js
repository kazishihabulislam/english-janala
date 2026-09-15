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
const lessonButton = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn")
    lessonBtn.forEach(btn => btn.classList.remove('active-lesson'))
}





const loadWordLevel = (lessonId) => {
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


const getLessonDetails = (data) => {
    const lessonDetails = document.getElementById('lesson-details-container')
    lessonDetails.innerHTML = "";
    if (data.length == 0) {
        lessonDetails.innerHTML = `
        <div class="flex justify-center items-center flex-col space-y-4 grow">
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
    }
    data.forEach(wordDetails => {
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
                <div class="card w-96 card-border bg-base-100">
                <div class="card-body text-center space-y-5">
                <h2 class="text-2xl font-bold">${wordDetails.word ? wordDetails.word : " কোনো শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-semibold text-xl">Meaning / Pronunciation</p>
                <p class="text-2xl font-bold font-bangla">${wordDetails.meaning ? wordDetails.meaning : "অর্থ পাওয়া যায়নি"} / ${wordDetails.pronunciation}</p>
                <div class="card-actions flex justify-between items-center">
                <button class="rounded-full text-xl p-2 btn hover:bg-blue-400"><i class="fa-solid fa-circle-info"></i></button>
                <button class="rounded-full text-xl p-2 btn hover:bg-blue-400"><i class="fa-solid fa-volume"></i></button>

            </div>
          </div>
        </div>
                `
        lessonDetails.append(wordCard)
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
