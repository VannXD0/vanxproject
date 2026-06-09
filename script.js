// Loader canvas animation (sama seperti sebelumnya, tidak berubah)
const canvas = document.getElementById('loaderCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const isMobile = window.matchMedia('(max-width: 768px)').matches || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    const particleCount = isMobile ? 28 : 80;
    let w, h;
    let shouldAnimateLoader = true;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    let particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 1,
            a: Math.random() * 0.6,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8
        });
    }
    function animateLoader() {
        if (!ctx || !shouldAnimateLoader) return;
        ctx.clearRect(0, 0, w, h);
        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 42, 126, ${p.a})`;
            ctx.fill();
        }
        requestAnimationFrame(animateLoader);
    }
    animateLoader();
}

let currentLang = 'id';

const translations = {
    id: {
        loadingText: "⟳ INITIALIZING VANX CORE...",
        headerTitle: "VANX", headerTagline: "Module Premium",
        homeDesc: "VANX PROJECT V1.0 – Module premium generasi terbaru. Sensi Optimizer, AimTrick Inject, Cache Cleaning, DPI dengan Instan.",
        homeBtnVip: "LIHAT VIP", homeBtnFree: "DOWNLOAD FREE", homeBtnChannel: "SALURAN INFO VANX",
        whyTitle: "Mengapa Harus Memilih Module VANX?",
        whyDesc: "VANX V1.0 bukan sekadar module biasa — ini adalah optimasi performa gaming terlengkap. Sensi, aim, performa device — semua dalam satu module. Bukan cheat, ini science.",
        features: [
            { icon: "fa-broom", title: "Cleaning Cache Deep", desc: "Membersihkan cache game secara mendalam hingga ke layer sistem — performa lebih bersih, loading lebih cepat, frame rate stabil tanpa jeda.", tag: "DEEP CLEAN" },
            { icon: "fa-rocket", title: "Up Performance", desc: "Meningkatkan performa device secara signifikan — alokasi RAM dioptimalkan, prioritas proses game dinaikkan, thermal throttling diminimalkan.", tag: "BOOST" },
            { icon: "fa-chart-line", title: "Kalkulasi Resolusi Akurat", desc: "Menghitung dan menyesuaikan resolusi rendering secara otomatis dan akurat — tampilan lebih tajam, rendering lebih efisien.", tag: "AUTO" },
            { icon: "fa-bolt", title: "Perubahan DPI dengan Instan", desc: "Ubah DPI sensitivity secara instan langsung dari panel notifikasi tanpa perlu keluar dari game.", tag: "INSTANT" },
            { icon: "fa-crosshairs", title: "Inject AimTrick to Path", desc: "Menyuntikkan algoritma AimTrick langsung ke path DLL game — meningkatkan tracking dan akurasi aim secara natural.", tag: "INJECT" },
            { icon: "fa-sliders-h", title: "Sensi Optimizer", desc: "Mengoptimalkan sensitivity game secara presisi — dari sensitivity screen, weapon sensitivity, hingga micro adjustment.", tag: "PRESISI" },
            { icon: "fa-clock", title: "Refund 24 Jam", desc: "Garansi refund 24 jam jika module mengalami kerusakan atau tidak berfungsi sebagaimana mestinya.", tag: "24 JAM" }
        ],
        modulesTitle: "Module VIP", buyBtn: "BELI SEKARANG", detailBtn: "DETAIL", hideBtn: "SEMBUNYIKAN",
        featuresList: {
            ivory: ["Sensi 12% + AimTrick 24%", "Optimizer 15% + Sensi Pack", "Cleaning Cache Deep", "Up Performance", "1 Device Only – VIP", "Cocok untuk pemula dengan budget terbatas, tetap stabil."],
            axiom: ["Sensi 25% + AimTrick 32%", "Optimizer 30% + Sensi Pack", "Cleaning Cache Deep", "Up Performance", "1 Device Only – VIP", "Tingkatkan aiming secara signifikan, responsif."],
            phoenix: ["Sensi 43% + AimTrick 44%", "Optimizer 40% + Sensi Pack", "Cleaning Cache Deep", "Up Performance", "1 Device Only – VIP", "Kombinasi kecepatan dan kontrol, direkomendasikan."],
            photonof: ["Sensi 55% + AimTrick 50%", "Optimizer 55% + Sensi Pack", "Cleaning Cache Deep", "Up Performance Max", "1 Device Only – VIP", "Fitur lengkap dengan optimasi ekstrem."],
            vortex: ["Sensi 70% + AimTrick 70%", "Optimizer 70% + Sensi Pack", "Cleaning Cache Deep+", "Up Performance Max", "1 Device Only – VIP", "Ultimate tier, unlock semua fitur premium."]
        },
        faq: [
            { q: "Siapa Vanx?", icon: "fa-solid fa-user-astronaut", a: "Vanx adalah developer tunggal di balik System Core. Saya mulai belajar coding dan pembuatan module sejak tahun 2023, lalu terus mengembangkan fitur supaya tetap stabil, aman, dan nyaman dipakai setiap saat. Fokus saya bukan cuma bikin kerjaan jalan, tapi bikin pengalaman pengguna terasa rapi, cepat, dan terasa premium dari awal sampai akhir." },
            { q: "Ada jasa buat module custom?", icon: "fa-solid fa-wand-magic-sparkles", a: "Ya, hubungi kontak official untuk pemesanan module sesuai kebutuhan. Saya juga bisa bantu menyesuaikan fitur, target performa, preferensi tampilan, sampai detail visual agar hasilnya terasa lebih personal dan sesuai selera pengguna." },
            { q: "Aman digunakan?", icon: "fa-solid fa-shield", a: "100% aman, tidak menyentuh file sistem vital. Sudah teruji ribuan pengguna dan dirancang supaya penggunaan tetap aman, minim risiko, dan tidak bikin sistem terasa kacau atau nggak nyaman dipakai dalam jangka panjang." },
            { q: "Cara order?", icon: "fa-solid fa-cart-shopping", a: "Pilih metode pembayaran di bawah, ikuti instruksi, kirim bukti bayar, lalu key akan dikirim dalam waktu maksimal 5 menit setelah pembayaran terkonfirmasi. Prosesnya simpel, cepat, dan langsung diarahkan supaya kamu nggak bingung." },
            { q: "Perlu root?", icon: "fa-solid fa-mobile-screen-button", a: "Tidak, cukup Shizuku atau akses normal. Jadi kamu tetap bisa memakai module tanpa ribet, tanpa mengubah sistem terlalu dalam, dan tanpa harus melalui setup yang bikin kepala pusing." },
            { q: "Berapa lama proses aktivasi?", icon: "fa-solid fa-clock", a: "Maksimal 15 menit setelah pembayaran dikonfirmasi. Kalau ada kendala, kontak admin langsung supaya bisa dibantu secepat mungkin. Saya usahakan semua proses tetap lancar, jelas, dan tidak bertele-tele." }
        ],
        contactTitle: "Kontak & Developer", footer: "",
        modalTitle: "Scan QRIS untuk membayar", modalAdminMsg: "Hai admin, tolong cek pembayaran saya",
        modalProductLabel: "Product : ", modalPriceLabel: "Price : Rp ",
        modalInstruksi: "Jika sudah bayar, klik tombol di bawah. Jangan lupa sertakan bukti pembayaran.",
        modalConfirmBtn: "Konfirmasi Pembayaran & Kirim Pesan",
        modalFooterNote: "Setelah transfer, klik tombol di atas untuk mengirim notifikasi ke admin.",
        sidebar: { home: "Home", modules: "Module VIP", faq: "FAQ", testimoni: "Testimoni Vanx", channel: "Saluran Vanx", contact: "Developer & Contact" }
    },
    en: {
        loadingText: "⟳ INITIALIZING VANX CORE...", headerTitle: "VANX", headerTagline: "Premium Module",
        homeDesc: "VANX PROJECT V1.0 – Next-gen premium module. Sensi Optimizer, AimTrick Inject, Cache Cleaning, Instant DPI.",
        homeBtnVip: "VIEW VIP", homeBtnFree: "FREE DOWNLOAD", homeBtnChannel: "VANX INFO CHANNEL",
        whyTitle: "Why Choose VANX Module?",
        whyDesc: "VANX V1.0 is not just an ordinary module — it's the most complete gaming performance optimization.",
        features: [
            { icon: "fa-broom", title: "Deep Cache Cleaning", desc: "Cleans game cache deep into system layer — cleaner performance, faster loading.", tag: "DEEP CLEAN" },
            { icon: "fa-rocket", title: "Up Performance", desc: "Significantly improves device performance — RAM optimized, thermal throttling minimized.", tag: "BOOST" },
            { icon: "fa-chart-line", title: "Accurate Resolution Calc", desc: "Automatically calculates and adjusts rendering resolution.", tag: "AUTO" },
            { icon: "fa-bolt", title: "Instant DPI Change", desc: "Change DPI sensitivity instantly from notification panel.", tag: "INSTANT" },
            { icon: "fa-crosshairs", title: "Inject AimTrick to Path", desc: "Injects AimTrick algorithm directly into game DLL.", tag: "INJECT" },
            { icon: "fa-sliders-h", title: "Sensi Optimizer", desc: "Precisely optimizes game sensitivity — screen, weapon, micro adjustment.", tag: "PRECISE" },
            { icon: "fa-clock", title: "24 Hour Refund", desc: "24-hour refund guarantee if module does not function.", tag: "24 HOURS" }
        ],
        modulesTitle: "VIP Modules", buyBtn: "BUY NOW", detailBtn: "DETAIL", hideBtn: "HIDE",
        featuresList: {
            ivory: ["Sensi 12% + AimTrick 24%", "Optimizer 15% + Sensi Pack", "Deep Cache Cleaning", "Up Performance", "1 Device Only – VIP", "Perfect for beginners."],
            axiom: ["Sensi 25% + AimTrick 32%", "Optimizer 30% + Sensi Pack", "Deep Cache Cleaning", "Up Performance", "1 Device Only – VIP", "Significantly improve aiming."],
            phoenix: ["Sensi 43% + AimTrick 44%", "Optimizer 40% + Sensi Pack", "Deep Cache Cleaning", "Up Performance", "1 Device Only – VIP", "Balance of speed and control."],
            photonof: ["Sensi 55% + AimTrick 50%", "Optimizer 55% + Sensi Pack", "Deep Cache Cleaning", "Up Performance Max", "1 Device Only – VIP", "Full features with extreme optimization."],
            vortex: ["Sensi 70% + AimTrick 70%", "Optimizer 70% + Sensi Pack", "Deep Cache Cleaning+", "Up Performance Max", "1 Device Only – VIP", "Ultimate tier, unlock all premium features."]
        },
        faq: [
            { q: "Who is Vanx?", icon: "fa-solid fa-user-astronaut", a: "Vanx is the sole developer behind System Core. I started coding and building modules since 2023, and I keep improving every feature so it stays stable, safe, and comfortable to use. My focus is not only to make things work, but to make the whole experience feel polished, fast, and premium from the first moment." },
            { q: "Custom module service?", icon: "fa-solid fa-wand-magic-sparkles", a: "Yes, contact the official channel for custom orders. I can also tailor the features, performance targets, visual style, and even the overall feel of the product so it matches your preference more closely." },
            { q: "Is it safe?", icon: "fa-solid fa-shield", a: "100% safe, and it does not touch critical system files. It has been tested by thousands of users and designed to keep the risk as low as possible while still delivering a smooth and reliable experience." },
            { q: "How to order?", icon: "fa-solid fa-cart-shopping", a: "Choose a payment method below, follow the instructions, send your proof of payment, and the key will be sent within 5 minutes after confirmation. The process is simple, direct, and designed to keep everything clear and easy to follow." },
            { q: "Need root?", icon: "fa-solid fa-mobile-screen-button", a: "No, just Shizuku or normal access is enough. That makes it simple and easy to use without complicated setup and without forcing you through a messy installation process." },
            { q: "Activation time?", icon: "fa-solid fa-clock", a: "Maximum 15 minutes after payment is confirmed. If anything goes wrong, contact the admin directly and it will be handled as quickly as possible. I always try to keep the experience smooth, clear, and stress-free." }
        ],
        contactTitle: "Contact & Developer", footer: "", 
        modalTitle: "Scan QRIS to pay", modalAdminMsg: "Hi admin, please check my payment",
        modalProductLabel: "Product : ", modalPriceLabel: "Price : Rp ",
        modalInstruksi: "If you have paid, click the button below. Don't forget to attach payment proof.",
        modalConfirmBtn: "Confirm Payment & Send Message",
        modalFooterNote: "After transfer, click the button above to send notification to admin.",
        sidebar: { home: "Home", modules: "VIP Modules", faq: "FAQ", testimoni: "Vanx Testimonials", channel: "Vanx Channel", contact: "Developer & Contact" }
    }
};

const modulesData = [
    { name: "Ivory", price: 10000, original: 20000, tier: "TIER 5 – STARTER", discount: "50%", usd: "0.60", key: "ivory" },
    { name: "Axiom", price: 30000, original: 40000, tier: "TIER 4 – BASIC", discount: "25%", usd: "1.8", key: "axiom" },
    { name: "Phoenix", price: 50000, original: 60000, tier: "TIER 3 – STANDARD", discount: "17%", usd: "3.0", key: "phoenix" },
    { name: "Photonof", price: 75000, original: 85000, tier: "TIER 2 – ADVANCED", discount: "12%", usd: "4.5", key: "photonof" },
    { name: "Vortex", price: 120000, original: 150000, tier: "TIER 1 – ULTIMATE", discount: "20%", usd: "7.3", key: "vortex" }
];

function renderContent() {
    const t = translations[currentLang];
    document.querySelector('.logo-area h1').innerText = t.headerTitle;
    document.querySelector('.tagline').innerText = t.headerTagline;
    document.getElementById('loading-text').innerText = t.loadingText;
    const container = document.getElementById('mainContent');
    if (!container) return;
    let html = `
        <div class="card-glow">
            <p>${t.homeDesc}</p>
            <div class="home-buttons">
                <button class="btn-pink" id="lihatVipBtn"><i class="fa-regular fa-eye"></i> ${t.homeBtnVip}</button>
                <button class="btn-outline" id="downloadFreeBtn"><i class="fa-regular fa-floppy-disk"></i> ${t.homeBtnFree}</button>
                <button class="btn-outline" id="saluranInfoBtn"><i class="fa-regular fa-paper-plane"></i> ${t.homeBtnChannel}</button>
            </div>
        </div>
        <div class="card-glow">
            <h2 style="font-size: 1.8rem; margin-bottom: 1rem;">${t.whyTitle}</h2>
            <p style="margin-bottom: 2rem; opacity: 0.9;">${t.whyDesc}</p>
            <div class="features-grid">
                ${t.features.map((f, index) => `
                    <div class="feature-item">
                        <div class="feature-header">
                            <div class="feature-icon">
                                <span class="feature-number">${index + 1}</span>
                            </div>
                            <h3 class="feature-title">${f.title}</h3>
                        </div>
                        <p class="feature-desc">${f.desc}</p>
                        <div><span class="feature-tag">${f.tag}</span></div>
                    </div>
                `).join('')}
            </div>
        </div>
        <h2 id="modules-section" style="margin: 2rem 0 1rem; font-size: 1.8rem;">${t.modulesTitle}</h2>
        <div class="modules-grid" id="modulesGrid"></div>
        <div class="card-glow">
            <h2><i class="fa-regular fa-comments"></i> FAQ</h2>
            <div class="faq-list" id="faqList"></div>
        </div>
        <div class="card-glow">
            <h2><i class="fa-regular fa-address-card"></i> ${t.contactTitle}</h2>
            <div class="developer-card">
                <div class="dev-img"><img src="img/dev.png" alt="Vanx" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2770%27 height=%2770%27 viewBox=%270 0 100 100%27%3E%3Ccircle cx=%2750%27 cy=%2750%27 r=%2745%27 fill=%27%23ff2a7e%27/%3E%3Ctext x=%2750%25%27 y=%2755%25%27 font-size=%2730%27 text-anchor=%27middle%27 fill=%27black%27 dy=%27.3em%27%3EV%3C/text%3E%3C/svg%3E'"></div>
                <div class="developer-bio">
                    <h3>Vanx</h3>
                    <p>Creator of System Core · since 2023</p>
                </div>
                <div class="contact-icons">
                    <a href="https://wa.me/6285211522956" target="_blank" class="contact-icon"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="https://t.me/Xynzy22" target="_blank" class="contact-icon"><i class="fa-brands fa-telegram"></i></a>
                </div>
                <div class="developer-note">Fast response, premium support, and custom build service for users who want a more polished experience.</div>
            </div>
        </div>
    `;
    container.innerHTML = html;
    if (t.footer) {
        container.insertAdjacentHTML('beforeend', `<div class="footer">${t.footer}</div>`);
    }
    const modulesGrid = document.getElementById('modulesGrid');
    if (modulesGrid) {
        modulesGrid.innerHTML = '';
        modulesData.forEach(mod => {
            const features = t.featuresList[mod.key] || [];
            const card = document.createElement('div');
            card.className = 'module-card';
            card.setAttribute('data-name', mod.name);
            card.setAttribute('data-price', mod.price);
            card.innerHTML = `
                <div class="module-name">${mod.name}</div>
                <div class="tier">${mod.tier}</div>
                <div class="price-row">
                    <span class="old-price">Rp ${mod.original.toLocaleString()}</span>
                    <span class="new-price">Rp ${mod.price.toLocaleString()}</span>
                    <span class="usd">(~$${mod.usd} USD)</span>
                    <span class="discount">Hemat ${mod.discount}</span>
                </div>
                <ul class="feature-list hidden-features" style="display:none;">
                    ${features.map(f => `<li><i class="fa-regular fa-circle-check"></i> ${f}</li>`).join('')}
                </ul>
                <div class="module-buttons">
                    <button class="btn-buy buy-now">${t.buyBtn}</button>
                    <button class="btn-detail detail-btn">${t.detailBtn}</button>
                </div>
            `;
            modulesGrid.appendChild(card);
        });
        attachModuleEvents(t);
    }
    const faqList = document.getElementById('faqList');
    if (faqList) {
        faqList.innerHTML = '';
        t.faq.forEach(item => {
            const div = document.createElement('div');
            div.className = 'faq-item';
            div.innerHTML = `<div class="faq-question"><span class="faq-question-main"><span class="faq-icon"><i class="${item.icon || 'fa-solid fa-circle-question'}"></i></span><span class="faq-text">${item.q}</span></span><span class="faq-toggle"><i class="fa-solid fa-plus"></i></span></div><div class="faq-answer">${item.a}</div>`;
            faqList.appendChild(div);
        });
        attachFaqEvents();
    }
    document.getElementById('lihatVipBtn')?.addEventListener('click', () => document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' }));
    document.getElementById('downloadFreeBtn')?.addEventListener('click', () => window.open('https://whatsapp.com/channel/0029Vb7zuvcAInPnuUbfqX0E', '_blank'));
    document.getElementById('saluranInfoBtn')?.addEventListener('click', () => window.open('https://whatsapp.com/channel/0029Vb7zuvcAInPnuUbfqX0E', '_blank'));
}

function closeAllPaymentWrappers() {
    document.querySelectorAll('.module-card').forEach(card => card.classList.remove('payment-open'));
    closeModal();
}

function attachModuleEvents(t) {
    document.querySelectorAll('.buy-now').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = e.currentTarget.closest('.module-card');
        if (!card) return;

        closeAllPaymentWrappers();
        const name = card.getAttribute('data-name');
        const price = card.getAttribute('data-price');
        showPaymentModal(card, name, price, t);
        card.classList.add('payment-open');
    }));
    document.querySelectorAll('.detail-btn').forEach(btn => btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = e.target.closest('.module-card');
        const fl = card.querySelector('.feature-list');
        if (fl.style.display === 'none') { fl.style.display = 'block'; e.target.innerText = t.hideBtn; }
        else { fl.style.display = 'none'; e.target.innerText = t.detailBtn; }
    }));
}

function renderModalContent(html) {
    const modal = document.getElementById('qrisModal');
    const content = modal?.querySelector('.modal-content');
    if (!modal || !content) return;
    content.innerHTML = `
        <span class="close-modal" onclick="closeModal()">&times;</span>
        ${html}
    `;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const confirmBtn = content.querySelector('#confirmPayBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmPayment);
    }
}

function showPaymentModal(card, name, price, t) {
    const paymentContent = `
        <h3>${t.modalTitle}</h3>
        <div class="payment-title">Pilih Pembayaran</div>
        <div class="payment-grid">
            <div class="payment-option" data-method="ovo">
                <i class="fa-solid fa-wallet payment-icon"></i>
                <div class="payment-name">OVO</div>
                <div class="payment-desc">Hubungi seller via WA</div>
            </div>
            <div class="payment-option" data-method="gopay">
                <i class="fa-solid fa-credit-card payment-icon"></i>
                <div class="payment-name">GoPay</div>
                <div class="payment-desc">Hubungi seller via WA</div>
            </div>
            <div class="payment-option" data-method="dana">
                <i class="fa-solid fa-money-bill-wave payment-icon dana-icon"></i>
                <div class="payment-name">DANA</div>
                <div class="payment-desc">Hubungi seller via WA</div>
            </div>
            <div class="payment-option" data-method="qris">
                <i class="fa-solid fa-qrcode payment-icon"></i>
                <div class="payment-name">QRIS AllPay</div>
                <div class="payment-desc">Semua e-wallet & mobile banking</div>
            </div>
            <div class="payment-option" data-method="paypal">
                <i class="fa-brands fa-paypal payment-icon"></i>
                <div class="payment-name">PayPal</div>
                <div class="payment-desc">Pembayaran Internasional</div>
            </div>
        </div>
        <div class="payment-footer">KIRIM BUKTI BAYAR KE SELLER · KEY DIKIRIM ≤5 MENIT</div>
    `;
    renderModalContent(paymentContent);
    window.currentOrder = { name, price, card, mode: 'payment' };

    document.getElementById('qrisModal')?.querySelectorAll('.payment-option').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const method = opt.getAttribute('data-method');
            if (method === 'qris') {
                openPaymentModal(name, price);
            } else {
                let methodDisplay = '';
                if (method === 'ovo') methodDisplay = 'OVO';
                else if (method === 'gopay') methodDisplay = 'GoPay';
                else if (method === 'dana') methodDisplay = 'DANA';
                else methodDisplay = method.toUpperCase();
                const msg = `Hai bang Vanx, gw mau order ${name} dengan harga Rp ${price}, menggunakan metode pembayaran ${methodDisplay}. Tolong segera dikirim ya bang.`;
                window.open(`https://wa.me/6285211522956?text=${encodeURIComponent(msg)}`, '_blank');
                closeModal();
            }
        });
    });
}

