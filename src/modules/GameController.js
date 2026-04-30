import { Generator } from './Generator.js';
import { Grid } from './Grid.js';
import { WordList } from './WordList.js';
import { Timer } from './Timer.js';

export class GameController {
  constructor(config) {
    this.config = config;
    this.wordsToFind = [];
    this.foundWords = new Set();
    this.gridData = [];

    // Initialize modules
    this.grid = new Grid('grid-container', config.gridSize);
    this.wordList = new WordList('word-list-container');
    this.timer = new Timer('timer-text', this._handleTimeout.bind(this));
    
    // UI Elements
    this.progressText = document.getElementById('progress-text');
    this.winModal = document.getElementById('win-modal');
    this.winTime = document.getElementById('win-time');
    this.loseModal = document.getElementById('lose-modal');

    this._bindEvents();
  }

  start() {
    this.foundWords.clear();
    this._hideWinModal();
    this._hideLoseModal();

    // Generate puzzle
    const generator = new Generator(this.config.gridSize, this.config.words);
    const result = generator.generate();
    
    this.gridData = result.grid;
    this.wordsToFind = result.placedWords;

    // Initialize UI
    this.grid.render(this.gridData);
    this.wordList.render(this.wordsToFind);
    this._updateProgress();
    this.timer.start(this.config.timeLimit || 60);
  }

  _bindEvents() {
    this.grid.onSelectionEnd = this._handleSelectionEnd.bind(this);
  }

  quit() {
    this.timer.stop();
  }

  _handleSelectionEnd(selectedCells) {
    // Reconstruct word from selected cells
    const selectedWord = selectedCells
      .map(cell => this.gridData[cell.row][cell.col])
      .join('');
      
    // Check if word is in the list
    let matchedWord = null;
    if (this.wordsToFind.some(obj => obj.word === selectedWord)) {
      matchedWord = selectedWord;
    }

    if (matchedWord && !this.foundWords.has(matchedWord)) {
      // Word found
      this.foundWords.add(matchedWord);
      this.grid.markFound(selectedCells);
      this.wordList.markFound(matchedWord);
      this._updateProgress();
      this._checkWinCondition();
    }
    
    this.grid.clearSelection();
  }

  _updateProgress() {
    this.progressText.textContent = `${this.foundWords.size} / ${this.wordsToFind.length}`;
  }

  _checkWinCondition() {
    if (this.foundWords.size === this.wordsToFind.length) {
      this.timer.stop();
      setTimeout(() => this._showWinModal(), 500);
    }
  }

  _showWinModal() {
    this.winTime.textContent = this.timer.getFormattedTime();
    this.winModal.classList.remove('hidden');
    this.winModal.classList.add('flex');
    // Trigger reflow
    void this.winModal.offsetWidth;
    this.winModal.classList.remove('opacity-0');
    this.winModal.querySelector('div').classList.remove('scale-95');
    this.winModal.querySelector('div').classList.add('scale-100');
  }

  _hideWinModal() {
    this.winModal.classList.add('opacity-0');
    this.winModal.querySelector('div').classList.remove('scale-100');
    this.winModal.querySelector('div').classList.add('scale-95');
    
    setTimeout(() => {
      this.winModal.classList.add('hidden');
      this.winModal.classList.remove('flex');
    }, 300);
  }

  _handleTimeout() {
    this.grid.clearSelection();
    this._showLoseModal();
  }

  _showLoseModal() {
    this.loseModal.classList.remove('hidden');
    this.loseModal.classList.add('flex');
    void this.loseModal.offsetWidth;
    this.loseModal.classList.remove('opacity-0');
    this.loseModal.querySelector('div').classList.remove('scale-95');
    this.loseModal.querySelector('div').classList.add('scale-100');
  }

  _hideLoseModal() {
    this.loseModal.classList.add('opacity-0');
    this.loseModal.querySelector('div').classList.remove('scale-100');
    this.loseModal.querySelector('div').classList.add('scale-95');
    
    setTimeout(() => {
      this.loseModal.classList.add('hidden');
      this.loseModal.classList.remove('flex');
    }, 300);
  }
}
