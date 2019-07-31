import React, { Component } from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from "moment";
import { Icon, Container } from "semantic-ui-react";


class TableComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: "1",
          date: "12.23.2910",
          duration: "1.40",
          title: "Hello World",
          download: "",
          delete: ""
        },
        {
          id: "2",
          date: "12.23.2910",
          duration: "1.40",
          title: "Hello World",
          download: "",
          delete: ""
        },
        {
          id: "3",
          date: "12.23.2910",
          duration: "1.40",
          title: "Hello World",
          download: "",
          delete: ""
        },
      ]
    };
  }
  render() {
    const { data } = this.state;

    return (
      <div className="container">
        <ReactTable style={ReactTableStyle}
          data={data}
          columns={[
            {
              Header: "Date",
              id: "date",
              accessor: date => {
                return moment().format("DD.MM.YYYY");
              },
              style: { textAlign: "center" }
            },
            {
              Header: "Duration",
              accessor: "duration",
              style: { textAlign: "center" }
            },
            {
              Header: "Title",
              accessor: "title",
              style: { textAlign: "center" }
            },
            {
              Header: "Download",
              accessor: "download",
              Cell: () => {
                return (
                  <div style={{ textAlign: "center" }}>
                    <a href="https://www.npmjs.com/package/react-table">Download</a>
                  </div>
                )
              },
              style: { textAlign: "center" }
            },
            {
              Header: "Delete",
              accessor: "delete",
              expander: true,
              width: 65,
              Expander: () => {
                return (
                  <div style={{ textAlign: "center" }} onClick={() => this.removeRow(this.state.data.id)}>
                    <Icon name="trash" />
                  </div>
                );
              },
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

const ReactTableStyle = {
  width: "800px", marginLeft: "10px",
}

export default TableComponent; 