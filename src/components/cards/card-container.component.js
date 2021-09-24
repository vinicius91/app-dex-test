import './card-container.component.css';
import Component from '../shared/base.component';

/**
 * @typedef {import('../../../domain/host.model').default} HostModel
 */

export default class CardComponent extends Component {
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
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render() {
    const el = this.createElement('main', null, ['cards__container'], `cards-container`);
    return el;
  }
}
