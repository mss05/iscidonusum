function switchTab(viewId, element) {
    // 1. Tüm ekranları gizle
    document.querySelectorAll('.tab-view').forEach(view => {
        view.style.display = 'none';
    });

    // 2. İstenen ekranı göster
    document.getElementById('view-' + viewId).style.display = 'block';

    // 3. Alt menüdeki renkleri sıfırla
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // 4. Tıklanan menüyü renkli yap
    if (element) {
        element.classList.add('active');
    }
}
