FROM python:3.9-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    libffi-dev \
    libssl-dev \
    libxml2-dev \
    libxslt1-dev \
    libjpeg-dev \
    zlib1g-dev \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip wheel

COPY requirements.txt ./
RUN python3 -m pip install --no-cache-dir -r requirements.txt

RUN python3 - <<EOF
import nltk
nltk.download('stopwords')
EOF

RUN python3 - <<EOF
from deeppavlov import build_model, configs
build_model(configs.classifiers.rusentiment_bert, download=True)
EOF

COPY . .

EXPOSE 5000
CMD ["python3", "app.py"]
