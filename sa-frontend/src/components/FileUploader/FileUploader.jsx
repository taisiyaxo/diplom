import React, { Component } from 'react';
import './FileUploader.scss';
import uploadIcon from '../../assets/icons/upload.png';
import fileIcon from '../../assets/icons/file.svg';

export default class FileUploader extends Component {
  state = {
    dragActive: false,
    file: null,
    analyzed: false
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
      this.setState({ file });
    });
  };

  onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) this.setState({ file });
  };

  handleAnalyze = async () => {
    this.setState({ analyzed: false });
    await this.props.onAnalyze(this.state.file);
    this.setState({ analyzed: true });
  };

  handleDownload = () => {
    // скачиваем report.txt с бэка
    window.location.href = '/api/report';
  };

  render() {
    const { dragActive, file, analyzed } = this.state;
    const { loading } = this.props;
    const zonesWidth = `calc(743.5px * 2 + 37px)`;

    return (
      <div className="file-uploader">
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>
              Подготовьте файл в формате CSV, Excel или TXT с колонкой <strong>“review”</strong>
            </p>
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
          onDrop={this.onDrop}
        >
          {!dragActive && !file && (
            <>
              <div className="zone zone--drag">
                <img src={uploadIcon} alt="Upload" />
                <p>Перетащите</p>
              </div>
              <div className="zone zone--browse">
                <p>
                  <span className="browse-title">Или выберите файл</span>
                  <span className="browse-formats">
                    {' '}
                    в формате CSV, Excel, TXT
                  </span>
                </p>
                <label className="browse-button">
                  Выбрать файл
                  <input
                    type="file"
                    accept=".csv,.xlsx,.txt"
                    onChange={this.onFileChange}
                  />
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

          {file && !dragActive && (
            <div
              className="zone zone--file-info"
              style={{ width: zonesWidth / 2 }}
            >
              <div className="filename">
                <img src={fileIcon} alt="Файл" />
                <span>{file.name}</span>
              </div>
              <button onClick={() => this.setState({ file: null, analyzed: false })}>
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Кнопки */}
        {file && !loading && !analyzed && (
          <button
            className="action-btn analyze-btn"
            onClick={this.handleAnalyze}
          >
            Проанализировать
          </button>
        )}
        {loading && (
          <button className="action-btn analyze-btn loading" disabled>
            <div className="spinner small" />
            <span>Немного подождите</span>
          </button>
        )}
        {analyzed && !loading && (
          <button
            className="action-btn download-btn"
            onClick={this.handleDownload}
          >
            Скачать отчет
          </button>
        )}
      </div>
    );
  }
}
