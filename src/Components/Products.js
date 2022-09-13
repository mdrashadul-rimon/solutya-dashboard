import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const Products = ({ product, setAddedProduct, setDeleteProduct, refetch }) => {
    const { productName, description } = product;
    const [user] = useAuthState(auth);

    refetch();

    setAddedProduct(product);

    return (
        <div className="card items-center lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="grid items-center justify-center">
                    <img src="https://placeimg.com/400/225/arch" alt="" className='h-18 rounded-xl' />
                </div>
                <h2 className="text-xl font-bold text-accent">{productName}</h2>

                <div>
                    <small>{description}</small>
                </div>
                <div className='grid'>

                    <label onClick={() => setDeleteProduct(product)} for="delete-modal" className='btn btn-error btn-xs'>Delete</label>
                </div>
            </div>
        </div>
    );
};

export default Products;