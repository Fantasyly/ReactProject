import React, { Component } from "react";
import { Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../config";
import { reqDeleteImg } from "../../api";

// 将一个图片转成base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, // 图片是否可以预览
    previewImage: "", // 预览的地址 url或者base64
    previewTitle: "", // 预览时的标题
    fileList: [], // 图片列表
  };

  // 提取状态中的图片列表中每个图片的name 便于父级组件的Form使用
  getImgNamesArr = () => {
    let { fileList } = this.state;
    let result = [];
    fileList.forEach(item => {
      result.push(item.name);
    });
    return result;
  };

  // 当点击修改时, 把从服务器拿来的图片数据进行包装,然后存入状态中
  setFileList = imgs => {
    let fileList = [];
    imgs.forEach((item, index) => {
      fileList.push({ name: item, uid: -index, url: `${BASE_URL}/upload/${item}` });
    });
    this.setState({ fileList });
  };

  // 取消预览
  handleCancel = () => this.setState({ previewVisible: false });

  // 打开预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  // 当图片上传中,删除,上传完成等操作时触发的函数
  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      fileList[fileList.length - 1].url = file.response.data.url;
      fileList[fileList.length - 1].name = file.response.data.name;
    }

    if (file.status === "removed") {
      const result = await reqDeleteImg(file.name);
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          method="post"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
