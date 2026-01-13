#!/usr/bin/env python3
"""
BIP39 12-word seed phrase generator.

Generates a cryptographically secure 12-word mnemonic seed phrase
that can be used as an AGENT_SEED in your .env file.
"""

from mnemonic import Mnemonic


def generate_seed_phrase() -> str:
    """Generate a BIP39 12-word mnemonic seed phrase."""
    mnemo = Mnemonic("english")
    return mnemo.generate(strength=128)  # 128 bits = 12 words


if __name__ == "__main__":
    seed_phrase = generate_seed_phrase()
    print("\n" + "=" * 60)
    print("Generated 12-word seed phrase:")
    print("=" * 60)
    print(seed_phrase)
    print("=" * 60)
    print("\n⚠️  IMPORTANT: Save this seed phrase securely!")
    print("   Copy it to your .env file as AGENT_SEED\n")
