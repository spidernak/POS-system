// utils/invoiceUtils.js

export const getNextInvoiceNumber = () => {
    const lastInvoiceNumber = localStorage.getItem('lastInvoiceNumber') || '0000';
    const nextInvoiceNumber = (parseInt(lastInvoiceNumber, 10) + 1).toString().padStart(4, '0');
    localStorage.setItem('lastInvoiceNumber', nextInvoiceNumber);
    return nextInvoiceNumber;
  };
  