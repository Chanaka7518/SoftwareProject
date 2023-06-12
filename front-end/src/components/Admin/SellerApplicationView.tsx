import React from 'react';
import './Style.css';

const SellerApplicationView: React.FC = () => (
  <div className="seller-application-container">
    <div className="seller-application-content">
      <h1 className="seller-application-heading">Seller Application</h1>
      <table className="seller-application-table">
        <tbody>
          <tr>
            <td className="seller-application-label">First Name:</td>
            <td className="seller-application-value">Zhou Maomao</td>
          </tr>
          <tr>
            <td className="seller-application-label">Last Name:</td>
            <td className="seller-application-value">1810000000</td>
          </tr>
          <tr>
            <td className="seller-application-label">Age:</td>
            <td className="seller-application-value">Hangzhou, Zhejiang</td>
          </tr>
          <tr>
            <td className="seller-application-label">Gender:</td>
            <td className="seller-application-value">empty</td>
          </tr>
          <tr>
            <td className="seller-application-label">Nic Number:</td>
            <td className="seller-application-value">...</td>
          </tr>
          <tr>
            <td className="seller-application-label">Address:</td>
            <td className="seller-application-value">...</td>
          </tr>
          <tr>
            <td className="seller-application-label">Mobile Number:</td>
            <td className="seller-application-value">...</td>
          </tr>
          <tr>
            <td className="seller-application-label">WhatsApp Number:</td>
            <td className="seller-application-value">...</td>
          </tr>
          <tr>
            <td className="seller-application-label">Email:</td>
            <td className="seller-application-value">...</td>
          </tr>
          <tr>
            <td className="seller-application-label">Qualifications:</td>
            <td className="seller-application-value">...</td>
          </tr>
          <tr>
            <td className="seller-application-label">Athletic Achievements:</td>
            <td className="seller-application-value">...</td>
          </tr>
          <tr>
            <td className="seller-application-label">Work Experience:</td>
            <td className="seller-application-value">...</td>
         

        </tr>
      </tbody>
    </table>
  </div>
  </div>
);

export default SellerApplicationView;

