import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AccountSetting from '../../components/AccountSetting';

const Setting = () => {
    return (
        <div className="layout">
            <div className="content-main">
                <Header />
                <AccountSetting />
            </div>
            <Footer />
        </div>
    );
}

export default Setting;
