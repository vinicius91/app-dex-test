import './card-item-line.component.css';
import Component from '../../../../shared/base.component';

/**
 * @typedef {import('../../../../../domain/app.model').default} AppModel
 */

export default class CardItemLineComponent extends Component {
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
   * @param {{app}} props
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render(props) {
    if (props !== null) {
      const { app } = props;
      const apdex = this.createChildElement(
        'span',
        app.apdex,
        ['card__item__apdex'],
        `${app.name}__apdex`
      );
      const name = this.createChildElement(
        'span',
        app.name,
        ['card__item__name'],
        `${app.name}__name`
      );
      const el = this.createElement('div', null, ['card__item__line'], `${app.name}__line`, [
        apdex,
        name
      ]);

      el.addEventListener('click', $event => {
        if ($event) {
          this.domAdapter.callAlert(`The ${app.name} is on version ${app.version}`);
        }
      });
      return el;
    }
    return null;
  }
}
