import './card.component.css';
import Component from '../../shared/base.component';
import CardTitleComponent from './card-title/card-title.component';
import CardBodyComponent from './card-body/card-body.component';

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
   * @param {{host: HostModel }} props
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render(props) {
    if (props !== null) {
      const apps = props.host.topApps.slice(0, 5);
      const cardBody = new CardBodyComponent(this.domAdapter, this.rootId).render({
        domain: props.host.domain,
        apps
      });
      const title = new CardTitleComponent(this.domAdapter, this.rootId).render({
        domain: props.host.domain
      });
      const el = this.createElement('div', null, ['card', 'card__grid'], `card`, [title, cardBody]);
      return el;
    }
    return null;
  }
}
