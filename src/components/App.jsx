// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './Searchbar/Searchbar';
import { searchParams, apiService } from '../Services/apiService';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

function Gallery() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [hitsCount, setHitsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [endSearch, setIsEndSearch] = useState(false);

  useEffect(() => {
    console.log('Запустився useEffect');
    setImages([]);
    setPage(1);
    setHitsCount(searchParams.per_page);
    setIsEndSearch(false);
  }, [query]);

  const searchImages = async page => {
    if (query.trim() === '') {
      return toast.error('The input is empty! Enter something interesting!');
    }
    setIsLoading(true);
    try {
      const fetchGallery = await apiService(query, page);
      const request = fetchGallery.hits;
      if (fetchGallery.total === 0) {
        return toast.error(
          `Sorry, there are no images matching your search query: '${query}'`
        );
      } else if (page === 1) {
        setImages([...request]);
        setHitsCount(searchParams.per_page);
        setIsEndSearch(false);
        return toast.success(
          `Hooray! We found ${fetchGallery.totalHits} images.`
        );
      } else if (page > 1) {
        setImages([...images, ...request]);
        setHitsCount(hitsCount + searchParams.per_page);
      }
      if (hitsCount >= fetchGallery.totalHits) {
        toast.info("We're sorry, but you've reached the end of search results");
        setIsEndSearch(true);
      }
    } catch (error) {
      if (images.length >= 500) {
        setIsEndSearch(true);
        return toast.info(
          "We're sorry, but you've reached the end of search results"
        );
      } else return toast.error('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onhandleChange = e => {
    setQuery(e.target.value);
  };

  const onhandleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    setPage(1);
    searchImages(1);
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(page + 1);
    searchImages(page + 1);
    scrollPage();
  };

  const onOpenModal = e => {
    setLargeImageURL(e.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 100,
        behavior: 'smooth',
      });
    }, 1000);
  };

  return (
    <div className="container">
      <Searchbar
        onHandleSubmit={onhandleSubmit}
        onSearchQueryChange={onhandleChange}
        value={query}
      />

      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}

      {isLoading && <Loader />}

      {!isLoading && images.length > 0 && !endSearch && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export const App = () => {
  return Gallery();
};

// class Gallery extends Component {
//   state = {
//     query: '',
//     images: [],
//     largeImageURL: '',
//     page: 1,
//     hitsCount: 0,
//     isLoading: false,
//     showModal: false,
//     endSearch: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.query !== this.state.query) {
//       this.setState({
//         images: [],
//         page: 1,
//         hitsCount: searchParams.per_page,
//         endSearch: false,
//       });
//     }
//   }

//   searchImages = async page => {
//     const { query } = this.state;

//     if (query.trim() === '') {
//       return toast.error('The input is empty! Enter something interesting!');
//     }

//     this.toggleLoader();

//     try {
//       const fetchGallery = await apiService(query, page);
//       const request = fetchGallery.hits;
//       if (fetchGallery.total === 0) {
//         return toast.error(
//           `Sorry, there are no images matching your search query: '${query}'`
//         );
//       } else if (this.state.page === 1) {
//         this.setState({ images: [...request] });
//         this.state.hitsCount = searchParams.per_page;
//         this.state.endSearch = false;
//         return toast.success(
//           `Hooray! We found ${fetchGallery.totalHits} images.`
//         );
//       } else if (this.state.page > 1) {
//         this.setState(({ images, hitsCount }) => ({
//           images: [...images, ...request],
//           hitsCount: hitsCount + searchParams.per_page,
//         }));
//       }
//       if (this.state.hitsCount >= fetchGallery.totalHits) {
//         toast.info("We're sorry, but you've reached the end of search results");
//         this.state.endSearch = true;
//       }
//     } catch (error) {
//       if (this.state.images.length >= 500) {
//         this.state.endSearch = true;
//         return toast.info(
//           "We're sorry, but you've reached the end of search results"
//         );
//       } else return toast.error('Something went wrong. Try again.');
//     } finally {
//       this.toggleLoader();
//     }
//   };

//   handleChange = e => {
//     this.setState({ query: e.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.setState({ page: 1 });
//     this.searchImages(1);
//   };

//   onLoadMore = () => {
//     this.setState({ page: this.state.page + 1 });
//     this.searchImages(this.state.page + 1);
//     this.scrollPage();
//   };

//   onOpenModal = e => {
//     this.setState({ largeImageURL: e.target.dataset.source });
//     this.toggleModal();
//   };

//   toggleLoader = () => {
//     this.setState(({ isLoading }) => ({
//       isLoading: !isLoading,
//     }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   scrollPage = () => {
//     setTimeout(() => {
//       window.scrollBy({
//         top: document.documentElement.clientHeight - 160,
//         behavior: 'smooth',
//       });
//     }, 1000);
//   };

//   render() {
//     const { query, images, largeImageURL, isLoading, showModal, endSearch } =
//       this.state;
//     return (
//       <div className="container">
//         <Searchbar
//           onHandleSubmit={this.handleSubmit}
//           onSearchQueryChange={this.handleChange}
//           value={query}
//         />

//         {images.length > 0 && (
//           <ImageGallery images={images} onOpenModal={this.onOpenModal} />
//         )}

//         {isLoading && <Loader />}

//         {!isLoading && images.length > 0 && !endSearch && (
//           <Button onLoadMore={this.onLoadMore} />
//         )}

//         {showModal && (
//           <Modal
//             onToggleModal={this.toggleModal}
//             largeImageURL={largeImageURL}
//           />
//         )}
//         <ToastContainer autoClose={3000} />
//       </div>
//     );
//   }
// }

// export const App = () => {
//   return <Gallery />;
// };
