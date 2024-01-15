import React from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const OrderMenu = () => {
  return (
    <div className="custom-ordermenu mb-15">
      <BackToAdminDashboard></BackToAdminDashboard>
      <div className="header__right container custom-orders">
        <nav id="main-nav" className="main-nav">
          <ul id="menu-primary-menu" className="menu custom-orders-ul">
            <li className="menu-item menu-item-has-children">
              <Link
                to="/admin/orders/"
                class="btn circle btn-theme-effect btn-sm mt-5"
              >
                Total Orders
              </Link>
            </li>
            <li className="menu-item menu-item-has-children">
              <Link
                to="/admin/orders-pending"
                class="btn circle btn-theme-effect btn-sm mt-5"
              >
                Pending Orders
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/orders/accepted"
                class="btn circle btn-theme-effect btn-sm mt-5 "
              >
                Accepted Orders
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/orders/cancelled"
                class="btn circle btn-theme-effect btn-sm mt-5 "
              >
                Cancelled orders
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/orders/delivered"
                class="btn circle btn-theme-effect btn-sm mt-5 "
              >
                Delivered orders
              </Link>
            </li>

            <li className="menu-item menu-item-has-children">
              <Link
                to="/admin/payments/pending"
                class="btn circle btn-theme-effect btn-sm mt-5 "
              >
                Pending Payments
              </Link>
            </li>

            <li className="menu-item">
              <Link
                to="/admin/payments/received"
                class="btn circle btn-theme-effect btn-sm mt-5 "
              >
                Recived Payments
              </Link>
            </li>

            <li className="menu-item">
              <Link
                to="/admin/payments/cancelled"
                class="btn circle btn-theme-effect btn-sm mt-5 "
              >
                Cancelled Payments
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/admin/payments/refunded"
                class="btn circle btn-theme-effect btn-sm mt-5 "
              >
                Refunded Payments
              </Link>
            </li>
          </ul>
        </nav>
      </div>





      
    </div>
  );
};

export default OrderMenu;
