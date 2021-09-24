import './card-body.component.css';
import Component from '../../../shared/base.component';
import CardItemLineComponent from './card-item-line/card-item-line.component';

/**
 * @typedef {import('../../../../domain/app.model').default} AppModel
 */

export default class CardBodyComponent extends Component {
  /**
   * Creates an instance of CardBodyComponent.
   * @param {DomAdapter} dom
   * @param {string | null} [id=null]
   * @memberof HeaderComponent
   */
  constructor(dom, id = null) {
    super(dom, id);
  }

  /**
   * @param {{domain: string, apps: AppModel[] }} props
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render(props) {
    if (props !== null) {
      const lines = props.apps.map(app =>
        new CardItemLineComponent(this.domAdapter, this.rootId).render({ app })
      );
      const el = this.createElement('div', null, ['card__body'], `card-body`, lines);
      return el;
    }
    return null;
  }
}
