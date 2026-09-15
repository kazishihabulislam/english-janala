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

const getLessons =() =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displayLessons(data.data))
}

const displayLessons = (lessons) =>{
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = "";
    lessons.forEach(lesson => {
        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML = `
       <div class="card flex justify-center items-center">
       <button class="btn border-1 border-primary text-lg font-normal secondary-color "><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
       </div>
`
lessonContainer.append(lessonDiv)  })
}

getLessons();