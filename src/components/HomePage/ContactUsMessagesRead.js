import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const ContactUsMessagesRead = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items to display per page

  useEffect(() => {
    fetch(`http://localhost:5000/contact-messages`)
      .then((res) => res.json())
      .then((info) => setMessages(info.reverse()));
  }, []);

  // Calculate the index of the last item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="container">
      <BackToAdminDashboard></BackToAdminDashboard>
        <div className="custom-ordermenu">
          <div className="header__right container custom-orders">
            <nav id="main-nav" className="main-nav">
              <ul id="menu-primary-menu" className="menu custom-orders-ul">
                <li className="menu-item menu-item-has-children">
                  <Link to="/admin/contact-message-unread/" class="btn circle btn-theme-effect btn-sm mt-5">
                    Unread Contact Messages
                  </Link>
                </li>
                <li className="menu-item menu-item-has-children">
                  <Link to="/admin/contact-message-read/" class="btn circle btn-theme-effect btn-sm mt-5">
                    Read Contact Messages
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>SL No.</th>
              <th>Date</th>
              <th>Sender</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
            {currentMessages.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1 + indexOfFirstItem}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.subject}</td>
                <td>{item.messageStatus}</td>
                <td>
                  <Link
                    to={`/admin/contact-message/${item._id}`}
                    className="title"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <ul>
            <li className="pagination-contact">
              {Array(Math.ceil(messages.length / itemsPerPage))
                .fill()
                .map((_, index) => (
                  <Link
                    key={index}
                    className={index + 1 === currentPage ? "active" : ""}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Link>
                ))}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ContactUsMessagesRead;
