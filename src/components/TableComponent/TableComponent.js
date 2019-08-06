import React, { Component } from "react";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { Icon, Container } from "semantic-ui-react";
import { makeTableData } from "../../redux/selectors";
import { 
  deleteTableData,
  setCurrentURL,
} from "../../redux/actions";


import "react-table/react-table.css";

class TableComponent extends Component {
  removeRow = (id) => {
    this.props.deleteTableData({ id });
  }

  handleClick = (e, urlData) => {
    e.preventDefault();
    const { setCurrentURL } = this.props;
    console.log('data', urlData);

    setCurrentURL(urlData);
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
                const urlData = "https://audiomodelstts.s3.eu-central-1.amazonaws.com/"+tableData[row.index].id+".mp3";
                return (
                  <div style={CenterStyle}>
                    <a href={urlData} onClick={(e) => this.handleClick(e, urlData)}>Download</a>
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
  setCurrentURL,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent); 