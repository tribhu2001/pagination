import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [products,setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProduct = async()=>{
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);
    const data = await res.json();
    setProducts(data.products);
    setTotalPages(Math.ceil(data.total / 10));
  }

  const pageHandler = (pageNumber) => {
    if(pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
  }

  useEffect(()=>{
    fetchProduct();
  },[page]);

  return (
    <>
    <div className='products'>
      {products.map((prod)=>{
          return(
            <span className='products__single' key={prod.id}>
              <img src={prod.thumbnail}/>
              <span>{prod.title}</span>
            </span>
          )
      })}
    </div>
    <div className='pagination'>
        <span onClick={()=>pageHandler(page-1)}>◀</span>
        {[...Array(totalPages)].map((_, index) => (
          <span key={index} onClick={()=>pageHandler(index+1)} className={index+1 === page ? 'active' : ''}>
            {index+1}
          </span>)
        )}
        <span onClick={()=>pageHandler(page+1)}>▶</span>
    </div>
  </>
  );
}

export default App;
