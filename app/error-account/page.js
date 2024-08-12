import React from 'react';
import '../styles/error/account.css'; // Import the CSS file directly

const AccountErrorPage = () => {
    return (
        <div className="account-error-page">
            <div className="account-content">
                <h1>Error</h1>
                <h3>Account cannot access</h3>
                <p>This account does not have access to the requested page. Please contact support if you believe this is a mistake.</p>
                <div className="account-buttons">
                    <a href="/contact">Contact Support</a>
                </div>
            </div>
        </div>
    );
};

export default AccountErrorPage;
