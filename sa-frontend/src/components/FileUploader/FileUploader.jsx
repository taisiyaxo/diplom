import React, { Component } from 'react';
import './FileUploader.scss';
import uploadIcon from '../../assets/icons/upload.png';
import fileIcon from '../../assets/icons/file.svg';

export default class FileUploader extends Component {
  state = {
    dragActive: false,
    fileName: '',
    fileContent: '',
    loading: false, // чтение файла
    analyzeState: '', // '' | 'loading' | 'done'
  };

  onDragEnter = (e) => {
    e.preventDefault();
    this.setState({ dragActive: true });
  };
  onDragOver = (e) => {
    e.preventDefault();
  };
  onDragLeave = (e) => {
    e.preventDefault();
    this.setState({ dragActive: false });
  };
  onDrop = (e) => {
    e.preventDefault();
    this.setState({ dragActive: false }, () => {
      const file = e.dataTransfer.files[0];
      this.readFile(file);
    });
  };

  onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    this.readFile(file);
  };

  readFile(file) {
    this.setState({ loading: true, analyzeState: '' });
    const reader = new FileReader();
    reader.onload = (evt) => {
      this.setState({
        fileName: file.name,
        fileContent: evt.target.result,
        loading: false,
      });
    };
    reader.readAsText(file);
  }

  resetFile = () => {
    this.setState({ fileName: '', fileContent: '', analyzeState: '' });
  };

  handleAnalyze = () => {
    this.setState({ analyzeState: 'loading' }, () => {
      Promise.resolve(this.props.onAnalyze(this.state.fileContent)).finally(() =>
        this.setState({ analyzeState: 'done' }),
      );
    });
  };

  handleDownload = () => {
    const blob = new Blob(['Отчёт с данными...'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  render() {
    const { dragActive, fileName, loading, analyzeState } = this.state;
    const zonesWidth = `calc(743.5px * 2 + 37px)`;

    return (
      <div className="file-uploader">
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Подготовьте файл в формате CSV, Excel или TXT с колонкой “review”</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Перетащите или загрузите файл с устройства</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>После обработки данных скачайте отчет</p>
          </div>
        </div>

        <div
          className={`zones ${dragActive ? 'zones--active' : ''}`}
          style={{ width: zonesWidth }}
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}>
          {!dragActive && !fileName && (
            <>
              <div className="zone zone--drag">
                <img src={uploadIcon} alt="Upload" />
                <p>Перетащите</p>
              </div>
              <div className="zone zone--browse">
                <p>Или выберите файл в формате CSV, Excel, TXT</p>
                <label className="browse-button">
                  Выбрать файл
                  <input type="file" accept=".csv,.xlsx,.txt" onChange={this.onFileChange} />
                </label>
              </div>
            </>
          )}

          {dragActive && (
            <div className="zone zone--drag-active">
              <img src={uploadIcon} alt="Upload" />
              <p>Перетащите</p>
            </div>
          )}

          {fileName && !loading && (
            <div className="zone zone--file-info" style={{ width: zonesWidth / 2 }}>
              <div className="filename">
                <img src={fileIcon} alt="Файл" />
                <span>{fileName}</span>
              </div>
              <button onClick={this.resetFile}>✕</button>
            </div>
          )}

          {loading && (
            <div className="zone zone--loading" style={{ width: zonesWidth / 2 }}>
              <div className="spinner" />
              <p>Немного подождите...</p>
            </div>
          )}
        </div>

        {/* ====== Кнопки под областью загрузки ====== */}
        {fileName && !loading && analyzeState === '' && (
          <button className="action-btn analyze-btn" onClick={this.handleAnalyze}>
            Проанализировать
          </button>
        )}
        {analyzeState === 'loading' && (
          <button className="action-btn analyze-btn loading">
            <div className="spinner small" />
            <span>Немного подождите</span>
          </button>
        )}
        {analyzeState === 'done' && (
          <button className="action-btn download-btn" onClick={this.handleDownload}>
            Скачать файл
          </button>
        )}
      </div>
    );
  }
}
