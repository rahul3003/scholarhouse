// components/FileConverter.js

import { useState } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleFileConversion = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;

      if (fileName.endsWith(".xlsx")) {
        // Handle XLSX file
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
      } else if (fileName.endsWith(".csv")) {
        // Handle CSV file
        Papa.parse(data, {
          header: true,
          complete: (result) => {
            setJsonData(result.data);
          },
        });
      }
    };

    if (fileName.endsWith(".xlsx")) {
      reader.readAsBinaryString(file);
    } else if (fileName.endsWith(".csv")) {
      reader.readAsText(file);
    }
  };

  return (
    <div className="container">
      <h1>File Converter</h1>
      <input type="file" onChange={handleFileChange} accept=".xlsx,.csv" />
      <button onClick={handleFileConversion}>Convert to JSON</button>
      {fileName && <p className="mt-2 text-center">{fileName}</p>}
      {jsonData && (
        <div>
          <h2>JSON Output</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileConverter;