function openPaymentModal(name, price) {
    const t = translations[currentLang];
    const id = "VNX-" + Math.random().toString(36).substring(2,8).toUpperCase();
    renderModalContent(`
        <h3 id="modalTitle">${t.modalTitle}</h3>
        <div class="qris-img"><img src="img/qris.png" alt="QRIS"></div>
        <div class="order-info">
            <p id="modalAdminMsg"><strong>${t.modalAdminMsg}</strong></p>
            <p>ID : <span id="transactionId">${id}</span></p>
            <p id="modalProductLabel">${t.modalProductLabel}<span id="modalProductName">${name}</span></p>
            <p id="modalPriceLabel">${t.modalPriceLabel}<span id="modalProductPrice">${price}</span></p>
        </div>
        <div id="modalInstruksi" class="copy-instruksi">${t.modalInstruksi}</div>
        <div class="modal-buttons"><button class="btn-confirm" id="confirmPayBtn">${t.modalConfirmBtn}</button></div>
        <small id="modalFooterNote">${t.modalFooterNote}</small>
    `);
    window.currentOrder = { id, name, price, mode: 'qris' };
}
function closeModal() {
    const modal = document.getElementById('qrisModal');
    if (modal) {
        modal.style.display = 'none';
    }
    document.body.style.overflow = '';
    document.querySelectorAll('.module-card').forEach(card => card.classList.remove('payment-open'));
    window.currentOrder = null;
}
window.closeModal = closeModal;
function confirmPayment() {
    const ord = window.currentOrder;
    if (!ord) return;
    const msg = `Hai admin, tolong cek pembayaran saya%0AID  : ${ord.id || '-'}%0AProduct : ${ord.name}%0APrice : Rp ${ord.price}`;
    window.open(`https://wa.me/6285211522956?text=${msg}`, '_blank');
    closeModal();
    alert(`✅ Pesanan ${ord.name} telah dikirim. Sertakan bukti bayar.`);
}

