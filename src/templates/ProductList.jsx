import { makeStyles } from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCard } from '../components/Products'
import { fetchProducts } from '../reducks/products/operations'
import { getProducts } from '../reducks/products/selectors'

const useStyles = makeStyles(() => ({
  pagination: {
    backgroundColor: '#282c34',
    marginRight: '0.3em',
    display: 'inline-block',
    alignItems: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
    width: '10%',
    cursor:'pointer'
  }
}))

const ProductList = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const products = getProducts(selector)

    const [controlledProducts, setControlledProducts] = useState([])
    const [currentPage, SetCurrentPage] = useState(1)
    const [todosPerPage, SetTodosPerPage] = useState(3)

    const query = selector.router.location.search
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : ""
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ""
    const keyWord = /^\?product=/.test(query) ? query.split('?product=')[1] : "" 
    const decodeKeyWord = decodeURI(keyWord)

    useEffect(() => {
      const list =[]
      products.length > 0 && (
        products.map(product => (
          list.push(product),
          console.log(list,'list')
        ))
      )
      setControlledProducts(list)
    },[products])

    useEffect(() => {
        dispatch(fetchProducts(gender, category, decodeKeyWord))
    },[query])

    const indexOfLastTodo = currentPage * todosPerPage
    
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    
    const currentTodos = controlledProducts.slice(indexOfFirstTodo, indexOfLastTodo)
    
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(controlledProducts.length/todosPerPage); i++) {
      pageNumbers.push(i)
    }

    console.log(controlledProducts,'product number');
    console.log(pageNumbers,'page number');


    const handleClick = (event) => {
      console.log(event.target.id,'event');
      SetCurrentPage(event.target.id)
      //curretnpageは1

      console.log(currentTodos,'current');
      console.log(indexOfFirstTodo, 'first');
      console.log(indexOfLastTodo, 'last');
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return(
        <li
          className={classes.pagination}
          key={number}
          id={number}
          onClick={(e) => handleClick(e)}
        >
          {number}
        </li>
      )
    })


    return (
        <section className="c-section-wraping">
            <div className="p-grid__row">
                {currentTodos.length > 0 && (
                    currentTodos.map(product => (
                        <ProductCard
                            key={product.id} id={product.id} name={product.name}
                            images={product.images} price={product.price}
                        />
                    ))
                )}
            </div>
            <div className="module-spacer--medium"/>
            <div>
              <ul>
                {renderPageNumbers}
              </ul>
            </div>
        </section>
    )
}
    
export default ProductList;