FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt ./agent/requirements.txt

RUN pip install --no-cache-dir -r ./agent/requirements.txt

COPY . .

EXPOSE 8001

CMD ["python3", "agent/agent.py"]