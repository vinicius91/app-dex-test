import './loading.component.css';

import Component from '../shared/base.component';

export default class LoadingComponent extends Component {
  /**
   * Creates an instance of LoadingComponent.
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
    const loader2 = this.createChildElement('div', null, ['loader2']);
    const loader3 = this.createChildElement('div', null, ['loader3']);
    const loader4 = this.createChildElement('div', null, ['loader4']);
    const loadContainer = this.createChildElement('div', null, ['loadContainer'], null, [
      loader2,
      loader3,
      loader4
    ]);
    const span = this.createChildElement('span', 'Loading...', ['loading__label']);
    const el = this.createElement('div', null, ['center', 'loadWrapper'], 'main', [
      loadContainer,
      span
    ]);
    return el;
  }
}
