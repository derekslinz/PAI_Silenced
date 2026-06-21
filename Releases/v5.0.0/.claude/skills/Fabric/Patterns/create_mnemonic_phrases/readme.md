create_mnemonic_phrases

Generate short, memorable sentences that embed Diceware‑style words unchanged and in order. This pattern is ideal for turning a raw Diceware word list into phrases that are easier to recall while preserving the exact secret.

What is Diceware?

Diceware is a passphrase scheme that maps every possible roll of five six‑sided dice(–) to a unique word. Because there are `^= ` combinations, the canonical list contains the same number of entries.

Entropy of the standard ‑word list

```text
words = entropy_per_word = log(words) ≈ .bits
```

A passphrase that strings Nindependently chosen words together therefore carries `N × .bits` of entropy—≈ .bits for six words, ≈ bits for ten, and so on. Four or more words already outclass most human‑made passwords.

Pattern overview

The accompanying `system.md`file instructs Fabric to:

. Echo the supplied words back in bold, separated by commas.
. Generate fivedistinct, short sentences that include the words in the same order and spelling, enabling rapid rote learning or spaced‑repetition drills.

The output is deliberately minimalist—no extra commentary—so you can pipe it straight into other scripts.

Quick start

```bash
 Pick five random words from any Diceware‑compatible list
shuf -n diceware_wordlist.txt | \
   Feed them to Fabric with this pattern
  fabric --pattern create_mnemonic_phrases -s
```

You’ll see the words echoed in bold, followed by five candidate mnemonic sentences ready for memorisation.

