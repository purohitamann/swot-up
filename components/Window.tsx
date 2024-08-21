import React from 'react';

const SafariBrowserFrame = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={styles.browserFrame}>
            <div style={styles.browserHeader}>
                <div style={styles.circles}>
                    <div style={{ ...styles.circle, backgroundColor: '#ff605c' }}></div>
                    <div style={{ ...styles.circle, backgroundColor: '#ffbd44' }}></div>
                    <div style={{ ...styles.circle, backgroundColor: '#00ca4e' }}></div>
                </div>
                <div style={styles.browserAddressBar}>
                    <div style={styles.addressBarInput}></div>
                </div>
            </div>
            <div style={styles.browserContent} >
                {children}
            </div>
        </div>
    );
};

const styles = {
    browserFrame: {
        width: '100%',
        height: '100%',
        border: '1px solid #e1e1e1',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
    },
    browserHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 15px',
        backgroundColor: '#f5f5f5',
        borderTopLeftRadius: '12px',
        borderTopRightRadius: '12px',
        borderBottom: '1px solid #e1e1e1',
    },
    circles: {
        display: 'flex',
        gap: '8px',
    },
    circle: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
    },
    browserAddressBar: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    addressBarInput: {
        width: '60%',
        height: '8px',
        backgroundColor: '#e1e1e1',
        borderRadius: '4px',
    },
    browserContent: {
        padding: '20px',
        height: 'calc(100% - 50px)',
        // overflowY: 'auto',
    },
};

export default SafariBrowserFrame;
