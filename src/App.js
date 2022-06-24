import React , {useState, useEffect }from 'react';
import './App.css';
import Loading from './loading';
import Tours from './tours';

const url = 'https://course-api.com/react-tours-project';

function App() {

  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours)
  }

  const fetchTours = async () => {
    setLoading(false)
    try {
      const response = await fetch(url)
      const tours = await response.json();
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(true)

    }
  
  }

  useEffect ( () => {
    fetchTours()
  }, [])

  if (loading) {
    return <main>
      <Loading/>
    </main>
  }

  if (tours.length === 0){
    return <main>
      <h2>There is no tour</h2>
      <button   className='btn' onClick={() => fetchTours()}>Return to home </button>
    </main>
  }

  return (
    <main className="App">
      <Tours tours = {tours} removeTour={removeTour}/>
    </main>
  );
}

export default App;
