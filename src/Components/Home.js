import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';
import AddedProducts from './AddedProducts';
import DeleteProducts from './DeleteProducts';
import Loading from './Loading';
import Products from './Products';

const Home = () => {
    const [addedProduct, setAddedProduct] = useState(null);
    const [deleteProducts, setDeleteProduct] = useState(null);

    const [user] = useAuthState(auth);
    const { data: products, isLoading, refetch } = useQuery('addedProduct', () => fetch('http://localhost:5000/addedProduct', {

    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div>
                <h1 className='text-3xl font-bold text-secondary flex justify-center items-center'>Get Amazing Softwares with Discounts</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 px-5">
                    {
                        products.map(product => <Products
                            key={product._id}
                            product={product}
                            refetch={refetch}
                            setAddedProduct={setAddedProduct}
                            setDeleteProduct={setDeleteProduct}
                        ></Products>)
                    }

                    {
                        deleteProducts && <DeleteProducts
                            deleteProducts={deleteProducts}
                            refetch={refetch}
                            setDeleteProduct={setDeleteProduct}
                        ></DeleteProducts>
                    }
                </div>

            </div>
        </div>
    );
};

export default Home;