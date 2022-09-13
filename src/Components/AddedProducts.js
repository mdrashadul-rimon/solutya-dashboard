import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from './Loading';

const AddedProducts = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { data: addedProduct, isLoading } = useQuery('addedProduct', () => fetch('http://localhost:5000/addedProduct').then(res => res.json()))



    const onSubmit = async data => {
        const addProduct = {
            productName: data.productName,
            description: data.description
        }
        fetch('http://localhost:5000/addedProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addProduct)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success('Product Added Successfully');
                    reset();
                }
                else {
                    toast.error('Failed to add product');
                }
            })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className="text-2xl text-center mx-auto">Add a New Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center'>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("productName", {
                            required: {
                                value: true,
                                message: 'Product name is Required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.productName.message}</span>}
                    </label>
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Product Description</span>
                    </label>
                    <textarea
                        type="text"
                        placeholder="Product Description"
                        className="input input-bordered w-full max-w-xs"
                        {...register("description", {
                            required: {
                                value: true,
                                message: 'Description is required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                    </label>
                </div>

                <input className='btn w-full max-w-xs text-white' type="submit" value="Add Product" />
            </form>
        </div>
    );
};

export default AddedProducts;