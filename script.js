// DEĞİŞKENLER
let currentMoney = 450;
let currentTaskReward = 0;

// TAB DEĞİŞTİRME (Mevcut)
function switchTab(viewId, element) {
    document.querySelectorAll('.tab-view').forEach(view => view.style.display = 'none');
    document.getElementById('view-' + viewId).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');
}

// MODAL AÇ/KAPA FONKSİYONLARI
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// SOSYAL AĞ: BEĞENİ (LIKE)
function toggleLike(element) {
    element.classList.toggle('liked');
    let icon = element.querySelector('i');
    if (element.classList.contains('liked')) {
        icon.classList.remove('far'); // İçi boş
        icon.classList.add('fas');    // İçi dolu
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

// SOSYAL AĞ: POST PAYLAŞMA
function sharePost() {
    const text = document.querySelector('.post-input').value;
    if (text.trim() === "") return alert("Lütfen bir şeyler yazın.");

    const feed = document.getElementById('social-feed');
    const newPost = `
        <div class="post-card">
            <div class="post-header">
                <div class="avatar" style="background: #333;">S</div>
                <div class="user-meta"><h5>Sen</h5><span>Az önce</span></div>
            </div>
            <p>${text}</p>
            <div class="post-actions">
                <span onclick="toggleLike(this)"><i class="far fa-heart"></i> 0</span>
                <span><i class="far fa-comment"></i> 0</span>
            </div>
        </div>`;
    
    feed.insertAdjacentHTML('afterbegin', newPost);
    document.querySelector('.post-input').value = "";
    closeModal('modal-post');
}

// --- GÖREV (TASK) SENARYOSU ---

// 1. Adım: "Git"e basınca açılır
function openTaskModal(title, reward) {
    currentTaskReward = reward;
    document.getElementById('task-title-display').innerText = title;
    
    // Resetle
    document.getElementById('task-step-1').style.display = 'block';
    document.getElementById('task-step-2').style.display = 'none';
    document.getElementById('task-step-3').style.display = 'none';
    document.getElementById('file-input').value = ""; 
    document.querySelector('.upload-area').innerHTML = '<i class="fas fa-camera"></i><p>Atık Fotoğrafını Yükle</p>';
    document.querySelector('.upload-area').classList.remove('uploaded');
    document.getElementById('btn-complete-task').classList.add('disabled'); // Butonu kilitle

    openModal('modal-task');
}

// 2. Adım: Fotoğraf Yüklendiğinde
function fileUploaded() {
    const area = document.querySelector('.upload-area');
    area.innerHTML = '<i class="fas fa-check"></i><p>Fotoğraf Hazır</p>';
    area.classList.add('uploaded');
    document.getElementById('btn-complete-task').classList.remove('disabled'); // Kilidi aç
}

// 3. Adım: "İşi Tamamla"ya basınca -> Bekleme Ekranı
function submitTask() {
    document.getElementById('task-step-1').style.display = 'none';
    document.getElementById('task-step-2').style.display = 'block';

    // 4 saniye bekleme simülasyonu (Onaylanıyor...)
    setTimeout(() => {
        document.getElementById('task-step-2').style.display = 'none';
        document.getElementById('task-step-3').style.display = 'block';
        
        // Parayı göster
        document.getElementById('task-earn-display').innerText = currentTaskReward;
        
        // Ana bakiyeyi güncelle
        currentMoney += currentTaskReward;
        updateDashboard();
    }, 4000);
}

// 4. Adım: Son onay (Kapat ve Ana Ekrana Dön)
function finishTaskProcess() {
    closeModal('modal-task');
}

// Dashboard Güncelleme
function updateDashboard() {
    document.getElementById('daily-amount').innerText = currentMoney + " ₺";
    // Progress barı artır (Örnek hesaplama)
    let percent = Math.min((currentMoney / 600) * 100, 100);
    document.getElementById('daily-progress').style.width = percent + "%";
}
