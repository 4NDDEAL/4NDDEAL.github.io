
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(page => {
        page.classList.add('hidden');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-gray-800', 'text-white', 'border-blue-500');
        btn.classList.add('text-gray-400', 'border-transparent');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }

    const targetBtn = document.getElementById('btn-' + pageId);
    if (targetBtn) {
        targetBtn.classList.remove('text-gray-400', 'border-transparent');
        targetBtn.classList.add('bg-gray-800', 'text-white', 'border-blue-500');
    }
}