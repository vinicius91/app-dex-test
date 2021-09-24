import './header-title.component.css';

import Component from '../../shared/base.component';

export default class HeaderTitleComponent extends Component {
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
   * @param {{companyName: string}} props
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render(props) {
    if (props !== null) {
      const el = this.createElement('h1', props.companyName, ['title'], 'company-name');
      return el;
    }
    return null;
  }
}
