import View from './view';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      //   console.log(goto);
      handler(goto);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    console.log(this._data, 'this one');
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPage);

    // Page 1 and other page
    if (currPage === 1 && numPage > 1) {
      return `
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
     </button>
      `;
    }

    //last page
    if (currPage === numPage) {
      return `
        <button data-goto="${
          currPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
        </button>
        `;
    }
    //other page
    if (currPage < numPage && currPage > 1) {
      return `
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
     </button>

   <button data-goto="${
     currPage - 1
   }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
       <span>Page ${currPage - 1}</span>
   </button>
        `;
    }

    //page 1 only.
    if ((currPage === numPage) === 1) {
      return ``;
    }
  }
}
export default new paginationView();
