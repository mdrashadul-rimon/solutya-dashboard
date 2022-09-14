import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';

const Products = ({ product, setAddedProduct, setDeleteProduct, setUpdateProduct, refetch }) => {
    const { productName, description } = product;
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    refetch();

    setAddedProduct(product);

    return (
        <div className="card items-center lg:max-w-lg bg-base-100 shadow-xl px-3">
            <div className="grid grid-cols-1 gap-4">
                <div className="grid items-center justify-center">
                    <img src="https://placeimg.com/400/225/arch" alt="" className='h-18 rounded' />
                </div>
                <h2 className="text-xl font-bold text-accent">{productName}</h2>

                <div className='my-3 mx-2'>
                    <small>{description}</small>
                </div>
                <div className='flex justify-end m-5 gap-3'>

                    {user &&
                        <label onClick={() => setUpdateProduct(product)} for="update-modal" className='btn btn-accent btn-xs'>Update</label>
                    }

                    {admin &&
                        <label onClick={() => setDeleteProduct(product)} for="delete-modal" className='btn btn-error btn-xs'>Delete</label>
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;