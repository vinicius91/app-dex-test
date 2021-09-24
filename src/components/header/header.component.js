import './header.component.css';

import Component from '../shared/base.component';
import HeaderTitleComponent from './header-title/header-title.component';
import HeaderSubtitleComponent from './header-subtitle/header-subtitle.component';

export default class HeaderComponent extends Component {
  /**
   * Creates an instance of HeaderComponent.
   * @param {DomAdapter} dom
   * @param {string | null} [id=null]
   * @memberof HeaderComponent
   */
  constructor(dom, id = null) {
    super(dom, id);
  }

  /**
   * Returns header component
   *
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render() {
    const companyName = 'Apps by Host';
    const user = 'for user averylongemailaddress@companyname.com';
    const title = new HeaderTitleComponent(this.domAdapter, this.id);
    const subtitle = new HeaderSubtitleComponent(this.domAdapter, this.rootId);
    const el = this.createElement('header', null, ['header'], 'header', [
      title.render({ companyName }),
      subtitle.render({ user })
    ]);

    return el;
  }
}
