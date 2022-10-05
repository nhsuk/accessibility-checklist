/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   sortable-table.js
 *
 *   Desc:   Adds sorting to a HTML data table that implements ARIA Authoring Practices
 */

class SortableTable {
  constructor(tableNode) {
    this.tableNode = tableNode;

    this.columnHeaders = tableNode.querySelectorAll('thead th.sortable-col');

    this.sortColumns = [];

    for (let i = 0; i < this.columnHeaders.length; i += 1) {
      const ch = this.columnHeaders[i];
      const headerText = ch.innerHTML;
      const headerButton = `<button>${headerText}</button>`;
      ch.innerHTML = headerButton;

      const buttonNode = ch.querySelector('button');
      if (buttonNode) {
        this.sortColumns.push(i);
        buttonNode.setAttribute('data-column-index', i);
        buttonNode.addEventListener('click', this.handleClick.bind(this));
      }
    }

    this.divHtml = '<div aria-live="polite" role="status" aria-atomic="true" class="nhsuk-u-visually-hidden"></div>';
    this.tableNode.insertAdjacentHTML('afterend', this.divHtml);

    /*
    this.optionCheckbox = document.querySelector(
      'input[type="checkbox"][value="show-unsorted-icon"]'
    );
    */
    /*
    if (this.optionCheckbox) {
      this.optionCheckbox.addEventListener(
        'change',
        this.handleOptionChange.bind(this)
      );
      if (this.optionCheckbox.checked) {
        this.tableNode.classList.add('show-unsorted-icon');
      }
    }
    */

    // var tableObj = document.querySelector('table.sortable');
    // eslint-disable-next-line max-len
    // var ariaHtml = '<div id="message" aria-live="polite" role="status" aria-atomic="true" class="nhsuk-u-visually-hidden"></div>';
    // tableObj.insertAdjacentHTML("afterend", ariaHtml);
    // eslint-disable-next-line max-len
    // this.tableNode.insertAdjacentHTML("afterend", '<div id="message" aria-live="polite" role="status" aria-atomic="true" class="nhsuk-u-visually-hidden"></div>');
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
            `Sort by ${buttonNode.innerText} (ascending)`,
          );
        } else {
          ch.setAttribute('aria-sort', 'descending');
          this.sortColumn(
            columnIndex,
            'descending',
            ch.classList.contains('num'),
          );
          this.updateStatus(
            `Sort by ${buttonNode.innerText} (descending)`,
          );
        }
      } else if (ch.hasAttribute('aria-sort') && buttonNode) {
        ch.removeAttribute('aria-sort');
      }
    }
  }

  updateStatus(statusMessage) {
    const messageDiv = this.tableNode.nextElementSibling;
    const mesg = statusMessage;
    messageDiv.innerHTML = mesg;
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
    // console.log('clicked');
    // this.updateStatus();
  }

  /*
  handleOptionChange(event) {
    var tgt = event.currentTarget;

    if (tgt.checked) {
      this.tableNode.classList.add('show-unsorted-icon');
    } else {
      this.tableNode.classList.remove('show-unsorted-icon');
    }
  }
  */
}

// Initialize sortable table buttons
window.addEventListener('load', () => {
  const sortableTables = document.querySelectorAll('table.sortable');

  for (let i = 0; i < sortableTables.length; i += 1) {
    // eslint-disable-next-line no-new
    new SortableTable(sortableTables[i]);
  }
});
