import { push } from 'connected-react-router'
import {db,FirebaseTimestamp} from '../../firebase/index'
import { fetchProductsAction } from './action'

const productsRef = db.collection('products')

export const fetchProducts = () => {
    return async (dispatch) => {
        productsRef.orderBy('updated_at','desc').get()
            .then(snapshots => {
                const productList =[]
                snapshots.forEach(snapshot => {
                    const product = snapshot.data()
                    productList.push(product)
                })
                dispatch(fetchProductsAction(productList))
            })
    }
}

export const saveProduct = (id, name, description, category, gender, price, sizes, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            category: category,
            description: description,
            gender: gender,
            name: name,
            images: images,
            price: parseInt(price, 10),
            sizes: sizes,
            updated_at: timestamp
        }
        if (id === "") {
            const ref = productsRef.doc()
        //firebaseが自動で採番してくれたidを取得することができる。
            data.created_at = timestamp;
            id = ref.id;
            data.id = id;
        }
        
        //setメソッドは完全に情報を上書きしてしまうので、marge: trueを利用しよう
        return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}