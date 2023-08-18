import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

import "datatables.net";
import "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.css";

import "./style.css";
import { createRoot } from "react-dom/client";

function createNestedTable(rowData: any) {
  // console.log({rowData})
  const html =
    '<table id="' +
    rowData.id.replace(" ", "-") +
    '" class="stripe row-border order-column">';
  return html;
}

function colorizeRequestStatus(cell: Node, cellData: any) {
  if (cellData === "Accepted") {
    (cell as HTMLElement).classList.add("text-success");
  } else if (cellData === "Pending") {
    (cell as HTMLElement).classList.add("text-warning");
  } else if (cellData === "Rejected") {
    (cell as HTMLElement).classList.add("text-danger");
  }
}

const MyRequests = () => {
  const mytableRef = useRef<any>(null);
  const [showNewChild, setShowNewChild] = useState("");
    const navigate = useNavigate();

  const renderViewRequestDetailsButton = (id: string) => {
    return (
      <button
        className="btn btn-primary w-100"
        onClick={() => {
            navigate(`/end-user/view-request-details`, {
              state: {
                requestId: id,
              },
            });
        }}
      >
        View
      </button>
    );
  };
  const renderEditRequestDetailsButton = (id: string) => {
    return (
      <button
        className="btn btn-primary w-100"
        onClick={() => {
            navigate(`/end-user/edit-request-details`, {
              state: {
                requestId:id,
              },
            });
        }}
      >
        Edit
      </button>
    );
  };

  const endUserRequstList = [
    {
      id: "Req-1",
      lastModifiedDate: "12/10/2020",
      activeQRCode: "Yes",
      lastRequestStatus: "Accepted",
      transactions: [
        { trId: "1", date: "10/10/2020", status: "Pending" },
        { trId: "2", date: "11/10/2020", status: "Rejected" },
        { trId: "3", date: "12/10/2020", status: "Accepted" },
      ],
    },
    {
      id: "Req-2",
      lastModifiedDate: "12/10/2020",
      activeQRCode: "No",
      lastRequestStatus: "Rejected",
      transactions: [
        { trId: "1", date: "10/10/2020", status: "Pending" },
        { trId: "2", date: "11/10/2020", status: "Rejected" },
        { trId: "3", date: "12/10/2020", status: "Rejected" },
      ],
    },
    {
      id: "Req-3",
      lastModifiedDate: "12/10/2020",
      activeQRCode: "No",
      lastRequestStatus: "Pending",
      transactions: [
        { trId: "1", date: "10/10/2020", status: "Pending" },
        { trId: "2", date: "11/10/2020", status: "Rejected" },
        { trId: "3", date: "12/10/2020", status: "Pending" },
      ],
    },
  ];

  const columns = [
    { title: "Request ID", data: "id" },
    { title: "Last Modified Date", data: "lastModifiedDate", searchable: true },
    { title: "Active QR Code?", data: "activeQRCode" },
    {
      title: "Last Request Status",
      data: "lastRequestStatus",
      createdCell: colorizeRequestStatus,
    },
  ];

  // useeffct to show nested table (must be before the main useeffect to draw main table)
  useEffect(() => {
    // Add event listener for opening and closing first level childdetails
    const mytable = mytableRef.current;
    $("#my-requests-table tbody").on("click", "td.details-control", (e) => {
      // let tr = $(this).closest("tr");
      const tr = $(e.currentTarget).closest("tr");

      const row = mytable.row(tr);

      const rowData = row.data();

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
        row.child(createNestedTable(rowData)).show();
        const id = rowData.id.replace(" ", "-");
        //   setShowNewChild(id);

        $("#" + id).DataTable({
          dom: "t",
          data: rowData.transactions,
          columns: [
            {
              className: "nested-table-column-1",
              orderable: false,
              data: null,
              defaultContent: "",
              width: "2.25rem",
            },
            { data: "trId", title: "Transaction ID" },
            { data: "date", title: "Transaction Date" },
            {
              data: "status",
              title: "Status",
              createdCell: colorizeRequestStatus,
            },
          ],
          scrollY: "150px",
        });

        tr.addClass("shown");
      }
    });
  }, []);

  // useeffect to draw the main table
  useEffect(() => {
    const mytable = $("#my-requests-table").DataTable({
      dom:
        "<'topwrapper row above-table'<'table-title col-4'><'filer-by-date col-4'><'search col-4'f>>" + //should add a back button to call method to destroy the table
        "<'col-sm-12 mt-5 main-table-content'tr>" +
        "<'row below-table'<'col-sm-4'i><'col-sm-4 text-center'><'col-sm-4'p>>",
      initComplete: function () {
        $(".table-title").html("<h6>My Table Title</h6>"); // add an h6 element to the table-title div
      },
      data: endUserRequstList,
      columns: [
        {
          className: "details-control",
          orderable: false,
          data: null,
          defaultContent: "",
        },

        ...columns,

        {
          orderable: false,
          data: null,
          defaultContent: "",
        },
      ],
      destroy: true,
      autoWidth: true,
      paging: true,
      pageLength: 5,
      searching: true,
      retrieve: true,
      ordering: true,
      order: [],
      lengthChange: true,
      info: true,

      columnDefs: [
        {
          targets: [0],
          orderData: [1],
        },
        {
          targets: [1],
          orderData: [1],
        },
        {
          targets: -1,
          orderable: false,
          createdCell: (td: any, rowData: any) => {
            if (rowData.lastRequestStatus === "Rejected") {
              createRoot(td).render(renderEditRequestDetailsButton(rowData.id));
            } else {
              createRoot(td).render(renderViewRequestDetailsButton(rowData.id));
            }
          },
        },
      ],
    });
    mytableRef.current = mytable;
  }, [endUserRequstList]);

  return (
    // <div className="main">
    //   <div className="container">
    <div className="container mt-5">
      <table
        id="my-requests-table"
        className="stripe row-border order-column"
      ></table>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default MyRequests;
