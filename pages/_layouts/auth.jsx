import React from 'react';

const Auth = ({children}) => {
    return (
        <>
            <main className="Content">
                {children}
            </main>
        </>
    );
};

export default React.memo(Auth);
