import React from "react";
import { Table } from "@mantine/core";
import cropData from "../data.json";
import {
  processData,
  getMaxMinProductionPerYear,
  getAverageYieldAndArea,
} from "../data";
import "./cropTable.css";

const CropTable = () => {
  const processedData = processData(cropData);
  const maxMinProductionPerYear = getMaxMinProductionPerYear(processedData);
  const avgYieldAndArea = getAverageYieldAndArea(processedData);

  return (
    <div className="table-container">
      <h1>Crop Production Analytics</h1>
      <h2>Maximum and Minimum Production per Year</h2>
      <Table striped highlightOnHover className="custom-table">
        <Table.Thead className="table-header">
          <Table.Tr>
            <Table.Th style={{ fontSize: "18px" }}>Year</Table.Th>
            <Table.Th style={{ fontSize: "18px" }}>
              Crop with Maximum Production
            </Table.Th>
            <Table.Th style={{ fontSize: "18px" }}>
              Crop with Minimum Production
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.entries(maxMinProductionPerYear).map(
            ([year, { max, min }]) => (
              <Table.Tr className="table-row" key={year}>
                <Table.Td className="table-cell">{year}</Table.Td>
                <Table.Td className="table-cell">{max["Crop Name"]}</Table.Td>
                <Table.Td className="table-cell">{min["Crop Name"]}</Table.Td>
              </Table.Tr>
            )
          )}
        </Table.Tbody>
      </Table>
      <h2>Average Yield and Cultivation Area (1950-2020)</h2>
      <Table striped highlightOnHover className="custom-table">
        <Table.Thead className="table-header">
          <Table.Tr>
            <Table.Th style={{ fontSize: "18px" }}>Crop</Table.Th>
            <Table.Th style={{ fontSize: "18px" }}>
              Average Yield (Kg/Ha)
            </Table.Th>
            <Table.Th style={{ fontSize: "18px" }}>
              Average Cultivation Area (Ha)
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {avgYieldAndArea.map(({ crop, avgYield, avgArea }) => (
            <Table.Tr className="table-row" key={crop}>
              <Table.Td className="table-cell">{crop}</Table.Td>
              <Table.Td className="table-cell">{avgYield}</Table.Td>
              <Table.Td className="table-cell">{avgArea}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default CropTable;
