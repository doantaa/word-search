import './style.css';
import { GameController } from './modules/GameController.js';
import homeHTML from './ui/home.html?raw';
import selectHTML from './ui/select.html?raw';
import instructionHTML from './ui/instruction.html?raw';
import countdownHTML from './ui/countdown.html?raw';
import gameHTML from './ui/game.html?raw';
import modalsHTML from './ui/modals.html?raw';

// Configuration for the game packs
const GAME_PACKS = [
  {
    id: 'pack-a',
    name: 'A',
    description: 'Paket A',
    timeLimit: 120,
    gridSize: 12,
    color: '#ffffff',
    words: [
      { word: 'LATENT', clue: 'Gambar atau tulisan yang akan terlihat jika uang digerakkan atau dilihat dari sudut pandang tertentu disebut … Image' },
      { word: 'PEKA', clue: 'Program Pelindungan Konsumen Bank Indonesia disebut' },
      { word: 'BIFAST', clue: 'Sistem pembayaran ritel nasional yang dikembangkan oleh Bank Indonesia untuk memfasilitasi transfer dan pembayaran secara real-time, aman, efisien, dan tersedia setiap saat (24/7).' },
      { word: 'KENALI', clue: 'Paham tanggung jawab konsumen dalam bertransaksi merupakan aspek …. dalam konsep Perlindungan Konsumen Bank Indonesia' },
      { word: 'BIRATE', clue: 'Suku bunga kebijakan utama yang ditetapkan oleh Bank Indonesia saat ini dikenal sebagai...' },
    ]
  },
  {
    id: 'pack-b',
    name: 'B',
    description: 'Paket B',
    timeLimit: 120,
    gridSize: 12,
    color: '#ffdd00',
    words: [
      { word: 'BANKSENTRAL', clue: 'Bank Indonesia adalah ... Republik Indonesia' },
      { word: 'BICARA', clue: 'Nama call center Bank Indonesia adalah…' },
      { word: 'RUPIAH', clue: 'Mata Uang Negara Republik Indonesia ' },
      { word: 'RECTOVERSO', clue: 'Sebuah unsur pengaman pada uang kertas yang menggunakan teknik cetak khusus. Ketika dilihat terpisah, gambar pada bagian depan dan belakang uang akan tampak seperti ornamen tidak beraturan. Namun, ketika diterawang, gambar-gambar tersebut akan membentuk sebuah gambar yang utuh.' },
      { word: 'CEMUMUAH', clue: 'Cepat, Mudah, Murah, Aman, dan Handal. Ini adalah prinsip yang diterapkan pada sistem pembayaran digital, khususnya Quick Response Code Indonesian Standard (QRIS). Dapat disingkat menjadi' }
    ]
  },
  {
    id: 'pack-c',
    name: 'C',
    description: 'Paket C',
    timeLimit: 120,
    gridSize: 12,
    color: '#ffffff',
    words: [
      { word: 'INTAGLIO', clue: 'Teknik cetak yang menghasilkan tekstur timbul pada uang kertas dan memberikan kesan timbul pada gambar dan teks, sehingga uang kertas terasa kasar saat diraba.' },
      { word: 'SMARTPHONE', clue: 'Jenis perangkat yang sering digunakan untuk mengakses internet' },
      { word: 'PINTAR', clue: 'Masyarakat dapat menukarkan Uang Rusak dan Uang yang ditarik dari peredaran ke BI terdekat dengan sebelumnya mendaftar pada Website' },
      { word: 'CROSSBORDER', clue: 'Fitur penggunaan QRIS antar negara disebut QRIS' },
      { word: 'WATERMARK', clue: 'Gambar pahlawan dan ornamen yang terlihat samar jika uang diterawangkan ke arah cahaya disebut..' },
    ]
  },
  {
    id: 'pack-d',
    name: 'D',
    description: 'Paket D',
    timeLimit: 120,
    gridSize: 12,
    color: '#ffdd00',
    words: [
      { word: 'BANGGA', clue: 'Apakah kepanjangan huruf B dalam CBP Rupiah?' },
      { word: 'SKIMMING', clue: 'Jenis kejahatan cyber dengan cara mencuri data kartu debit atau kartu kredit untuk menarik dana di rekening korban disebut.' },
      { word: 'DIGITAL', clue: 'QRIS merupakan salah satu jenis pembayaran' },
      { word: 'SYARIAH', clue: 'Ekonomi Islam disebut juga ekonomi.' },
      { word: 'MALWARE', clue: 'Salah satu bentuk modus penipuan sistem pembayaran di era digital' }
    ]
  },
  {
    id: 'pack-e',
    name: 'E',
    description: 'Paket E',
    timeLimit: 120,
    gridSize: 12,
    color: '#ffffff',
    words: [
      { word: 'PHISING', clue: 'Salah satu bentuk modus penipuan sistem pembayaran di era digital ' },
      { word: 'MIKROTEKS', clue: 'Tulisan-tulisan kecil yang hanya dapat dibaca dengan alat bantu atau kaca pembesar dalam Rupiah disebut' },
      { word: 'BLINDCODE', clue: 'Garis di sisi kanan kiri uang yang terasa kasar apabila diraba dan digunakan tuna netra untuk mengetahui nominal uang disebut' },
      { word: 'QRIS', clue: 'Standar kode QR nasional untuk pembayaran digital di Indonesia yang dikembangkan oleh Bank Indonesia dan Asosiasi Sistem Pembayaran Indonesia (ASPI)' },
      { word: 'HYPERINFLASI', clue: 'Inflasi yang tidak terkendali disebut' }
    ]
  },
  {
    id: 'pack-f',
    name: 'F',
    description: 'Paket F',
    timeLimit: 120,
    gridSize: 12,
    color: '#ffdd00',
    words: [
      { word: 'GIRAL', clue: 'Alat pembayaran non-tunai seperti cek dan kartu debit/kredit termasuk dalam kategori uang…' },
      { word: 'INFLASI', clue: 'Kenaikan tingkat harga barang dan jasa secara umum dan terus-menerus dalam suatu perekonomian disebut ….' },
      { word: 'DILIHAT', clue: '3D adalah … , diraba, diterawang' },
      { word: 'MALAYSIA', clue: 'QRIS Crossborder dapat digunakan di negara lain, salah satunya adalah' },
      { word: 'THAILAND', clue: 'QRIS Crossborder dapat digunakan di negara lain, salah satunya adalah' }
    ]
  }
];

