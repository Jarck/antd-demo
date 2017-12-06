import React from 'react';
import { Form, Select, Row, Col, Input, Button, Icon } from 'antd';

import FetchData from '../../tools/fetch/FetchData';

const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends React.Component {
  state = {
    expand: false,
    cities: [],
  };

  componentDidMount() {
    FetchData.get('/v1/cities').then(data => {
      this.setState({
        cities: data.cities,
      })
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let params = [];

      Object.keys(values).forEach(key => {
        params.push(`${key}=${values[key]}`)
      });
      params = params.join('&');

      FetchData.get(`v1/companies?${params}`).then(data => {
        this.setState({
          searchParams: params,
        });
        this.props.search(data, params);
      });
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  getFields() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    const child = [];

    child.push(
      <Col span={8} key='name' style={{ display: 'block' }}>
        <FormItem {...formItemLayout} label="公司名称">
          {getFieldDecorator('name', {
            initialValue: '',
          })(
            <Input placeholder="请输入搜索公司名称" />
          )}
        </FormItem>
      </Col>
    );

    child.push(
      <Col span={8} key='city_id' style={{ display: 'block' }}>
        <FormItem {...formItemLayout} label="城市">
          {getFieldDecorator('city_id', {
            initialValue: '',
          })(
            <Select placeholder="请选择城市">
              <Option key='default' value="">请选择城市...</Option>
              {
                this.state.cities.map((city) => {
                  return (<Option key={city.id} value={`${city.id}`}>{city.name}</Option>)
                })
              }
            </Select>
          )}
        </FormItem>
      </Col>
    );

    return child;
  }

  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={ this.handleSearch }
      > 
        <Row gutter={40}>
          { this.getFields() }
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={ this.handleReset }>
              清除
            </Button>
            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              { this.state.expand ? '隐藏' : '展开' } <Icon type={ this.state.expand ? 'up' : 'down' } />
            </a>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WappendSearchForm = Form.create()(SearchForm);
export default WappendSearchForm;