function attachFaqEvents() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-question');
        q.addEventListener('click', () => item.classList.toggle('open'));
    });
}

function buildSidebar() {
    const t = translations[currentLang];
    const side = document.getElementById('sideNav');
    side.innerHTML = `
        <div class="sidebar-shell">
            <div class="sidebar-header">
                <span class="sidebar-badge">VANX NAV</span>
                <h3>Premium quick access</h3>
                <p>Jump straight into the best parts of the module experience.</p>
            </div>
            <div class="sidebar-links">
                <a href="#" id="sidebarHome"><i class="fa-regular fa-compass"></i> ${t.sidebar.home}</a>
                <a href="#" id="sidebarModules"><i class="fa-solid fa-gem"></i> ${t.sidebar.modules}</a>
                <a href="#" id="sidebarFaq"><i class="fa-regular fa-message"></i> ${t.sidebar.faq}</a>
                <a href="#" id="sidebarTesti"><i class="fa-brands fa-whatsapp"></i> ${t.sidebar.testimoni}</a>
                <a href="#" id="sidebarChannel"><i class="fa-regular fa-paper-plane"></i> ${t.sidebar.channel}</a>
                <a href="#" id="sidebarContact"><i class="fa-regular fa-address-card"></i> ${t.sidebar.contact}</a>
            </div>
            <div class="sidebar-footer">Fast access • Clean flow • Premium vibe</div>
        </div>
    `;
    document.getElementById('sidebarHome')?.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); closeSidebar(); });
    document.getElementById('sidebarModules')?.addEventListener('click', (e) => { e.preventDefault(); document.getElementById('modules-section')?.scrollIntoView({ behavior:'smooth' }); closeSidebar(); });
    document.getElementById('sidebarFaq')?.addEventListener('click', (e) => { e.preventDefault(); document.querySelector('.faq-list')?.scrollIntoView({ behavior:'smooth' }); closeSidebar(); });
    document.getElementById('sidebarContact')?.addEventListener('click', (e) => { e.preventDefault(); document.querySelector('.dev-img')?.scrollIntoView({ behavior:'smooth' }); closeSidebar(); });
    document.getElementById('sidebarTesti')?.addEventListener('click', (e) => { e.preventDefault(); window.open('https://whatsapp.com/channel/0029VbCSTuq1noz6SmhTaQ2z', '_blank'); closeSidebar(); });
    document.getElementById('sidebarChannel')?.addEventListener('click', (e) => { e.preventDefault(); window.open('https://whatsapp.com/channel/0029Vb7zuvcAInPnuUbfqX0E', '_blank'); closeSidebar(); });
}

