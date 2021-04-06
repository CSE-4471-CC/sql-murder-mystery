import React from 'react';
import './table.css'

//Andrew Fecher

export default class ResponseTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.props = props;
    }

    render() {
        let sqltable = null;
        if (this.props.results != '') {
            var HTMLrows = [];
            let obj = JSON.parse(this.props.results);
            var header = [];
            let ir = 0;
            Object.keys(obj).forEach(function (rowInt) {
                var rowData = obj[rowInt];
                var HTMLrow = [];
                Object.keys(rowData).forEach(function (colName) {
                    var value = rowData[colName];
                    if (ir == 0) {
                        header.push(<th>{colName}</th>)
                    }
                    HTMLrow.push(<td>{value}</td>);
                });
                HTMLrows.push(<tr>{HTMLrow}</tr>);
                ir += 1;
            });
            sqltable =<table><tr>{header}</tr>{HTMLrows}</table>;
        }
        return (
            <div align='center'className="sqltable">
                {sqltable}
            </div>
        )
    }
}