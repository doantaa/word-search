export class Grid {
  constructor(containerId, size) {
    this.container = document.getElementById(containerId);
    this.size = size;
    this.cells = [];
    this.isSelecting = false;
    this.startCell = null;
    this.currentSelection = [];
    
    // Callbacks to be set by GameController
    this.onSelectionEnd = null;

    this._bindEvents();
  }

  render(gridData) {
    this.container.innerHTML = '';
    // Set CSS grid rows/cols
    this.container.style.gridTemplateColumns = `repeat(${this.size}, minmax(0, 1fr))`;
    this.cells = [];

    for (let row = 0; row < this.size; row++) {
      this.cells[row] = [];
      for (let col = 0; col < this.size; col++) {
        const cell = document.createElement('div');
        cell.className = 'word-search-cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.textContent = gridData[row][col];
        
        this.container.appendChild(cell);
        this.cells[row][col] = cell;
      }
    }
  }

  markFound(cellsToMark) {
    cellsToMark.forEach(({ row, col }) => {
      const cell = this.cells[row][col];
      cell.classList.remove('selected');
      cell.classList.add('found');
    });
  }

  clearSelection() {
    this.currentSelection.forEach(({ row, col }) => {
      const cell = this.cells[row][col];
      cell.classList.remove('selected');
    });
    this.currentSelection = [];
    this.startCell = null;
  }

  _bindEvents() {
    // Desktop mouse events
    this.container.addEventListener('mousedown', this._handleStart.bind(this));
    this.container.addEventListener('mouseover', this._handleMove.bind(this));
    window.addEventListener('mouseup', this._handleEnd.bind(this));

    // Touch events
    this.container.addEventListener('touchstart', this._handleTouchStart.bind(this), { passive: false });
    this.container.addEventListener('touchmove', this._handleTouchMove.bind(this), { passive: false });
    window.addEventListener('touchend', this._handleEnd.bind(this));
  }

  _handleStart(e) {
    if (e.target.classList.contains('word-search-cell')) {
      if (e.type === 'touchstart') e.preventDefault();
      this.isSelecting = true;
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
      this.startCell = { row, col };
      this._updateSelection({ row, col });
    }
  }

  _handleMove(e) {
    if (!this.isSelecting) return;
    if (e.target.classList.contains('word-search-cell')) {
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
      this._updateSelection({ row, col });
    }
  }

  _handleTouchStart(e) {
    if (e.target.classList.contains('word-search-cell')) {
      e.preventDefault(); // Prevent scrolling
      this.isSelecting = true;
      const row = parseInt(e.target.dataset.row);
      const col = parseInt(e.target.dataset.col);
      this.startCell = { row, col };
      this._updateSelection({ row, col });
    }
  }

  _handleTouchMove(e) {
    if (!this.isSelecting) return;
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (target && target.classList.contains('word-search-cell')) {
      const row = parseInt(target.dataset.row);
      const col = parseInt(target.dataset.col);
      this._updateSelection({ row, col });
    }
  }

  _handleEnd() {
    if (this.isSelecting) {
      this.isSelecting = false;
      if (this.onSelectionEnd && this.currentSelection.length > 0) {
        this.onSelectionEnd(this.currentSelection);
      }
    }
  }

  _updateSelection(endCell) {
    // Clear previous visual selection
    this.currentSelection.forEach(({ row, col }) => {
      this.cells[row][col].classList.remove('selected');
    });

    this.currentSelection = this._calculateLine(this.startCell, endCell);

    // Apply visual selection
    this.currentSelection.forEach(({ row, col }) => {
      this.cells[row][col].classList.add('selected');
    });
  }

  _calculateLine(start, end) {
    const dRow = end.row - start.row;
    const dCol = end.col - start.col;
    
    // Only allow selecting Right and Down
    if (dRow < 0 || dCol < 0) {
      return [start];
    }
    
    // Must be straight line (horizontal, vertical, or perfectly diagonal)
    if (dRow !== 0 && dCol !== 0 && Math.abs(dRow) !== Math.abs(dCol)) {
      return [start]; // Invalid angle, just select start
    }

    const steps = Math.max(Math.abs(dRow), Math.abs(dCol));
    const stepRow = dRow === 0 ? 0 : dRow / Math.abs(dRow);
    const stepCol = dCol === 0 ? 0 : dCol / Math.abs(dCol);

    const line = [];
    for (let i = 0; i <= steps; i++) {
      line.push({
        row: start.row + (stepRow * i),
        col: start.col + (stepCol * i)
      });
    }
    
    return line;
  }
}
