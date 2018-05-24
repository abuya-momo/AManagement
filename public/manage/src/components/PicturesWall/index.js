import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './index.less';
import {
  Upload,
  Icon,
  Modal
} from 'antd';

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
    //   {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }
  ],
  };

  componentDidMount () {

  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('handlePreview');
    console.log(file);
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    console.log('handleChange');
    console.log(fileList);
    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/upload_pic"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          name="pic"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
