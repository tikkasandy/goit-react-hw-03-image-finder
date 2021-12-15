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
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      // this.setState({ status: 'pending' });
      if (prevQuery !== nextQuery) {
        this.reset();
      }

      imagesAPI
        .fetchImages(nextQuery, nextPage)
        .then(images =>
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            status: 'resolved',
          })),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
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
    const { images, showModal, modalImage, status, error } = this.state;
    const { largeImage, alt } = modalImage;
    return (
      <>
        {status === 'idle' && <></>}
        {status === 'rejected' && <strong>{error.message}</strong>}
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
        {status === 'pending' && <CustomLoader />}
        {status === 'resolved' && <Button onClick={this.changePage} />}
      </>
    );
  }
}

export default ImageGallery;
