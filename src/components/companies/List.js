import React from 'react';
import { Table } from 'antd';

const columns = [{
  title: '公司名称',
  dataIndex: 'name',
  width: '20%',
}, {
  title: '简称',
  dataIndex: 'sort_name',
  width: '20%',
}, {
  title: '公司地址',
  dataIndex: 'address',
  width: '20%',
}, {
  title: '联系人',
  dataIndex: 'linkman',
  width: '20%',
}, {
  title: '联系电话',
  dataIndex: 'phone',
  width: '20%',
}];

class CompaniesList extends React.Component {
  handleTableChange = (pagination, filters, sorter) => {
    this.props.pageChange(pagination.current);
  }

  render() {
    return (
      <Table columns={columns}
        rowKey={ record => record.id }
        dataSource={ this.props.companies }
        title={ () => '公司列表' }
        pagination={ this.props.pagination }
        loading={ this.props.loading }
        onChange={ this.handleTableChange } />
    )
  }
}

export default CompaniesList;