class AppManager {
  constructor() {
    this.gameController = null;
    this.currentPack = null;

    // Screens
    this.homeScreen = document.getElementById('home-screen');
    this.selectScreen = document.getElementById('select-screen');
    this.instructionScreen = document.getElementById('instruction-screen');
    this.countdownScreen = document.getElementById('countdown-screen');
    this.gameScreen = document.getElementById('game-screen');

    // Elements
    this.packsContainer = document.getElementById('packs-container');
    this.countdownText = document.getElementById('countdown-text');

    // Buttons
    document.getElementById('btn-start-game').addEventListener('click', () => this.showScreen('select'));
    document.getElementById('btn-back-home').addEventListener('click', () => this.showScreen('home'));

    // Instruction Buttons
    document.getElementById('btn-instruction-back').addEventListener('click', () => this.showScreen('select'));
    document.getElementById('btn-ready').addEventListener('click', () => this.startCountdown(this.currentPack));
    document.getElementById('btn-quit').addEventListener('click', () => {
      if (this.gameController) this.gameController.quit();
      this.showScreen('select');
    });

    document.getElementById('btn-win-menu').addEventListener('click', () => {
      document.getElementById('win-modal').classList.add('hidden');
      document.getElementById('win-modal').classList.remove('flex');
      this.showScreen('select');
    });

    document.getElementById('btn-lose-menu').addEventListener('click', () => {
      document.getElementById('lose-modal').classList.add('hidden');
      document.getElementById('lose-modal').classList.remove('flex');
      this.showScreen('select');
    });

    // We override play-again behavior to restart immediately without countdown
    document.getElementById('btn-play-again').addEventListener('click', () => {
      document.getElementById('win-modal').classList.add('hidden');
      document.getElementById('win-modal').classList.remove('flex');
      if (this.gameController) this.gameController.start();
    });

    document.getElementById('btn-lose-play-again').addEventListener('click', () => {
      document.getElementById('lose-modal').classList.add('hidden');
      document.getElementById('lose-modal').classList.remove('flex');
      if (this.gameController) this.gameController.start();
    });

    this.renderPacks();

    // DEBUG
    const urlParams = new URLSearchParams(window.location.search);
    const debugScreen = urlParams.get('screen');
    this.setupMusic();
  }

