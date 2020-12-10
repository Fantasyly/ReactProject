import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; //引入样式

export default class RichText extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };

  // 获取输入的文本 并转换成html格式 然后当父级组件调用的时候返回去
  getText = () => {
    let { editorState } = this.state;
    let value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return value;
  };

  //   把服务器拿来的html数据显示在编辑器中
  setText(html) {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          //   wrapperClassName="demo-wrapper" 容器样式 demo-wrapper是类名 自己建一个css来写样式
          //   editorClassName="demo-editor"编辑器样式
          //   样式也可以按照如下写法:
          editorStyle={{
            border: "1px solid gray",
            height: "160px",
            paddingLeft: "10px",
            lineHeight: "15px",
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
