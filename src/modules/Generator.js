import { DIRECTIONS, getRandomLetter, shuffleArray } from '../utils/helpers.js';

export class Generator {
  constructor(size, words) {
    this.size = size;
    this.wordObjects = words.map(w => ({ word: w.word.toUpperCase(), clue: w.clue }));
    this.grid = [];
    this.placedWords = [];
  }

  generate() {
    this._initializeGrid();
    
    // Sort words by length descending to place larger words first
    const sortedWords = [...this.wordObjects].sort((a, b) => b.word.length - a.word.length);

    for (const obj of sortedWords) {
      if (this._placeWord(obj.word)) {
        this.placedWords.push(obj);
      }
    }

    this._fillEmptyCells();

    return {
      grid: this.grid,
      placedWords: this.placedWords // words successfully placed
    };
  }

  _initializeGrid() {
    this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(''));
  }

  _placeWord(word) {
    const directions = shuffleArray(DIRECTIONS);
    
    for (let attempts = 0; attempts < 100; attempts++) {
      const dir = directions[attempts % directions.length];
      const startRow = Math.floor(Math.random() * this.size);
      const startCol = Math.floor(Math.random() * this.size);

      if (this._canPlaceWord(word, startRow, startCol, dir)) {
        this._writeWord(word, startRow, startCol, dir);
        return true;
      }
    }
    console.warn(`Could not place word: ${word}`);
    return false;
  }

  _canPlaceWord(word, row, col, dir) {
    const [dRow, dCol] = dir;
    const endRow = row + dRow * (word.length - 1);
    const endCol = col + dCol * (word.length - 1);

    // Check bounds
    if (endRow < 0 || endRow >= this.size || endCol < 0 || endCol >= this.size) {
      return false;
    }

    // Check overlapping
    for (let i = 0; i < word.length; i++) {
      const currRow = row + dRow * i;
      const currCol = col + dCol * i;
      const cell = this.grid[currRow][currCol];
      
      if (cell !== '' && cell !== word[i]) {
        return false;
      }
    }

    return true;
  }

  _writeWord(word, row, col, dir) {
    const [dRow, dCol] = dir;
    for (let i = 0; i < word.length; i++) {
      this.grid[row + dRow * i][col + dCol * i] = word[i];
    }
  }

  _fillEmptyCells() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.grid[row][col] === '') {
          this.grid[row][col] = getRandomLetter();
        }
      }
    }
  }
}
