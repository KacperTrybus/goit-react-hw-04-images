import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { fetchImages } from './api';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      query: '',
      page: 1,
      isLoading: false,
      showModal: false,
      selectedImage: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { query, images } = this.state;

    try {
      this.setIsLoading(true);
      const currentPage = images.length / 12 + 1;
      const newImages = await fetchImages(query, currentPage);

      const updatedImages = [...images, ...newImages];
      this.setImages(updatedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setIsLoading(false);
    }
  };

  setImages = images => {
    this.setState({ images });
  };

  setPage = page => {
    this.setState({ page });
  };

  setIsLoading = isLoading => {
    this.setState({ isLoading });
  };

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [] }, () => {
      this.fetchData();
    });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchData();
      }
    );
  };

  handleImageClick = imageUrl => {
    this.setState({ selectedImage: imageUrl, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        <Button
          onClick={this.handleLoadMore}
          showButton={images.length > 0 && !isLoading}
        />
        <Loader loading={isLoading} />
        <Modal
          isOpen={showModal}
          imageUrl={selectedImage}
          onClose={this.handleCloseModal}
        />
      </div>
    );
  }
}

export default App;
