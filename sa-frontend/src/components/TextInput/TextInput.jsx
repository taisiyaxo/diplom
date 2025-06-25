import React, { Component } from 'react';
import './TextInput.scss';

class TextInput extends Component {
  state = { text: '' };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleAnalyze = () => {
    this.props.onAnalyze(this.state.text);
  };

  render() {
    const { loading } = this.props;
    return (
      <div className="text-input">
        <textarea
          placeholder="Введите текст..."
          value={this.state.text}
          onChange={this.handleChange}
          disabled={loading}
        />
        <button
          className="analyze-button"
          onClick={this.handleAnalyze}
          disabled={loading}
        >
          {loading ? 'Проверяем...' : 'Проверить'}
        </button>
      </div>
    );
  }
}

export default TextInput;
