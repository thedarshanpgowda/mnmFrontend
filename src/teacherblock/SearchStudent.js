import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PDFGenerator = () => {
  const generatePDF = (student) => {
    const doc = new jsPDF();
    let y = 10; // Initial y position for content

    // Add Student Details (excluding unwanted attributes)
    doc.setFontSize(14);
    doc.text("Student Details", 14, y);
    y += 10;
    const filteredDetails = Object.entries(student)
      .filter(([key]) => !['id', 'cie1', 'cie2', 'cie3', 'see'].includes(key))
      .map(([key, value]) => `${key}: ${value}`);
    doc.setFontSize(12);
    doc.text(filteredDetails.join('\n'), 14, y); // Join details with newline

    // Function to generate a table for CIE/See data
    const generateTable = (dataObject, title) => {
      if (!dataObject || !dataObject.length) {
        return; // Skip if data object doesn't exist or is empty
      }
      y += 15;
      doc.setFontSize(14);
      doc.text(title, 14, y);
      y += 10;
      const tableData = dataObject.map(obj => {
        const { studentComment, facultyComment, ...rest } = obj;
        return rest;
      });

      doc.autoTable({
        startY: y,
        body: tableData,
        theme: 'striped', // Add some style to the table
        columns: Object.keys(tableData[0]).map(header => ({ header }))
      });
    };

    // Generate tables for existing CIE/See data
    generateTable(student.cie1, "CIE 1 Details");
    generateTable(student.cie2, "CIE 2 Details");
    generateTable(student.cie3, "CIE 3 Details");
    generateTable(student.see, "See Details");

    doc.save("student_report.pdf");
  };

  const handleGeneratePDF = async () => {
    try {
      const student = await fetchStudentData(); // Fetch student data
      generatePDF(student);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle error
    }
  };

  // Function to fetch student data (replace this with your actual data fetching mechanism)
  const fetchStudentData = async () => {
    // Simulated delay to mimic an asynchronous API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Mock student data (replace this with your actual data)
    return {
      id: 1,
      name: "John Doe",
      // Add other student details here...
      cie1: [{ subject: "Math", marks: 85 }, { subject: "Science", marks: 90 }],
      cie2: [{ subject: "Math", marks: 75 }, { subject: "Science", marks: 80 }],
      cie3: [], // Example of an empty exam
      see: [{ subject: "Math", marks: 70 }, { subject: "Science", marks: 75 }]
      // Add other exam details here...
    };
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <button onClick={handleGeneratePDF}>Generate PDF Report</button>
    </div>
  );
};

export default PDFGenerator;
