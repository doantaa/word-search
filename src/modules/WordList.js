export class WordList {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.wordElements = {};
  }

  render(wordObjects) {
    this.container.innerHTML = '';
    this.wordElements = {};
    
    // Sort words by clue length or alphabetically. Let's do alphabetically by clue.
    const sortedWords = [...wordObjects].sort((a, b) => a.clue.localeCompare(b.clue));

    sortedWords.forEach(obj => {
      const el = document.createElement('div');
      el.className = 'word-list-item w-full text-sm leading-relaxed';
      el.textContent = obj.clue;
      this.container.appendChild(el);
      this.wordElements[obj.word] = el;
    });
  }

  markFound(word) {
    if (this.wordElements[word]) {
      this.wordElements[word].classList.add('found');
    }
  }

  reset() {
    Object.values(this.wordElements).forEach(el => {
      el.classList.remove('found');
    });
  }
}
