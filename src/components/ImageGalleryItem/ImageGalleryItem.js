import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.scss';

class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    largeImage: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
  };

  render() {
    const { image, alt, openModal, largeImage } = this.props;

    return (
      <li className={s.mageGalleryItem}>
        <img
          className={s.ImageGalleryItem_image}
          src={image}
          alt={alt}
          onClick={() => openModal({ largeImage, alt })}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
