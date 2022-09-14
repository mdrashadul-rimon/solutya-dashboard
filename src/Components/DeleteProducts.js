import React from 'react';
import { toast } from 'react-toastify';


const DeleteProducts = ({ deleteProduct, setDeleteProduct, refetch }) => {
    const { _id, productName } = deleteProduct;
    

    const handleDelete = () => {
        fetch(`http://localhost:5000/addedProduct/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.warning(`${productName} is deleted.`)
                    setDeleteProduct(null);
                    refetch();
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label for="delete-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Are you sure you want to delete {productName} ?</h3>
                    <div className="modal-action">
                        <button onClick={() => handleDelete()} className="btn btn-xs bg-rose-500 hover:bg-red-600 rounded border-0">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProducts;