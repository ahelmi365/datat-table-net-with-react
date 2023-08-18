import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.css";

const MyRequests = () => {
 

  const rowData = [
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "Los Angeles" },
    { name: "Bob Johnson", age: 40, city: "Chicago" },
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "Los Angeles" },
    { name: "Bob Johnson", age: 40, city: "Chicago" },
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "Los Angeles" },
    { name: "Bob Johnson", age: 40, city: "Chicago" },
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "Los Angeles" },
    { name: "Bob Johnson", age: 40, city: "Chicago" },
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "Los Angeles" },
    { name: "Bob Johnson", age: 40, city: "Chicago" },
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 25, city: "Los Angeles" },
    { name: "Bob Johnson", age: 40, city: "Chicago" },
  ];

  const columns = [
    { title: "Name", data: "name" },
    { title: "Age", data: "age" },
    { title: "City", data: "city" },
  ];

  const rows = rowData.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.city}</td>
      </tr>
    );
  });
  useEffect(() => {
    $("#my-requests-table").DataTable({
      data: rowData,
      columns:columns,
      destroy: true,
      paging: true,
      searching: true,
      retrieve: true,
      ordering: true,
      order: [],
      lengthChange: true,
      info: true,
      dom:
        "<'topwrapper'>" +
        "<'tran-wrapper'f<'tran-date'><'show_entries'><'#colvis'><'#download'><'#loading1'>>" + //should add a back button to call method to destroy the table
        "<'row scrollme'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-4'i><'col-sm-4 text-center'><'col-sm-4'p>>",
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, "All"],
      ],
      columnDefs: [
        {
          targets: [0],
          orderData: [1],
        },
        {
          targets: [1],
          orderData: [0],
        },
      ],
    });
  }, []);
  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <table id="my-requests-table" ></table>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
