export const pageStyles = `
  @page {
    size: 210mm 297mm;
  }
  
  @media all {
    .pagebreak {
      display: none;
    }
  }
  
  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;
