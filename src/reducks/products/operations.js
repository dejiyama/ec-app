import { push } from 'connected-react-router'
import {db,FirebaseTimestamp} from '../../firebase/index'
import { deleteProductAction, fetchProductsAction } from './action'

const productsRef = db.collection('products')

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        productsRef.doc(id).delete()
            .then(() => {
                const prevProducts = getState().products.list;
                const nextProducts = prevProducts.filter(product => product.id !== id)
                dispatch(deleteProductAction(nextProducts))
            })
    }
}

export const fetchProducts = (gender, category, decodeKeyWord) => {
    return async (dispatch) => {
        if(decodeKeyWord !== "") {
            productsRef.get()
                .then(snapshots => {
                    const lists = []
                        snapshots.forEach(snapshot => {
                            const product = snapshot.data()
                            const products = []
                            products.push(product)
                            products.filter(product => {
                                if (product.name.includes(decodeKeyWord)) {
                                    lists.push(product)
                                }
                            })
                        })
                        dispatch(fetchProductsAction(lists))
                });
        } else {
            let query = productsRef.orderBy('updated_at','desc');
            query = (gender !== "") ? query.where('gender', '==', gender): query;
            query = (category !== "") ? query.where('category', '==', category): query;
            query.get()
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
}

export const orderProduct = (productsInCart, amount) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const userRef = db.collection('users').doc(uid)
        const timestamp = FirebaseTimestamp.now()

        let products = {},
            soldOutProducts = [];

        const batch = db.batch()
        for (const product of productsInCart) {
            const snapshot = await productsRef.doc(product.productId).get();
            const sizes = snapshot.data().sizes;

            const updatedSizes = sizes.map(size => {
                if (size.size === product.size) {
                    if (size.quantity === 0) {
                        soldOutProducts.push(product.name)
                        return size
                    }
                    return {
                        size: size.size,
                        quantity: size.quantity - 1
                    }
                } else {
                    return size
                }
            })
            
            products[product.productId] = {
                 id: product.productId,
                 images: product.images,
                 name: product.name,
                 price: product.price,
                 size: product.size
            }

            batch.update(
                productsRef.doc(product.productId),
                {sizes: updatedSizes}

            )

            batch.delete(
                userRef.collection('cart').doc(product.cartId)
            )
        }

        if (soldOutProducts.length > 0) {
            const errorMessage = (soldOutProducts.length > 1) ?
                                  soldOutProducts.join('と') :
                                  soldOutProducts[0]
            alert ('大変申し訳ありません。' + errorMessage + 'が在庫切れとなった為、注文処理を中断しました。')
            return false
        } else {
            batch.commit()
                .then(() => {
                    const orderRef = userRef.collection('orders').doc()
                    const data = timestamp.toDate()
                    const shippingDate = FirebaseTimestamp.fromDate(new Date(data.setDate(data.getDate() + 3)))

                    const history = {
                        amount: amount,
                        created_at: timestamp,
                        id: orderRef.id,
                        products: products,
                        shipping_date: shippingDate,
                        updated_at: timestamp
                    }

                    orderRef.set(history);

                    dispatch(push('/order/complate'))
                }).catch(() => {
                    alert('注文処理に失敗しました。通信環境をご確認に植え、もう一度お試しください。')
                    return false
                    
                })
        }

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