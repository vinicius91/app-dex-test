import './header-subtitle-user.component.css';

import Component from '../../../shared/base.component';

export default class HeaderSubtitleUserComponent extends Component {
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
   * @param {{user: string}} props
   * @returns {HTMLElement}
   * @memberof HeaderComponent
   */
  render(props) {
    if (props !== null) {
      const el = this.createElement('span', props.user, ['user'], 'user-info');
      return el;
    }
    return null;
  }
}
