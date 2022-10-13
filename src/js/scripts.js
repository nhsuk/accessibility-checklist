/*
 *   This is a modified version of Sortable Table Example:
 *   https://w3c.github.io/aria-practices/examples/table/sortable-table.html
 *
 *   Desc:   Adds sorting to a HTML data table that implements ARIA Authoring Practices
 */

class SortableTable {
  constructor(tableNode) {
    this.tableNode = tableNode;
    this.columnHeaders = tableNode.querySelectorAll('thead th');
    this.sortColumns = [];

    for (let i = 0; i < this.columnHeaders.length; i += 1) {
      const ch = this.columnHeaders[i];

      if (ch.classList.contains('sortable-col')) {
        const headerText = ch.innerHTML;
        const headerButton = `<button data-column-index="${i}">${headerText}<span aria-hidden="true"></span></button>`;
        ch.innerHTML = headerButton;
        this.sortColumns.push(i);
        ch.querySelector('button').addEventListener('click', this.handleClick.bind(this));
      }
    }

    this.divHtml = '<div id="message" aria-live="polite" role="status" aria-atomic="true" class="nhsuk-u-visually-hidden"></div>';
    this.tableNode.insertAdjacentHTML('beforebegin', this.divHtml);
  }

  setColumnHeaderSort(columnIndex) {
    if (typeof columnIndex === 'string') {
      // eslint-disable-next-line no-param-reassign
      columnIndex = parseInt(columnIndex, 10);
    }

    for (let i = 0; i < this.columnHeaders.length; i += 1) {
      const ch = this.columnHeaders[i];
      const buttonNode = ch.querySelector('button');
      if (i === columnIndex) {
        const value = ch.getAttribute('aria-sort');
        if (value === 'descending') {
          ch.setAttribute('aria-sort', 'ascending');
          this.sortColumn(
            columnIndex,
            'ascending',
            ch.classList.contains('num'),
          );
          this.updateStatus(
            `Sorted by ${buttonNode.innerText} (ascending)`,
          );
        } else {
          ch.setAttribute('aria-sort', 'descending');
          this.sortColumn(
            columnIndex,
            'descending',
            ch.classList.contains('num'),
          );
          this.updateStatus(
            `Sorted by ${buttonNode.innerText} (descending)`,
          );
        }
      } else if (ch.hasAttribute('aria-sort') && buttonNode) {
        ch.removeAttribute('aria-sort');
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  updateStatus(statusMessage) {
    const messageDiv = document.querySelector("[role='status']");
    messageDiv.textContent = statusMessage;
  }

  sortColumn(columnIndex, sortValue, isNumber) {
    function compareValues(a, b) {
      if (sortValue === 'ascending') {
        if (a.value === b.value) {
          return 0;
        }
        if (isNumber) {
          return a.value - b.value;
        }
        return a.value < b.value ? -1 : 1;
      }
      if (a.value === b.value) {
        return 0;
      }
      if (isNumber) {
        return b.value - a.value;
      }
      return a.value > b.value ? -1 : 1;
    }

    if (typeof isNumber !== 'boolean') {
      // eslint-disable-next-line no-param-reassign
      isNumber = false;
    }

    const tbodyNode = this.tableNode.querySelector('tbody');
    const rowNodes = [];
    const dataCells = [];

    let rowNode = tbodyNode.firstElementChild;

    let index = 0;
    while (rowNode) {
      rowNodes.push(rowNode);
      const rowCells = rowNode.querySelectorAll('th, td');
      const dataCell = rowCells[columnIndex];

      const data = {};
      data.index = index;
      data.value = dataCell.textContent.toLowerCase().trim();
      if (isNumber) {
        data.value = parseFloat(data.value);
      }
      dataCells.push(data);
      rowNode = rowNode.nextElementSibling;
      index += 1;
    }

    dataCells.sort(compareValues);

    // remove rows
    while (tbodyNode.firstChild) {
      tbodyNode.removeChild(tbodyNode.lastChild);
    }

    // add sorted rows
    for (let i = 0; i < dataCells.length; i += 1) {
      tbodyNode.appendChild(rowNodes[dataCells[i].index]);
    }
  }

  /* EVENT HANDLERS */
  handleClick(event) {
    const tgt = event.currentTarget;
    this.setColumnHeaderSort(tgt.getAttribute('data-column-index'));
  }
}

// Initialize sortable table buttons
window.addEventListener('load', () => {
  const sortableTables = document.querySelectorAll('table.sortable');
  for (let i = 0; i < sortableTables.length; i += 1) {
    // eslint-disable-next-line no-new
    new SortableTable(sortableTables[i]);
  }
});
