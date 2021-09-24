import Component from './shared/base.component';

export default class RootComponent extends Component {
  /**
   * Creates an instance of CardComponent.
   * @param {DomAdapter} dom
   * @param {string | null} [id=null]
   * @memberof HeaderComponent
   */
  constructor(dom, id = null) {
    super(dom, id);
  }

  /**
   * @param {HTMLElement[]} children
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render(children) {
    if (children !== null) {
      const el = this.createElement('div', null, ['container'], `container`, children);
      return el;
    }
    return null;
  }
}
