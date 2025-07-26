import { useState, useEffect, useCallback } from "react"
const API = `http://localhost:3333/products?search=`

function App() {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const debounce = (callback, delay) => {
    let timerId;
    return (value) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(value);
      }, delay);
    }
  }

  // async function getProducts(query) {
  //   const res = await fetch(query);
  //   const data = await res.json();
  //   setFilteredProducts(data);
  // }

  const getProducts = useCallback(debounce(query => {
    fetch(query)
      .then(res => res.json())
      .then(data => setFilteredProducts(data))
      .catch(e => console.error(`Errore nel recupero dei dati dal server: \n\n${e}`))
  }, 500), [])

  useEffect(() => {
    if (search.length >= 2) {
      getProducts(`${API}${search}`)
    } else {
      setFilteredProducts([]);
    }
  }, [search])

  return (
    <>
      <div className="container">
        <div className="row py-5">
          <div className="col-12">
            <h1 className="text-center text-uppercase pb-5">Cerca il tuo prodotto</h1>
            <input
              type="text"
              placeholder="Cerca..."
              className="form-control-lg w-100"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search.length >= 2 && filteredProducts.length > 0 &&
              <ul className="list-group results-list">
                {filteredProducts.map(p => (
                  <li key={p.id} className="list-group-item">{p.name}</li>
                ))}
              </ul>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
