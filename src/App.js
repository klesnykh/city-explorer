import React from 'react';
import './App.css';

class App extends React.Component {

// citySubmit = async (event) => {
//   event.preventDefault();
//   let state = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.cityName}&format=json`);
// }


  render() {
    return (
      <>
        <header>
          <h1>'I\'m Alive!!'</h1>
        </header>
        <main></main>
        <footer></footer>
      </>
    );
  }


}

export default App;
