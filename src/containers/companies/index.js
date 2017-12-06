import React from 'react';

import SearchForm from '../../components/companies/Search';
import CompaniesList from '../../components/companies/List';
import FetchData from '../../tools/fetch/FetchData';

export default class Company extends React.Component {
  state = {
    searchParams: '',
    companies: [],
    cities: [],
    pagination: {},
    loading: true,
  };

  render() {
    return (
      <div>
        <SearchForm search={ this.handleSearch } />
        <CompaniesList
          companies={ this.state.companies }
          pagination={ this.state.pagination }
          pageChange={ this.pageChange }
          loading={ this.state.loading } />
      </div>
    )
  }

  componentDidMount() {
    FetchData.get(`v1/companies`).then(data => {
      this.setState({
        companies: data.companies,
        pagination: {
          current: data.page.page_no,
          total: data.page.total_count,
          showTotal: (total) => `共 ${total} 条`,
        },
        loading: false,
      })
    })
  }

  pageChange = (currentPage) => {
    FetchData.get(`v1/companies?${this.state.searchParams}&page_no=${currentPage}`).then(data => {
      this.setState({
        companies: data.companies,
        pagination: {
          current: data.page.page_no,
          total: data.page.total_count,
          showTotal: (total) => `共 ${total} 条`,
        },
        loading: false,
      })
    })
  }

  handleSearch = (data, params) => {
    this.setState({
      companies: data.companies,
      pagination: {
        total: data.page.total_count,
        current: 1,
        showTotal: (total) => `共 ${total} 条`,
      },
      loading: false,
    })
  }
}
