import React from 'react';
import Header from '../../Components/Shared/Header';
import Footer from '../../Components/Shared/Footer';

const Default = ({children}) => {
    return (
        <>
            <Header/>
            <main className="Content">
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default React.memo(Default);
