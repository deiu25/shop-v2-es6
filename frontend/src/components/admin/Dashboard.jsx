import { Link } from "react-router-dom";
import {
  useAllOrdersQuery,
  useGetProductsQuery,
  useAllUsersQuery,
} from "../../redux/api/adminApi";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { Sidebar } from "./Sidebar";

export const Dashboard = () => {
  const { data: totalAmount, isLoading } = useAllOrdersQuery();
  const { data: products, isLoading: isProductsLoading } =
    useGetProductsQuery();
  const { data: users, isLoading: isUsersLoading } = useAllUsersQuery();

  //Calculate Total Price
  let totalPrice = 0;
  if (totalAmount && totalAmount.orders) {
    totalPrice = totalAmount.orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
  }

  //Orders Status
  let processingOrders = 0;
  let shippedOrders = 0;
  let deliveredOrders = 0;

  if (totalAmount && totalAmount.orders) {
    processingOrders = totalAmount.orders.filter(
      (order) => order.orderStatus === "Processing"
    ).length;
    shippedOrders = totalAmount.orders.filter(
      (order) => order.orderStatus === "Shipped"
    ).length;
    deliveredOrders = totalAmount.orders.filter(
      (order) => order.orderStatus === "Delivered"
    ).length;
  }

  //Total Reviews
  const { data: productsData } = useGetProductsQuery();
  let totalReviews = 0;

  if (productsData && productsData.products) {
    totalReviews = productsData.products.reduce(
      (sum, product) => sum + product.numOfReviews,
      0
    );

    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        <div className="row">
          <div className="col-12 col-md-2 sidebar-no-margin">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10">
            <h1 className="my-4">Dashboard</h1>

            <>
              <MetaData title={"Admin Dashboard"} />

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Orders
                        <br />
                        <b>
                          {totalAmount && totalAmount.orders
                            ? totalAmount.orders.length
                            : 0}
                        </b>
                        <span className="font-size-20"> Orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Amount
                        <br />
                        <b>${totalPrice}</b>
                        <span className="font-size-20"> $</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Products
                        <br />
                        <b>
                          {products && products.products
                            ? products.products.length
                            : 0}
                        </b>
                        <br />
                        <span className="font-size-20">Products</span>
                        <br />
                        <Link
                          className=" text-white clearfix z-1"
                          to="/admin/products"
                        >
                          <span className="float-left">View Details</span>
                          <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Users
                        <br />
                        <b>{users && users.users ? users.users.length : 0}</b>
                        <br />
                        <span className="font-size-20">Users</span>
                        <br />
                        <Link
                          className=" text-white clearfix z-1"
                          to="/admin/users"
                        >
                          <span className="float-left">View Details</span>
                          <span className="float-right">
                            <i className="fa fa-angle-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Out of Stock Products
                        <br />
                        <b>
                          {products && products.products
                            ? products.products.filter(
                                (product) => product.stock === 0
                              ).length
                            : 0}
                        </b>
                        <br />
                        <span className="font-size-20">Products</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-secondary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Reviews
                        <br />
                        <b>
                          <b>{totalReviews}</b>
                        </b>
                        <br />
                        <span className="font-size-20">Reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Processing Orders
                        <br />
                        <b>{processingOrders}</b>
                        <br />
                        <span className="font-size-20">Orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Shipped Orders
                        <br />
                        <b>{shippedOrders}</b>
                        <br />
                        <span className="font-size-20">Orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Delivered Orders
                        <br />
                        <b>{deliveredOrders}</b>
                        <br />
                        <span className="font-size-20">Orders</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </>
    );
  }
};
