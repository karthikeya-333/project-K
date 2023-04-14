import { QrReader } from 'react-qr-reader';
import React, { useState } from 'react';

function Scanner() {

    const [result, setResult] = useState('');

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <>
            <h1>scan</h1>
            <div>
                <QrReader delay={300} onError={handleError} onResult={handleScan} style={{ width: '100%' }} />
                <p>{result}</p>
            </div>
            <p>{result}</p>
        </>
    );
};


export default Scanner;