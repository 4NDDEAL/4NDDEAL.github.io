function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.add('hidden');
    });

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('nav-item-active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }

    const targetBtn = document.getElementById('btn-' + pageId);
    if (targetBtn) {
        targetBtn.classList.add('nav-item-active');
    }
}

function renderProjects(data , type) {
    const container = type==="highschool" ? document.getElementById('highschool-achievements-content') : document.getElementById('university-achievements-content');
    
    if (!container) return; 

    let htmlContent = "";

    data.forEach((project, index) => {
        htmlContent += `
            <section>
                <p class="achievements-name">${project.title}</p>
                <p class="section-subtitle">${project.subtitle}</p>
        `;

        if(project.role != undefined){
            htmlContent += `
                <p>
                    <span class="section-description-header"> Role: </span>
                    <span class="section-subtitle"> ${project.role} </span> 
                </p>
            `;
        }

        htmlContent += `
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        `;

        project.images.forEach(img => {
            let classStyle = img.type === "report" ? "img-report-style" : "img-style";
            htmlContent += `
                <div class="picture-describer hover:text-blue-600 transition-colors"> 
                    <div class="img-frame">
                        <img src="${img.src}" alt="${img.caption}" class=${classStyle}>
                    </div>
                    <p>${img.caption}</p>
                </div>
            `;
        });

        htmlContent += `
                </div>
            </section>
        `;

        if (index < data.length - 1) {
            htmlContent += `<hr class="border-t-2 border-black my-10 opacity-80">`;
        }
    });
    container.innerHTML = htmlContent;
}

async function loadAchievements() {
    try {
        const responsehighschool = await fetch('./assets/data/highSchoolAchievements.json');
        const responseuniversity = await fetch('./assets/data/universityAchievements.json');

        if (!responsehighschool.ok) { throw new Error(`HTTP error! status: ${responsehighschool.status}`);} 
        if (!responseuniversity.ok) { throw new Error(`HTTP error! status: ${responseuniversity.status}`);} 

        const highSchoolAchievements = await responsehighschool.json();
        const universityAchievements = await responseuniversity.json();

        renderProjects(highSchoolAchievements,"highschool");
        renderProjects(universityAchievements,"university");
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    loadAchievements();
});