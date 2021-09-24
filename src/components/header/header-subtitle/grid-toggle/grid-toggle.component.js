/* eslint-disable no-restricted-syntax */
import './grid-toggle.component.css';

import Component from '../../../shared/base.component';

export default class GridToggleComponent extends Component {
  /**
   * Creates an instance of HeaderTitleComponent.
   * @param {DomAdapter} dom
   * @param {string | null} [id=null]
   * @memberof HeaderComponent
   */
  constructor(dom, id = null) {
    super(dom, id);
  }

  /**
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render() {
    const checkbox = this.createChildElement('input', null, null, 'toggle-checkbox');
    const label = this.createChildElement('span', 'Show as list', null, 'toggle-label');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('value', 'list');
    checkbox.addEventListener('click', $event => {
      if ($event) {
        const cards = this.domAdapter.elements.filter(el => el.classList[0] === 'card');
        if ($event.target.checked) {
          cards.forEach(c => c.classList.remove('card__grid'));
          return;
        }
        cards.forEach(c => c.classList.add('card__grid'));
      }
    });
    const el = this.createElement('div', null, ['checkbox__wrapper'], 'grid-toggle', [
      checkbox,
      label
    ]);
    return el;
  }
}
