import React, { useEffect, useState } from 'react'
import { UKSizes, USSizes, footLengthsCM, footLengthsIN, labelSizes } from '../../data/sizes'

function SizeChart({ product, sizeType, unitType }) {
    const updateTable = () => {
        var tableBody = document.getElementById("table-body"),
            newRow, newCell;
        const tableData = getTableData();

        tableBody.innerHTML = "";

        // Build the new table
        tableData.forEach(function (row) {
            var newRow = document.createElement("tr");
            tableBody.appendChild(newRow);
            row.forEach(function (cell) {
                var newCell = document.createElement("td");
                newCell.textContent = cell;
                console.log({ cell })
                newRow.appendChild(newCell);
            });

        });
    }
    const getTableData = () => {
        const data = []

        for (let i = 0; i < labelSizes.length; i++) {
            const row = [];
            //only add the data if the the us size is currently available for the current product
            if (product.sizes.includes(USSizes[i])) {
                row.push(labelSizes[i])
                if (sizeType == "US")
                    row.push(USSizes[i]);
                else
                    row.push(UKSizes[i]);
                if (unitType == "IN")
                    row.push(footLengthsIN[i])
                else
                    row.push(footLengthsCM[i])
                data.push(row)
            }

        }



        return data;
    }
    useEffect(() => {
        updateTable();


    }, [sizeType, unitType])

    return (
        <table>
            <thead>
                <tr>
                    <th>Label Size(CN)</th>
                    <th>{"Size(" + sizeType + ")"}</th>
                    <th>{"Foot Length(" + unitType + ")"}</th>

                </tr>
            </thead>

            <tbody id='table-body'>

            </tbody>

        </table>
    )
}

export default SizeChart