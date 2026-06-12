// Đăng ký Service Worker để chạy PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('PWA Service Worker đã đăng ký thành công!', reg))
            .catch(err => console.error('Đăng ký Service Worker thất bại:', err));
    });
}

// Dữ liệu gốc
const vColors = { "Ánh vàng": "c-anh-vang", "Cầu vồng": "c-cau-vong", "Ẩm ướt": "c-am-uot", "Nhiễm điện": "c-nhiem-dien", "Gió": "c-gio", "Khí lạnh": "c-khi-lanh", "Cát": "c-cat", "Ánh trăng": "c-anh-trang", "Băng": "c-bang", "Cực quang": "c-cuc-quang", "Sương": "c-suong", "Khô": "c-kho", "Nguyền rủa": "c-nguyen-rua", "Đèn trời": "c-den-troi", "Ảo ảnh": "c-ao-anh", "Pháo hoa": "c-phao-hoa", "Bướm": "c-buom", "Giai điệu": "c-giai-dieu" };
const products = [
    { name: "Nhân sâm", p: 725000, i: "nhan_sam.png" }, { name: "Bánh bao", p: 180000, i: "banh_bao.png" },
    { name: "Cây Đậu", p: 12000, i: "cay_dau.png" }, { name: "Nấm", p: 12000, i: "nam.png" },
    { name: "Khế", p: 10000, i: "khe.png" }, { name: "Đào giòn", p: 8500, i: "dao_gion.png" },
    { name: "Táo đường", p: 7600, i: "tao_duong.png" }, { name: "Dưa hấu", p: 5800, i: "dua_hau.png" },
    { name: "Bí ngô", p: 5167, i: "bi_ngo.png" }, { name: "Người tuyết", p: 4600, i: "nguoi_tuyet.png" },
    { name: "Rau chân vịt", p: 3340, i: "rau_chan_vit.png" }, { name: "Xoài", p: 3000, i: "xoai.png" },
    { name: "Bắp", p: 2650, i: "bap.png" }, { name: "Sầu riêng", p: 2500, i: "sau_rieng.png" },
    { name: "Xương rồng", p: 2300, i: "xuong_rong.png" }, { name: "Chanh", p: 2200, i: "chanh.png" },
    { name: "Táo", p: 2200, i: "tao.png" }, { name: "Đu đủ", p: 1900, i: "du_du.png" },
    { name: "Trái sung", p: 1500, i: "trai_sung.png" }, { name: "Nho", p: 1050, i: "nho.png" },
    { name: "Dừa", p: 1000, i: "dua.png" }, { name: "Cà chua", p: 580, i: "ca_chua.png" },
    { name: "Mãng cầu", p: 400, i: "mang_cau.png" }, { name: "Rau xà lách", p: 341, i: "xa_lach.png" },
    { name: "Cây tùng", p: 300, i: "cay_tung.png" }, { name: "Cà rốt", p: 85, i: "ca_rot.png" },
    { name: "Việt quất", p: 25, i: "viet_quat.png" }, { name: "Dâu tây", p: 10, i: "dau_tay.png" }
];
const variants = [ {n:"Ánh vàng", v:3, t:"r"}, {n:"Cầu vồng", v:2, t:"r"}, {n:"Ẩm ướt", v:0.1, t:"e"}, {n:"Nhiễm điện", v:0.2, t:"e"}, {n:"Gió", v:0.2, t:"e"}, {n:"Khí lạnh", v:0.4, t:"e"}, {n:"Cát", v:0.2, t:"e"}, {n:"Ánh trăng", v:0.4, t:"e"}, {n:"Băng", v:0.3, t:"e"}, {n:"Cực quang", v:0.4, t:"e"}, {n:"Sương", v:0.4, t:"e"}, {n:"Khô", v:0.2, t:"e"}, {n:"Nguyền rủa", v:0.2, t:"e"}, {n:"Đèn trời", v:0.4, t:"e"}, {n:"Ảo ảnh", v:0.3, t:"e"}, {n:"Pháo hoa", v:0.2, t:"e"}, {n:"Bướm", v:0.3, t:"e"}, {n:"Giai điệu", v:0.3, t:"e"} ];

let calcHist = [];