  setupMusic() {
    this.audio = document.getElementById('bg-music');
    this.musicToggle = document.getElementById('music-toggle');
    this.musicOnIcon = document.getElementById('music-on-icon');
    this.musicOffIcon = document.getElementById('music-off-icon');
    this.isMusicPlaying = false;
    this.userMuted = false;

    // Set lower volume for background music
    if (this.audio) this.audio.volume = 0.3;

    if (this.musicToggle) {
      this.musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMusic();
      });
    }

    const startMusic = () => {
      if (!this.isMusicPlaying && !this.userMuted) {
        this.playMusic();
      }
      window.removeEventListener('click', startMusic);
      window.removeEventListener('touchstart', startMusic);
    };

    window.addEventListener('click', startMusic);
    window.addEventListener('touchstart', startMusic);
  }

  toggleMusic() {
    if (!this.audio) return;
    if (this.isMusicPlaying) {
      this.pauseMusic();
      this.userMuted = true;
    } else {
      this.playMusic();
      this.userMuted = false;
    }
  }

  playMusic() {
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isMusicPlaying = true;
      if (this.musicOnIcon) this.musicOnIcon.classList.remove('hidden');
      if (this.musicOffIcon) this.musicOffIcon.classList.add('hidden');
    }).catch(err => console.warn("Audio play failed:", err));
  }

  pauseMusic() {
    if (!this.audio) return;
    this.audio.pause();
    this.isMusicPlaying = false;
    if (this.musicOnIcon) this.musicOnIcon.classList.add('hidden');
    if (this.musicOffIcon) this.musicOffIcon.classList.remove('hidden');
  }

  showScreen(screenName) {
    // Hide all
    [this.homeScreen, this.selectScreen, this.instructionScreen, this.countdownScreen, this.gameScreen].forEach(el => {
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '0';
    });

    // Show target
    let target;
    if (screenName === 'home') target = this.homeScreen;
    if (screenName === 'select') target = this.selectScreen;
    if (screenName === 'instruction') target = this.instructionScreen;
    if (screenName === 'countdown') target = this.countdownScreen;
    if (screenName === 'game') target = this.gameScreen;

    if (target) {
      target.style.zIndex = '40';
      target.style.pointerEvents = 'auto';
      // Slight delay for opacity transition
      setTimeout(() => target.style.opacity = '1', 50);
    }
  }

  renderPacks() {
    this.packsContainer.innerHTML = '';

    GAME_PACKS.forEach(pack => {
      const card = document.createElement('div');
      card.className = 'p-6 rounded-2xl shadow-lg border border-white/30 hover:border-white/60 transition-all cursor-pointer transform hover:-translate-y-1';
      card.style.backgroundColor = `${pack.color}44`; // 44 is ~25% opacity
      card.style.backdropFilter = 'blur(8px)';
      card.innerHTML = `
        <h3 class="text-6xl text-center my-16 font-bold text-white">${pack.name}</h3>
      `;

      card.addEventListener('click', () => {
        this.currentPack = pack;
        this.showScreen('instruction');
      });
      this.packsContainer.appendChild(card);
    });
  }

  startCountdown(pack) {
    this.showScreen('countdown');

    let count = 3;
    this.countdownText.textContent = count;
    this.countdownText.style.transform = 'scale(1)';

    const interval = setInterval(() => {
      // Reset scale for animation
      this.countdownText.style.transform = 'scale(0.5)';

      setTimeout(() => {
        count--;
        if (count > 0) {
          this.countdownText.textContent = count;
          this.countdownText.style.transform = 'scale(1)';
        } else if (count === 0) {
          this.countdownText.textContent = 'GO!';
          this.countdownText.style.transform = 'scale(1.2)';
        } else {
          clearInterval(interval);
          this.startGame(pack);
        }
      }, 100); // Wait for scale down before changing text
    }, 1000);
  }

  startGame(pack) {
    this.showScreen('game');

    // Clear previous game container if needed
    document.getElementById('grid-container').innerHTML = '';
    document.getElementById('word-list-container').innerHTML = '';

    // Initialize or re-initialize game controller
    this.gameController = new GameController(pack);
    this.gameController.start();
  }
}

// Initialize the app
const appContainer = document.getElementById('app');
if (appContainer) {
  appContainer.innerHTML = `
    ${homeHTML}
    ${selectHTML}
    ${instructionHTML}
    ${countdownHTML}
    ${gameHTML}
    ${modalsHTML}
  `;
}
new AppManager();
