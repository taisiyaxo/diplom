// src/components/App/App.jsx
import React, { Component } from 'react';
import TextInput from '../TextInput/TextInput';
import FileUploader from '../FileUploader/FileUploader';
import EmotionCard from '../EmotionCard/EmotionCard';
import textIcon from '../../assets/icons/text.png';
import fileIcon from '../../assets/icons/file.png';
import './App.scss';

export default class App extends Component {
  state = {
    mode: 'text',     // 'text' или 'file'
    emotion: ''       // '', 'Позитив', 'Нейтральный', 'Негатив', 'Ошибка'
  };

  handleModeChange = (mode) => {
    this.setState({ mode, emotion: '' });
  };

  handleAnalyzeText = (text) => {
    // Здесь вместо заглушки можно вызвать реальный API
    const rnd = Math.floor(Math.random() * 3);
    const map = ['Позитив', 'Нейтральный', 'Негатив'];
    this.setState({ emotion: map[rnd] });
  };

  handleAnalyzeFile = (fileContent) => {
    // для файлов передаём в тот же метод анализа
    this.handleAnalyzeText(fileContent);
  };

  render() {
    const { mode, emotion } = this.state;

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
              <TextInput onAnalyze={this.handleAnalyzeText} />
              {/* Всегда показываем карточку в текстовом режиме */}
              <EmotionCard emotion={emotion} />
            </>
          )}

          {mode === 'file' && (
            <FileUploader onAnalyze={this.handleAnalyzeFile} />
          )}
        </main>
      </div>
    );
  }
}
