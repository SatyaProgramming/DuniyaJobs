// CompanyAction.js
import React, { useEffect, useReducer } from 'react';
import styles from './CompanyAction.module.css';
import axios from 'axios';
import { companyReducer, ActionTypes } from './companyReducer';

const initialState = {
  companies: [],
};

const CompanyAction = () => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  // Fetch companies from the backend when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:8082/admins/company');
        dispatch({ type: ActionTypes.SET_COMPANIES, payload: response.data });
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);
  const toggleCompanyStatus = async (companyId, currentStatus) => {
    try {
      console.log('Toggling company status:', companyId, currentStatus);
  
      await axios.put(`http://localhost:8082/admins/status/${companyId}?newStatus=${currentStatus === 'active' ? 'inactive' : 'active'}`);
  
      console.log('Company status toggled successfully');
  
      dispatch({
        type: ActionTypes.TOGGLE_COMPANY_STATUS,
        payload: companyId,
      });
    } catch (error) {
      console.error('Error toggling company status:', error);
    }
  };



  return (
    <div className={styles.companyAction}>
      <table className={styles.table}>
      <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {state.companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.companyName}</td>  {/* Match the field name with your DTO */}
              <td>{company.contactEmail}</td>  {/* Match the field name with your DTO */}
              <td>{company.password}</td>
              <td>{company.status}</td>
              <td>
                <button
                  className={styles.actionBtn}
                  onClick={() => toggleCompanyStatus(company.id, company.status)}
                >
                  {company.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyAction;
