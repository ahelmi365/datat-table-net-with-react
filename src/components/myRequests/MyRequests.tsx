import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "jquery";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.css";
import "./style.css";

const MyRequests = () => {
  const mytableRef = useRef<any>(null);
  const [showNewChild, setShowNewChild] = useState("");
  const rowData = [
    {
      id: "t-1",
      name: "John Doe",
      age: 30,
      city: "New York",
      transactions: [
        { trId: "1", date: "10/10/2020", status: "pending" },
        { trId: "2", date: "11/10/2020", status: "rejected" },
        { trId: "3", date: "12/10/2020", status: "accepted" },
      ],
    },
    {
      id: "t-2",
      name: "Jane Smith",
      age: 25,
      city: "Los Angeles",
      transactions: [
        { trId: "1", date: "10/10/2020", status: "pending" },
        { trId: "2", date: "11/10/2020", status: "rejected" },
        { trId: "3", date: "12/10/2020", status: "accepted" },
      ],
    },
    {
      id: "t-3",
      name: "Bob Johnson",
      age: 40,
      city: "Chicago",
      transactions: [
        { trId: "1", date: "10/10/2020", status: "pending" },
        { trId: "2", date: "11/10/2020", status: "rejected" },
        { trId: "3", date: "12/10/2020", status: "accepted" },
      ],
    },
  ];

  const columns = [
    { title: "ID", data: "id" },
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
    // Add event listener for opening and closing first level childdetails
    const mytable = mytableRef.current;
    $("#my-requests-table tbody").on(
      "click",
      "td.details-control",
      function (e) {
        let tr = $(this).closest("tr");

        let row = mytable.row(tr);

        let rowData = row.data();

        if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass("shown");

          //   Destroy the Child Datatable
          $("#" + rowData.id.replace(" ", "-"))
            .DataTable()
            .destroy();
        } else {
          // Open this row
          row.child(format(rowData)).show();
          var id = rowData.id.replace(" ", "-");
          //   setShowNewChild(id);
          const childTable = $("#" + id);
          console.log({ id });
          console.log({ childTable });

          $("#" + id).DataTable({
            dom: "t",
            data: rowData.transactions,
            columns: [
              { data: "trId", title: "ID" },
              { data: "date", title: "Date" },
              { data: "status", title: "Status" },
            ],
            scrollY: "100px",
          });

          tr.addClass("shown");
        }
      }
    );
  }, [showNewChild]);
  useEffect(() => {
    const mytable = $("#my-requests-table").DataTable({
      data: rowData,
      columns: [
        {
          className: "details-control",
          orderable: false,
          data: null,
          defaultContent: "",
        },

        ...columns,
      ],
      destroy: true,
      paging: true,
      pageLength: 5,
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
    mytableRef.current = mytable;
  }, [rowData]);
  //   function format(rowData: any) {
  //     var html = '<table id="' + rowData.id.replace(" ", "-") + '">';
  //     html += "<thead><tr><th>ID</th><th>Date</th><th>Status</th></tr></thead>";
  //     html +=
  //       "<tbody><tr><td>" +
  //       rowData.transactions.id +
  //       "</td><td>" +
  //       rowData.transactions.date +
  //       "</td><td>" +
  //       rowData.transactions.status +
  //       "</td></tr></tbody>";
  //     html += "</table>";
  //     return html;
  //   }

  function format(rowData: any) {
    // console.log({rowData})
    var html = '<table id="' + rowData.id.replace(" ", "-") + '">';
    // console.log({ html });
    // html += "<thead><tr><th>ID</th><th>Date</th><th>Status</th></tr></thead>";
    // html += "<tbody>";

    // rowData.transactions.forEach((transaction: any) => {
    //   //   console.log({ transaction });
    //   html +=
    //     "<tr><td>" +
    //     transaction.trId +
    //     "</td><td>" +
    //     transaction.date +
    //     "</td><td>" +
    //     transaction.status +
    //     "</td></tr>";
    // });

    // html += "</tbody></table>";
    // console.log({ html });
    return html;
  }

  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <table id="my-requests-table"></table>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
