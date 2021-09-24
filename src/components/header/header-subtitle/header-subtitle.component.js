import './header-subtitle.component.css';

import Component from '../../shared/base.component';
import HeaderSubtitleUserComponent from './header-subtitle-user/header-subtitle-user.component';
import GridToggleComponent from './grid-toggle/grid-toggle.component';

export default class HeaderSubtitleComponent extends Component {
  /**
   * Creates an instance of HeaderSubtitleComponent.
   * @param {DomAdapter} dom
   * @param {string | null} [id=null]
   * @memberof HeaderComponent
   */
  constructor(dom, id = null) {
    super(dom, id);
  }

  /**
   * @param {{user: string}} props
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render(props) {
    if (props !== null) {
      const user = new HeaderSubtitleUserComponent(this.domAdapter, this.rootId);
      const toggle = new GridToggleComponent(this.domAdapter, this.rootId);
      const headerSubtitleDom = this.createElement('div', '', ['subtitle'], 'subtitle', [
        user.render(props),
        toggle.render()
      ]);
      return headerSubtitleDom;
    }
    return null;
  }
}
