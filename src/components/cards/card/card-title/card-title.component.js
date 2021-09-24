import './card-title.component.css';
import Component from '../../../shared/base.component';

export default class CardTitleComponent extends Component {
  /**
   * Creates an instance of CardTitleComponent.
   * @param {DomAdapter} dom
   * @param {string | null} [id=null]
   * @memberof HeaderComponent
   */
  constructor(dom, id = null) {
    super(dom, id);
  }

  /**
   * @param {{domain: string}} props
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render(props) {
    if (props !== null) {
      const title = this.createChildElement('p', props.domain, null, 'title');
      const el = this.createElement('div', null, ['card__title'], `cards-container`, [title]);
      return el;
    }
    return null;
  }
}
