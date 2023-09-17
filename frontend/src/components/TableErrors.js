import React from 'react';

const TableErrors = ({ error }) => (
    <div>{error ? error : "Unknown error occurred."}</div>
);

export default TableErrors;