function closeSidebar() {
    const side = document.getElementById('sideNav');
    side?.classList.remove('open');
    document.body.style.overflow = '';
}
function openSidebar() {
    const side = document.getElementById('sideNav');
    side?.classList.add('open');
    document.body.style.overflow = 'hidden';
}
document.getElementById('menuDotsBtn')?.addEventListener('click', () => {
    const s = document.getElementById('sideNav');
    if (s?.classList.contains('open')) closeSidebar(); else openSidebar();
});
document.addEventListener('click', (e) => {
    const s = document.getElementById('sideNav');
    if (s?.classList.contains('open') && !s.contains(e.target) && !e.target.closest('.menu-dots')) closeSidebar();

    const modal = document.getElementById('qrisModal');
    const modalContent = modal?.querySelector('.modal-content');
    const clickedCard = e.target.closest('.module-card');
    const clickedOption = e.target.closest('.payment-option');

    if (!clickedCard && !clickedOption && modal?.style.display === 'flex' && modalContent && !modalContent.contains(e.target)) {
        closeModal();
    }
});

function setLanguage(lang) {
    currentLang = lang;
    renderContent();
    buildSidebar();
    const btn = document.getElementById('langToggleBtn');
    if (btn) btn.innerHTML = `<i class="fa-solid fa-globe"></i> ${lang === 'id' ? 'ID' : 'EN'} <i class="fa-solid fa-chevron-down"></i>`;
    const t = translations[lang];
    document.getElementById('modalTitle').innerText = t.modalTitle;
    document.getElementById('modalAdminMsg').innerHTML = `<strong>${t.modalAdminMsg}</strong>`;
    document.getElementById('modalProductLabel').innerHTML = `${t.modalProductLabel} <span id="modalProductName">-</span>`;
    document.getElementById('modalPriceLabel').innerHTML = `${t.modalPriceLabel} <span id="modalProductPrice">0</span>`;
    document.getElementById('modalInstruksi').innerText = t.modalInstruksi;
    document.getElementById('confirmPayBtn').innerText = t.modalConfirmBtn;
    document.getElementById('modalFooterNote').innerText = t.modalFooterNote;
}

const langToggle = document.getElementById('langToggleBtn');
const langMenu = document.getElementById('langMenu');
if (langToggle) {
    langToggle.addEventListener('click', () => langMenu.classList.toggle('show'));
    document.addEventListener('click', (e) => { if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) langMenu.classList.remove('show'); });
    document.querySelectorAll('.lang-option').forEach(opt => opt.addEventListener('click', () => { setLanguage(opt.getAttribute('data-lang')); langMenu.classList.remove('show'); }));
}

setTimeout(() => { document.getElementById('progress').style.width = '100%'; }, 100);
setTimeout(() => { shouldAnimateLoader = false; const l = document.getElementById('loader'); l.style.opacity = '0'; setTimeout(() => { l.style.display = 'none'; document.getElementById('mainContent').style.display = 'block'; document.body.style.overflow = 'auto'; }, 500); }, 3000);

window.addEventListener('DOMContentLoaded', () => { setLanguage('id'); buildSidebar(); document.getElementById('mainContent').style.display = 'none'; });