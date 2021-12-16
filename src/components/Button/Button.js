import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.scss';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  render() {
    const { onClick } = this.props;

    return (
      <button
        className={s.Button}
        type="button"
        onClick={onClick}
        arial-label="Load more"
      >
        Load more
      </button>
    );
  }
}
export default Button;
