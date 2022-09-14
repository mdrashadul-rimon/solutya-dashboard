import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';
import AddedProducts from './AddedProducts';
import DeleteProducts from './DeleteProducts';
import Loading from './Loading';
import Products from './Products';
import UpdateProducts from './UpdateProducts';

const Home = () => {
    const [addedProduct, setAddedProduct] = useState(null);
    const [deleteProduct, setDeleteProduct] = useState(null);
    const [updateProduct, setUpdateProduct] = useState(null);

    const [user] = useAuthState(auth);
    const { data: products, isLoading, refetch } = useQuery('addedProduct', () => fetch('http://localhost:5000/addedProduct', {

    }).then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <div>
                <h1 className='text-xl lg:text-3xl font-bold text-dark flex justify-center items-center my-5'>Get Amazing Softwares with Discounts</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 px-5">
                    {
                        products.map(product => <Products
                            key={product._id}
                            product={product}
                            refetch={refetch}
                            setAddedProduct={setAddedProduct}
                            setDeleteProduct={setDeleteProduct}
                            setUpdateProduct={setUpdateProduct}
                        ></Products>)
                    }

                    {
                        deleteProduct && <DeleteProducts
                            deleteProduct={deleteProduct}
                            refetch={refetch}
                            setDeleteProduct={setDeleteProduct}
                        ></DeleteProducts>
                    }

                    {
                        updateProduct && <UpdateProducts updateProduct={updateProduct}
                            refetch={refetch}
                            setUpdateProduct={setUpdateProduct}
                        ></UpdateProducts>
                    }
                </div>

            </div>
        </div>
    );
};

export default Home;