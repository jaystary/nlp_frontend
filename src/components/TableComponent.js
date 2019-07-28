import React, { Component } from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";

class TableComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          date: "12.23.2910",
          duration: "1.40",
          title: "Hello World",
          download: "Strat" + <a> </a>
        }
      ]
    };
  }
  render() {
    const { data } = this.state;

    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Date",
              id: "date",
              accessor: date => {
                return moment().format("DD.MM.YYYY");
              }
            },
            {
              Header: "Duration",
              accessor: "duration"
            },
            {
              Header: "Title",
              accessor: "title"
            },
            {
              Header: "Download",
              accessor: "download"
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default TableComponent;
