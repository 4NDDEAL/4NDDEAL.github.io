window.showPage = function(pageId) {
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

window.toggleMenu = function(menuId) {
    const menu = document.getElementById(menuId);
    
    const arrow = document.getElementById('arrow-' + menuId);

    if (menu) {
        menu.classList.toggle('max-h-0');
        menu.classList.toggle('opacity-0');

        menu.classList.toggle('max-h-96');
        menu.classList.toggle('opacity-100');

        menu.classList.toggle('mt-1');
    }

    if (arrow) {
        arrow.classList.toggle('rotate-180');
    }
}

window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const toggleBtn = document.getElementById('sidebar-toggle-btn'); 

    if (sidebar) {
        sidebar.classList.toggle('-translate-x-full');

        const isSidebarOpen = !sidebar.classList.contains('-translate-x-full');

        if (mainContent) {
            if (isSidebarOpen) {
                mainContent.classList.add('md:ml-72');
            } else {
                mainContent.classList.remove('md:ml-72');
            }
        }

        if (toggleBtn) {
            if (isSidebarOpen) {
                toggleBtn.classList.add('md:translate-x-72');
            } else {
                toggleBtn.classList.remove('md:translate-x-72');
            }
        }
    }
}

// ฟังก์ชันเปิดรูป
window.openModal = function(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');

    if (modal && modalImg) {
        modalImg.src = imageSrc; // เอารูปที่กดมาใส่
        modal.classList.remove('hidden'); // โชว์กล่อง
        
        // (Optional) Animation เล็กน้อย
        setTimeout(() => {
            modalImg.classList.remove('scale-95');
            modalImg.classList.add('scale-100');
        }, 10);
    }
}

// ฟังก์ชันปิดรูป
window.closeModal = function() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');

    if (modal) {
        modal.classList.add('hidden'); // ซ่อนกล่อง
        
        // Reset scale สำหรับครั้งหน้า
        if(modalImg) {
            modalImg.classList.remove('scale-100');
            modalImg.classList.add('scale-95');
        }
    }
}

function renderProjects(data) {
    data.forEach((project) => {
        let htmlContent = "";
        const container = document.getElementById(`${project.level}-${project.catagory}-content`);
        if (!container) return; 
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
                <div class="picture-describer"> 
                    <div class="img-frame">
                        <img src="${img.src}" 
                            alt="${img.caption}" 
                            class=${classStyle}
                            onclick="openModal(this.src)">
                    </div>
                    <p>${img.caption}</p>
                </div>
            `;
        });

        htmlContent += `
                </div>
            </section>
        `;

        htmlContent += `<hr class="border-t-2 border-black my-10 opacity-80">`;
        
        container.innerHTML += htmlContent;
    });
    
}

async function loadAchievements() {
    try {
        const response = await fetch('./assets/data/data.json');

        if(!response.ok) {throw new Error(`HTTP error! status : ${response.status}`) ; }

        const work = await response.json();

        renderProjects(work);
        // const responsehighschool = await fetch('./assets/data/highSchoolAchievements.json');
        // const responseuniversity = await fetch('./assets/data/universityAchievements.json');

        
        // if (!responsehighschool.ok) { throw new Error(`HTTP error! status: ${responsehighschool.status}`);} 
        // if (!responseuniversity.ok) { throw new Error(`HTTP error! status: ${responseuniversity.status}`);} 
        // const highSchoolAchievements = await responsehighschool.json();
        // const universityAchievements = await responseuniversity.json();

        // renderProjects(highSchoolAchievements,"highschool");
        // renderProjects(universityAchievements,"university");
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    loadAchievements();
});