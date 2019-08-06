import React, { Component } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { Icon, Container } from "semantic-ui-react";
import { makeTableData } from "../../redux/selectors";
import { deleteTableData } from "../../redux/actions";
import moment from "moment";

import "react-table/react-table.css";

class TableComponent extends Component {
  removeRow = (id) => {
    this.props.deleteTableData({ id });
  }

  render() {
    const { tableData } = this.props;
    
    return (
      <Container>
        <ReactTable 
          data={tableData}
          style={ReactTableStyle}
          className="-striped -highlight"
          columns={[
            {
              Header: "Date",
              id: "date",
              accessor: "date",
              style: CenterStyle,
            },
            {
              Header: "Duration",
              accessor: "duration",
              style: CenterStyle,
            },
            {
              Header: "Title",
              accessor: "title",
              style: CenterStyle,
            },
            {
              Header: "Download",
              accessor: "download",
              Cell: (row) => {
                return (
                  <div style={CenterStyle}>
                    <a href={"https://audiomodelstts.s3.eu-central-1.amazonaws.com/"+tableData[row.index].id+".mp3"}>Download</a>
                  </div>
                )
              },
              style: {CenterStyle},
            },
            {
              Header: "Delete",
              accessor: "delete",
              expander: true,
              width: 65,
              Expander: (row) => {
                return (
                  <div style={CenterStyle} onClick={() => this.removeRow(tableData[row.index].id)}>
                    <Icon name="trash"/>
                  </div>
                );
              },
            },
          ]}
          defaultPageSize={10}
        />
      </Container>
    );
  }
}

const ReactTableStyle = {
  width: "800px", 
  marginLeft: "10px",
}


const CenterStyle = {
  textAlign: 'center',
}

const mapStateToProps = (state) => ({
  tableData: makeTableData(state),
});

const mapDispatchToProps = {
  deleteTableData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent); 