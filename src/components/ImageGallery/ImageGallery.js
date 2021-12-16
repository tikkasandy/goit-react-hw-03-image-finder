import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './ImageGallery.module.scss';
import imagesAPI from '../../services/images-api';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import CustomLoader from '../CustomLoader';
import Modal from '../Modal';

class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    page: 1,
    showModal: false,
    modalImage: {},
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.reset();

      if (prevPage > 1) {
        return;
      }
    }

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      imagesAPI
        .fetchImages(nextQuery, nextPage)
        .then(images => {
          if (images.hits.length > 0) {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              status: 'resolved',
            }));
          } else {
            if (nextPage > 1) {
              return Promise.reject(new Error(`Show all images on you query.`));
            } else {
              return Promise.reject(
                new Error(`Images not found. Please enter a correct query.`),
              );
            }
          }
        })
        .catch(error => {
          this.setState({ status: 'rejected' });
          toast.error(error.message);
        });
    }
  }

  handleImgClick = data => {
    this.setState({ modalImage: data });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  changePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  reset = () => {
    this.setState({
      images: [],
      page: 1,
    });
  };

  render() {
    const { images, showModal, modalImage, status } = this.state;
    const { largeImage, alt } = modalImage;
    return (
      <>
        {images.length > 0 && (
          <ul className={s.ImageGallery}>
            {images.map(({ id, largeImageURL, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                image={webformatURL}
                alt={tags}
                largeImage={largeImageURL}
                openModal={this.handleImgClick}
              />
            ))}
          </ul>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImage} alt={alt} />
        )}
        {status === 'resolved' && <Button onClick={this.changePage} />}
        {status === 'pending' && <CustomLoader />}
      </>
    );
  }
}

export default ImageGallery;
