import React, { Component } from 'react';
import TextInput from '../TextInput/TextInput';
import FileUploader from '../FileUploader/FileUploader';
import EmotionCard from '../EmotionCard/EmotionCard';
import textIcon from '../../assets/icons/text.png';
import fileIcon from '../../assets/icons/file.png';
import { analyzeText, uploadFile } from '../../utils/api';
import './App.scss';


export default class App extends Component {
  state = {
    mode: 'text',       // 'text' или 'file'
    emotion: '',        // '', 'Позитив', 'Нейтральный', 'Негатив', 'Ошибка'
    loading: false
  };

  handleModeChange = (mode) => {
    this.setState({ mode, emotion: '' });
  };

  handleAnalyzeText = async (text) => {
    this.setState({ loading: true, emotion: '' });
    try {
      const res = await analyzeText(text);
      this.setState({ emotion: res.sentiment });
    } catch (e) {
      console.error(e);
      this.setState({ emotion: 'Ошибка' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleAnalyzeFile = async (file) => {
    this.setState({ loading: true, emotion: '' });
    try {
      const res = await uploadFile(file);
      // для file-режима мы сохраняем эмоцию, но рендерим карточку только в text-mode
      const first = Array.isArray(res.results) && res.results[0];
      this.setState({ emotion: first?.sentiment || 'Ошибка' });
    } catch (e) {
      console.error(e);
      this.setState({ emotion: 'Ошибка' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { mode, emotion, loading } = this.state;
    return (
      <div className="app">
        <header className="header">
          <h1>Emotion Analyzer</h1>
          <div className="mode-switch">
            <button
              className={mode === 'text' ? 'active' : ''}
              onClick={() => this.handleModeChange('text')}
            >
              <img src={textIcon} alt="Текст" className="mode-icon" />
              Текст
            </button>
            <button
              className={mode === 'file' ? 'active' : ''}
              onClick={() => this.handleModeChange('file')}
            >
              <img src={fileIcon} alt="Файл" className="mode-icon" />
              Файл
            </button>
          </div>
        </header>

        <main className="main">
          {mode === 'text' && (
            <>
              <TextInput
                onAnalyze={this.handleAnalyzeText}
                loading={loading}
              />
              <EmotionCard emotion={emotion} />
            </>
          )}

          {mode === 'file' && (
            <FileUploader
              onAnalyze={this.handleAnalyzeFile}
              loading={loading}
            />
          )}
        </main>
      </div>
    );
  }
}
