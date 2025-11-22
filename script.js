function switchTab(viewId, element) {
    // 1. Tüm ekranları gizle
    document.querySelectorAll('.tab-view').forEach(view => {
        view.style.display = 'none';
    });

    // 2. İstenen ekranı aç
    const targetView = document.getElementById('view-' + viewId);
    if (targetView) {
        targetView.style.display = 'block';
    }

    // 3. Tüm menülerin rengini pasif yap
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // 4. Tıklanan menüyü aktif yap
    if (element) {
        element.classList.add('active');
    }
}
