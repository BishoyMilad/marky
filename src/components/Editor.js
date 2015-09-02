import ace from 'brace';
import React, {PropTypes} from 'react';
import 'brace/mode/markdown';
import 'brace/theme/github';
import {noop} from 'lodash';

const Editor = React.createClass({

  propTypes: {
    onChange: PropTypes.func,
    value: PropTypes.string
  },

  getDefaultProps() {
    return {
      onChange: noop,
      value: ''
    };
  },

  componentDidMount: function() {
    this.editor = ace.edit(React.findDOMNode(this));
    this.editor.$blockScrolling = Infinity;
    this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.getSession().setUseWrapMode(true)
    this.editor.setTheme('ace/theme/github');
    this.editor.setFontSize(14);
    this.editor.on('change', this.onChange);
    this.editor.setValue(this.props.value, 1);
    this.editor.setOption('maxLines', 9999);
    this.editor.setOption('minLines', 50);
    this.editor.setOption('highlightActiveLine', true);
    this.editor.setShowPrintMargin(false);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.editor.getValue() !== nextProps.value) {
      this.editor.setValue(nextProps.value, nextProps.cursorStart);
    }
  },

  componentWillUnmount: function() {
    this.editor.destroy();
  },

  onChange() {
    this.props.onChange(this.editor.getValue());
  },

  shouldComponentUpdate (newProps){
    return false;
  },

  render: function() {
    return (
      <div
        onChange={this.onChange}
        style={{height: '100%', width: '100%'}}
      />
    );
  }
});

export default Editor;
