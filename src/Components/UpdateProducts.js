import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../firebase.init';

const UpdateProducts = ({ updateProduct, setUpdateProduct, refetch }) => {
    const { _id, productName, description } = updateProduct;
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/addedProduct/${_id}`)
            .then(res => res.json())
            .then(data => setUpdateProduct(data));
    }, [])

    const handleUpdate = event => {
        event.preventDefault();

        const pName = event.target.name.value;
        const pDescription = event.target.description.value;
        const update = { pName, pDescription };

        fetch(`http://localhost:5000/addedProduct/${_id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data dekhte chai', data);

                if (data.modifiedCount) {
                    toast.success(`${productName} is Updated.`)
                    refetch();
                    event.target.reset();
                    setUpdateProduct(null);
                }
            });
    }
    return (
        <div>
            <input type="checkbox" id="update-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label for="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Update: "{productName}" </h3>

                    <form onSubmit={handleUpdate}>
                        <div className='flex flex-col justify-center'>
                            <div className='flex flex-col justify-center items-start'>
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" name='name' className="input input-bordered w-full max-w-xs" />
                            </div>

                            <div className='flex flex-col justify-center'>
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <input type="text" name='description' className="input input-bordered w-full max-w-xs" />
                            </div>
                        </div>
                        <div className="modal-action">
                            <input type="submit" className="btn btn-xs bg-rose-500 hover:bg-red-600 rounded border-0" value="Confirm" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UpdateProducts;