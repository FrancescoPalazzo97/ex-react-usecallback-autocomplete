import { useState, useEffect, useCallback } from "react"
import ProductDetails from "./components/ProductDetails";
const API_SEARCH = `http://localhost:3333/products?search=`
const API_DETAILS = `http://localhost:3333/products/`

function App() {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [show, setShow] = useState(false);

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

  const getProductDetails = (id) => {
    fetch(`${API_DETAILS}${id}`)
      .then(res => res.json())
      .then(data => setProductDetails(data));
    setShow(false);
  }

  useEffect(() => {
    if (search.length >= 2) {
      getProducts(`${API_SEARCH}${search}`)
      setShow(true);
    } else {
      setFilteredProducts([]);
      setShow(false);
    }
  }, [search])

  return (
    <>
      <div className="container">
        <div className="row py-5">
          <div className="col-12 position-relative">
            <h1 className="text-center text-uppercase pb-5">Cerca il tuo prodotto</h1>
            <input
              type="text"
              placeholder="Cerca..."
              className="form-control-lg w-100"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {show &&
              <ul className="list-group results-list position-absolute z-1">
                {filteredProducts.map(p => (
                  <li
                    key={p.id}
                    className="list-group-item"
                    onClick={() => getProductDetails(p.id)}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            }
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {productDetails &&
              <ProductDetails p={productDetails} />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