// Khởi tạo UI
function initUI() {
    document.getElementById('ui-prods').innerHTML = products.map(p => `
        <div class="opt-btn cp-opt" data-p="${p.p}" data-n="${p.name}" onclick="selP(this)">
            <img src="assets/img/${p.i}" alt="📦" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNDQkQ1RTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxsaW5lIHgxPSI4IiB5MT0iMiIgeDI9IjgiIHkyPSIyMiI+PC9saW5lPjwvc3ZnPg=='">
            <span>${p.name}</span>
        </div>
    `).join('');

    document.getElementById('ui-vars').innerHTML = variants.map(v => `
        <div class="opt-btn cv-opt" data-t="${v.t}" data-v="${v.v}" data-n="${v.n}" onclick="toggleVar(this)">
            <span class="${vColors[v.n]}">${v.n}</span>
        </div>
    `).join('');
}

// Xử lý chọn Nông sản
function selP(el) {
    document.querySelectorAll('.cp-opt').forEach(x => x.classList.remove('selected'));
    el.classList.add('selected');
}

// Xử lý chọn Biến thể (Max 5)
function toggleVar(el) {
    if (!el.classList.contains('selected')) {
        const selectedCount = document.querySelectorAll('.cv-opt.selected').length;
        if (selectedCount >= 5) {
            alert("Bạn chỉ được chọn tối đa 5 biến thể!");
            return;
        }
    }
    el.classList.toggle('selected');
}

// Làm mới Form nhập
function clearInputs() {
    document.querySelectorAll('.cp-opt, .cv-opt').forEach(x => x.classList.remove('selected'));
    document.getElementById('calc-w').value = '';
    document.getElementById('calc-f').value = 0;
    document.getElementById('f-val').innerText = '0';
}

// Logic Tính toán cốt lõi
function execCalc() {
    const w = parseFloat(document.getElementById('calc-w').value);
    const pEl = document.querySelector('.cp-opt.selected');
    
    if (!w || !pEl) {
        alert("Vui lòng nhập cân nặng và chọn loại nông sản!");
        return;
    }

    const friendCount = parseInt(document.getElementById('calc-f').value);
    const buffPercent = friendCount * 3;
    
    let rm = 1, eb = 0, vs = [];
    document.querySelectorAll('.cv-opt.selected').forEach(el => {
        vs.push(el.dataset.n);
        el.dataset.t === 'r' ? rm *= parseFloat(el.dataset.v) : eb += parseFloat(el.dataset.v);
    });

    const pPrice = parseInt(pEl.dataset.p);
    const res = Math.round(w * pPrice * rm * (1 + eb) * (1 + (friendCount * 0.03)));
    
    calcHist.unshift({ n: pEl.dataset.n, w, vs, v: res, buff: buffPercent });
    
    renderCalcHistory();
    updateTotal();
    clearInputs();
}

function renderCalcHistory() {
    const histContainer = document.getElementById('calc-history');
    if(calcHist.length === 0) {
        histContainer.innerHTML = '<div class="empty-history">Giỏ hàng đang trống</div>';
        return;
    }

    histContainer.innerHTML = calcHist.map((h, index) => `
        <div class="history-item">
            <div class="history-info">
                ${h.n} (${h.w}kg) 
                ${h.vs.length ? `<br><span style="font-size:12px;">[${h.vs.map(v => `<span class="${vColors[v]}">${v}</span>`).join(', ')}]</span>` : ''}
                ${h.buff > 0 ? `<br><span class="buff-tag">+${h.buff}% Bạn Bè</span>` : ''}
                <b>${h.v.toLocaleString('vi-VN')} xu</b>
            </div>
            <button class="btn-del" title="Xóa" onclick="deleteCalcItem(${index})">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>
    `).join('');
}

function deleteCalcItem(index) {
    calcHist.splice(index, 1);
    renderCalcHistory();
    updateTotal();
}

function clearAllHistory() {
    if(calcHist.length === 0) return;
    if(confirm("Bạn có chắc muốn xóa toàn bộ lịch sử?")) {
        calcHist = [];
        renderCalcHistory();
        updateTotal();
    }
}

function updateTotal() {
    document.getElementById('calc-sum').innerText = calcHist.reduce((s, x) => s + x.v, 0).toLocaleString('vi-VN') + ' xu';
}

// Khởi chạy
initUI();
