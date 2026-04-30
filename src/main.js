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
    id: 'pack-web-dev',
    name: 'A',
    description: 'HTML, CSS, JS, and all the tools.',
    timeLimit: 90,
    gridSize: 12,
    words: [
      { word: 'JAVASCRIPT', clue: 'Bahasa pemrograman untuk interaktivitas web' },
      { word: 'TAILWIND', clue: 'Framework CSS yang berfokus pada utility-class' },
      { word: 'HTML', clue: 'Bahasa markup dasar pembentuk web' },
      { word: 'CSS', clue: 'Digunakan untuk memberi gaya (styling) pada halaman web' },
      { word: 'MODULAR', clue: 'Pendekatan membagi kode menjadi bagian-bagian kecil' },
      { word: 'FRONTEND', clue: 'Bagian web yang berinteraksi langsung dengan user' },
      { word: 'DEVELOPER', clue: 'Seorang pekerja yang membuat software' },
      { word: 'INTERFACE', clue: 'Antarmuka visual dari sebuah aplikasi' },
      { word: 'COMPONENT', clue: 'Bagian UI mandiri yang dapat digunakan kembali' },
      { word: 'ARCHITECTURE', clue: 'Struktur rancangan utama dari sebuah sistem perangkat lunak' }
    ]
  },
  {
    id: 'pack-animals',
    name: 'B',
    description: 'Creatures from around the world.',
    timeLimit: 60,
    gridSize: 10,
    words: [
      { word: 'ELEPHANT', clue: 'Hewan darat terbesar yang memiliki belalai' },
      { word: 'GIRAFFE', clue: 'Mamalia dengan leher yang sangat panjang' },
      { word: 'KANGAROO', clue: 'Hewan berkantung asli dari Australia' },
      { word: 'DOLPHIN', clue: 'Mamalia laut yang sangat cerdas' },
      { word: 'PENGUIN', clue: 'Burung yang tidak bisa terbang namun pandai berenang' },
      { word: 'CHEETAH', clue: 'Kucing besar pelari tercepat di darat' },
      { word: 'GORILLA', clue: 'Primata besar yang hidup berkelompok di hutan Afrika' },
      { word: 'OSTRICH', clue: 'Burung terbesar di dunia yang berlari kencang' }
    ]
  },
  {
    id: 'pack-space',
    name: 'C',
    description: 'To infinity and beyond!',
    timeLimit: 80,
    gridSize: 12,
    words: [
      { word: 'UNIVERSE', clue: 'Seluruh ruang, waktu, beserta isinya (Alam Semesta)' },
      { word: 'GALAXY', clue: 'Sistem besar yang terdiri dari bintang, gas, dan debu' },
      { word: 'ASTEROID', clue: 'Bebatuan kecil yang mengorbit matahari' },
      { word: 'SATELLITE', clue: 'Benda yang mengorbit planet (alami maupun buatan)' },
      { word: 'TELESCOPE', clue: 'Alat bantu untuk melihat benda langit yang jauh' },
      { word: 'ASTRONAUT', clue: 'Orang yang pergi menjelajahi luar angkasa' },
      { word: 'NEBULA', clue: 'Awan antarbintang yang terdiri dari debu dan gas' },
      { word: 'SUPERNOVA', clue: 'Ledakan dahsyat dari suatu bintang' },
      { word: 'GRAVITY', clue: 'Gaya tarik-menarik antar benda bermassa' }
    ]
  },
  {
    id: 'pack-fruits',
    name: 'D',
    description: 'Healthy and sweet nature snacks.',
    timeLimit: 45,
    gridSize: 10,
    words: [
      { word: 'APPLE', clue: 'Buah merah atau hijau yang renyah dan ikon merek teknologi' },
      { word: 'BANANA', clue: 'Buah kuning panjang yang disukai monyet' },
      { word: 'ORANGE', clue: 'Buah jeruk nipis kaya akan vitamin C' },
      { word: 'MANGO', clue: 'Buah tropis yang manis dan berwarna kuning saat matang' },
      { word: 'STRAWBERRY', clue: 'Buah merah kecil berbintik putih dengan rasa asam manis' },
      { word: 'PINEAPPLE', clue: 'Buah berduri jambul berdaging kuning (nanas)' },
      { word: 'GRAPES', clue: 'Buah ungu bergerombol bahan baku anggur' },
      { word: 'WATERMELON', clue: 'Buah besar hijau dengan daging merah berair (semangka)' }
    ]
  },
  {
    id: 'pack-countries',
    name: 'E',
    description: 'Nations from different continents.',
    timeLimit: 75,
    gridSize: 12,
    words: [
      { word: 'INDONESIA', clue: 'Negara kepulauan terbesar di Asia Tenggara' },
      { word: 'JAPAN', clue: 'Negara yang dijuluki Negeri Matahari Terbit' },
      { word: 'BRAZIL', clue: 'Negara di Amerika Selatan yang terkenal dengan sepakbola dan samba' },
      { word: 'CANADA', clue: 'Negara di utara Amerika Serikat bersimbol daun maple' },
      { word: 'GERMANY', clue: 'Negara di Eropa yang beribukota Berlin' },
      { word: 'AUSTRALIA', clue: 'Benua dan negara tempat kanguru berasal' },
      { word: 'EGYPT', clue: 'Negara asal Piramida Giza dan sungai Nil' },
      { word: 'MEXICO', clue: 'Negara tetangga Amerika Serikat yang terkenal dengan Taco' },
      { word: 'FRANCE', clue: 'Negara di Eropa yang beribukota Paris' }
    ]
  },
  {
    id: 'pack-sports',
    name: 'F',
    description: 'Athletic competitions.',
    timeLimit: 60,
    gridSize: 11,
    words: [
      { word: 'BASKETBALL', clue: 'Olahraga memasukkan bola ke keranjang' },
      { word: 'SOCCER', clue: 'Sepak bola, olahraga paling populer di dunia' },
      { word: 'TENNIS', clue: 'Olahraga raket dan bola hijau di lapangan' },
      { word: 'SWIMMING', clue: 'Olahraga air bergerak maju di kolam' },
      { word: 'VOLLEYBALL', clue: 'Olahraga memukul bola melampaui net (bola voli)' },
      { word: 'BASEBALL', clue: 'Olahraga memukul bola dengan tongkat berlari ke base' },
      { word: 'CRICKET', clue: 'Olahraga lapangan populer di India dan Inggris' },
      { word: 'BADMINTON', clue: 'Olahraga raket dan kok (bulutangkis)' }
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
    if (debugScreen) {
      setTimeout(() => this.showScreen(debugScreen), 0);
    }

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
      card.className = 'bg-white/40 p-6 rounded-2xl shadow-lg border border-white/50 hover:border-indigo-100/50 hover:bg-white/80 transition-all cursor-pointer transform hover:-translate-y-1';
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
