import { Link } from 'react-router-dom'
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { Sidebar } from './Sidebar';
import { toast } from "react-hot-toast";
import React, { useEffect } from 'react'
import { useDeleteProductMutation, useGetAdminProductsQuery } from '../../redux/api/adminApi';

export const ProductsList = () => {
    const { data: products, isLoading } = useGetAdminProductsQuery();
    const [deleteProduct, { isSuccess: isProductDeleted }] = useDeleteProductMutation();

    useEffect(() => {
      if (isProductDeleted) {
        toast.success('Product deleted successfully');
      }
    }, [isProductDeleted]);

    const deleteProductHandler = (id) => {
      deleteProduct(id);
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <MetaData title={'All Products'} />
            <div className="row">
                <div className="col-12 col-md-2 sidebar-no-margin">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Products</h1>

                        <table className="table table-striped table-hover">
                            <thead>
                                <tr className="text-uppercase">
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products && products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2 me-2">
                                                <i className="fa fa-pencil"></i>
                                            </Link>
                                            <button className="btn btn-danger py-1 px-2" onClick={() => deleteProductHandler(product._id)}>
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                </div>
            </div>
        </>
    )
}