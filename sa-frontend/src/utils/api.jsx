// src/api.js
export const analyzeText = (text) =>
    fetch('/api/sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentence: text })
    }).then(r => r.json());
  
  export const uploadFile = (file) => {
    const form = new FormData();
    form.append('file', file);
    return fetch('/api/reviews', {
      method: 'POST',
      body: form
    }).then(r => r.json());
  };
  