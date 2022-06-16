// import { Component } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onHandleChange = e => {
    setQuery(e.target.value);
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };
  return (
    <header onSubmit={onHandleSubmit} className={s.Searchbar}>
      <form className={s.SearchForm}>
        <button type="submit" className={s.SearchForm__button}>
          <span className={s.SearchForm__buttonLabel}>Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={onHandleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

// class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleChange = e => {
//     this.setState({ query: e.target.value });
//   };

//   onHandleSubmit = evt => {
//     evt.preventDefault();
//     const formSubmit = this.props.onSubmit;
//     formSubmit(this.state.query);
//   };

//   render() {
//     return (
//       <header onSubmit={this.onHandleSubmit} className={s.Searchbar}>
//         <form className={s.SearchForm}>
//           <button type="submit" className={s.SearchForm__button}>
//             <span className={s.SearchForm__buttonLabel}>Search</span>
//           </button>

//           <input
//             className={s.SearchForm__input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             value={this.state.query}
//             onChange={this.handleChange}
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
