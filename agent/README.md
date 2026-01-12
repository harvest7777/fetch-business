# Agent Setup

This directory contains a Fetch.ai uAgent that uses the chat protocol.

## Setup Instructions

### 1. Create a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Generate a seed phrase

Run the seed phrase generator:

```bash
python generate_seed.py
```

This will output a 12-word BIP39 mnemonic seed phrase. **Save this securely!**

### 4. Configure your environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and:

- Replace `AGENT_SEED` with the seed phrase you generated
- Set `AGENT_NAME` to your own agent name
- Set `AGENT_PORT` to the port you want the agent to run on (default: 8001)

Example `.env`:

```env
AGENT_NAME=my-coffee-shop-agent
AGENT_SEED=word1 word2 word3 word4 word5 word6 word7 word8 word9 word10 word11 word12
AGENT_PORT=8001
```

**Note:** Make sure the port you choose is not already in use by another application.

### 5. Run the agent

```bash
python agent.py
```

The agent will start and be ready to receive chat messages using the Fetch.ai uAgents chat protocol.
