import './App.css';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import { useEffect, useState } from 'react';
import Modal from './components/Modal/Modal';
import axios from 'axios';

function App() {

  const [ photos, setPhotos ] = useState([]);
  const [ menuActive, setMenuActive ] = useState(false);
  const [ modalActive, setModalActive ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ fetching, setFetching ] = useState(true);
  const [ totalCount, setTotalCount ] = useState(0);
  const items = [
    { value: 'Main', href: '/main', icon: 'home' },
    { value: 'Profile', href: '/profile', icon: 'account_circle' },
    { value: 'About', href: '/about', icon: 'info' },
    { value: 'Contacts', href: '/contacts', icon: 'contact_support' },
  ];

  useEffect(() => {
    if ( fetching ) {
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
        .then(response => {
          setPhotos([ ...photos, ...response.data ]);
          setTotalCount(response.headers['x-total-count']);
          setCurrentPage(prevState => prevState + 1);
        }).finally(() => setFetching(false));
    }
  }, [ fetching ]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if ( e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 ) {
      setFetching(true);
    }
  };

  return (
    <div className="app">
      <nav>
        <div className="burger-btn" onClick={() => setMenuActive( !menuActive)}>
          <span />
        </div>
        <button className="register" onClick={() => setModalActive(true)}>
          Register
        </button>
      </nav>
      <main>
        {photos.map(photo => <div className="photo" key={photo.id}>
          <div className="title">{photo.id}. {photo.title}</div>
          <img src={photo.thumbnailUrl} alt="" />
        </div>)}
      </main>
      <BurgerMenu active={menuActive} setActive={setMenuActive} header={'Burger Menu'} items={items} />
      <Modal active={modalActive} setActive={setModalActive}>
        <form action="">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <button>Register</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
