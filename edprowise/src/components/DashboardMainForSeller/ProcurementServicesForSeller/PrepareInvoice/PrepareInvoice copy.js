import React, { useState } from "react";

const PrepareInvoice = () => {
  const [items, setItems] = useState([
    {
      hsnSaac: "",
      qty: "",
      finalRateToBuyer: "",
      edProwiseMargin: "",
      finalRateToEdProwise: "",
      taxableValue: "",
      cgstRate: "",
      cgstAmt: "",
      sgstRate: "",
      sgstAmt: "",
      igstRate: "",
      igstAmt: "",
      amtBeforeGst: "",
      gstAmt: "",
      totalAmount: "",
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        hsnSaac: "",
        qty: "",
        finalRateToBuyer: "",
        edProwiseMargin: "",
        finalRateToEdProwise: "",
        taxableValue: "",
        cgstRate: "",
        cgstAmt: "",
        sgstRate: "",
        sgstAmt: "",
        igstRate: "",
        igstAmt: "",
        amtBeforeGst: "",
        gstAmt: "",
        totalAmount: "",
      },
    ]);
  };

  const calculateTotals = () => {
    const totalTaxableValue = items.reduce(
      (sum, item) => sum + parseFloat(item.taxableValue),
      0
    );
    const totalCgstAmt = items.reduce(
      (sum, item) => sum + parseFloat(item.cgstAmt),
      0
    );
    const totalSgstAmt = items.reduce(
      (sum, item) => sum + parseFloat(item.sgstAmt),
      0
    );
    const totalIgstAmt = items.reduce(
      (sum, item) => sum + parseFloat(item.igstAmt),
      0
    );
    const totalAmtBeforeGst = items.reduce(
      (sum, item) => sum + parseFloat(item.amtBeforeGst),
      0
    );
    const totalGstAmt = items.reduce(
      (sum, item) => sum + parseFloat(item.gstAmt),
      0
    );
    const totalAmount = items.reduce(
      (sum, item) => sum + parseFloat(item.totalAmount),
      0
    );

    setItems(
      items.map((item, index) => {
        if (index === items.length - 1) {
          return {
            ...item,
            taxableValue: totalTaxableValue,
            cgstAmt: totalCgstAmt,
            sgstAmt: totalSgstAmt,
            igstAmt: totalIgstAmt,
            amtBeforeGst: totalAmtBeforeGst,
            gstAmt: totalGstAmt,
            totalAmount: totalAmount,
          };
        }
        return item;
      })
    );
  };
  return (
    <div>
      <h2>GST Invoice</h2>
      <table border="1">
        <thead>
          <tr>
            <th>HSN/SAAC</th>
            <th>Taxable Value</th>
            <th colSpan="2">CGST</th>
            <th colSpan="2">SGST</th>
            <th colSpan="2">IGST</th>
            <th>Total Tax Amount</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th>Rate</th>
            <th>Amt</th>
            <th>Rate</th>
            <th>Amt</th>
            <th>Rate</th>
            <th>Amt</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.hsnSaac}
                  onChange={(e) =>
                    handleInputChange(index, "hsnSaac", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.taxableValue}
                  onChange={(e) =>
                    handleInputChange(index, "taxableValue", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.cgstRate}
                  onChange={(e) =>
                    handleInputChange(index, "cgstRate", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.cgstAmt}
                  onChange={(e) =>
                    handleInputChange(index, "cgstAmt", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.sgstRate}
                  onChange={(e) =>
                    handleInputChange(index, "sgstRate", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.sgstAmt}
                  onChange={(e) =>
                    handleInputChange(index, "sgstAmt", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.igstRate}
                  onChange={(e) =>
                    handleInputChange(index, "igstRate", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.igstAmt}
                  onChange={(e) =>
                    handleInputChange(index, "igstAmt", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.totalAmount}
                  onChange={(e) =>
                    handleInputChange(index, "totalAmount", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="9">Total</td>
            <td>
              <input
                type="number"
                value={items[items.length - 1].totalAmount || 0}
                readOnly
              />
            </td>
          </tr>
        </tfoot>
      </table>
      <button onClick={addRow}>Add Row</button>
      <button onClick={calculateTotals}>Calculate Totals</button>
    </div>
  );
};
export default PrepareInvoice;
