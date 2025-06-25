// src/components/EmotionCard/EmotionCard.jsx
import React from 'react';
import './EmotionCard.scss';

import positiveIcon from '../../assets/emojis/positive.png';
import negativeIcon from '../../assets/emojis/negative.png';
import neutralIcon  from '../../assets/emojis/neutral.png';
import checkingIcon from '../../assets/emojis/checking.png';
import errorIcon    from '../../assets/emojis/error.png';

const config = {
  // API-значения (английские)
  positive:    { label: 'Позитив',                color: '#4CC9F0',   icon: positiveIcon  },
  negative:    { label: 'Негатив',               color: '#E1247B',   icon: negativeIcon  },
  neutral:     { label: 'Нейтральный фидбэк',     color: '#7209B7E5', icon: neutralIcon   },

  // Для пустой строки или промежуточного состояния
  '':          { label: 'Давайте проверим настроение', color: '#7B3AED', icon: checkingIcon  },

  // Русскоязычные ключи (если где-то будут)
  Позитив:     { label: 'Позитив',                color: '#4CC9F0',   icon: positiveIcon  },
  Негатив:     { label: 'Негатив',               color: '#E1247B',   icon: negativeIcon  },
  Нейтральный: { label: 'Нейтральный фидбэк',     color: '#7209B7E5', icon: neutralIcon   },
  Ошибка:      { label: 'Не смогли прочитать ваш текст', color: '#9CA3AF', icon: errorIcon     },
};

export default function EmotionCard({ emotion }) {
  // приводим к ключу: если англ., оставляем, если рус., тоже
  const key = emotion || '';
  const { label, color, icon } = config[key] || config['Ошибка'];

  return (
    <div className="emotion-card" style={{ backgroundColor: color }}>
      <img src={icon} alt={label} className="emoji-icon" />
      <p>{label}</p>
    </div>
  );
}
