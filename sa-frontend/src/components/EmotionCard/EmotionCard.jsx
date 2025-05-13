// src/components/EmotionCard/EmotionCard.jsx
import React, { Component } from 'react';
import './EmotionCard.scss';

// 1. Импортируем иконки
import positiveIcon from '../../assets/emojis/positive.png';
import negativeIcon from '../../assets/emojis/negative.png';
import neutralIcon  from '../../assets/emojis/neutral.png';
import checkingIcon from '../../assets/emojis/checking.png';
import errorIcon    from '../../assets/emojis/error.png';

class EmotionCard extends Component {
  render() {
    const { emotion } = this.props;

    // 2. В конфиге теперь icon, а не emoji
    const config = {
      'Позитив':    { label: 'Позитив',              color: '#4CC9F0',   icon: positiveIcon  },
      'Негатив':    { label: 'Негатив',              color: '#E1247B',   icon: negativeIcon  },
      'Нейтральный':{ label: 'Нейтральный фидбэк',   color: '#7209B7E5', icon: neutralIcon   },
      '':           { label: 'Давайте проверим настроение', color: '#7B3AED', icon: checkingIcon  },
      'Ошибка':     { label: 'Не смогли прочитать ваш текст', color: '#9CA3AF', icon: errorIcon     }
    };

    const { label, color, icon } = config[emotion] || config['Ошибка'];

    return (
      <div className="emotion-card" style={{ backgroundColor: color }}>
        {/* 3. Рендерим картинку */}
        <img src={icon} alt={label} className="emoji-icon" />
        <p>{label}</p>
      </div>
    );
  }
}

export default EmotionCard;
