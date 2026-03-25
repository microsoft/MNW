## 🧠 AI-Generated Audio

As part of the MNW Benchmark, the NSAIL lab at Northwestern University generated **40,000 synthetic audio clips** across **40 audio generation methods** spanning 2017–2025.

Each method produced **250 samples**, synthesized from transcripts in the [VCTK corpus](https://datashare.ed.ac.uk/handle/10283/2651), a benchmark dataset in voice synthesis. When available, official voice identities from each toolkit were used; otherwise, a reference voice was randomly chosen from our curated set of 206 deceased individuals ($DI$). 

### 🎛 Perturbations

Each clean sample was augmented with 3 variants:

1. **Additive Gaussian noise**
2. **Environmental noise** (from [ESC-50](https://github.com/karolpiczak/ESC-50))
3. **Time-stretching** 

These simulate malicious modifications used to evade detection models.

---

### 🆕 March 2026 Update

We have expanded the benchmark with **10,000 additional synthetic audio clips** across **10 new audio generation methods**, bringing the total to **50,000 clips** from **50 methods**. The new batch focuses on recent state-of-the-art TTS systems released in 2025–2026. As with the original data, each new method produced **250 samples** per variant (clean + 3 perturbations), following the same VCTK-based pipeline.

---

### 🎤 Included Audio Generators

| AI Audio Generator                     | Folder Name                           |
| -------------------------------------- | ------------------------------------- |
| Bark                                   | `bark/`                               |
| Capacitron (embedding: 50)             | `capacitron-t2-c50_blizzard2013/`     |
| Capacitron (embedding: 150)            | `capacitron-t2-c150_v2_blizzard2013/` |
| Chat-TTS                               | `chat-tts/`                           |
| Chatterbox-TTS                         | `chatterbox-tts/`                     |
| CosyVoice-v2                           | `cosyvoice/`                          |
| CSM-1B                                 | `csm-1b/`                             |
| Dia                                    | `dia/`                                |
| Diff-HierVC                            | `hiervc/`                             |
| FastPitch                              | `fast_pitch_ljspeech/`                |
| FreeVC                                 | `freevc/`                             |
| GlowTTS                                | `glow-tts_ljspeech/`                  |
| IndexTTS                               | `indextts/`                           |
| Jenny                                  | `jenny_jenny/`                        |
| Kokoro                                 | `kokoro/`                             |
| LLaSa                                  | `llasa/`                              |
| Melo-TTS                               | `melo-tts/`                           |
| MetaVoice                              | `metavoice/`                          |
| Neural HMM                             | `neural_hmm_ljspeech/`                |
| OpenVoice-v2                           | `openvoice-v2/`                       |
| Orpheus-TTS                            | `orpheus-tts/`                        |
| Overflow                               | `overflow_ljspeech/`                  |
| Parler-TTS                             | `parler-tts/`                         |
| SeedVC                                 | `seedvc/`                             |
| SpeedySpeech                           | `speedy-speech_ljspeech/`             |
| SpeechT5-TTS                           | `speecht5-tts/`                       |
| Tacotron (SAM dataset)                 | `tacotron-DDC_sam/`                   |
| Tacotron 2 (EK1)                       | `tacotron2_ek1/`                      |
| Tacotron 2 (LJSpeech + DDC)            | `tacotron2-DDC_ljspeech/`             |
| Tacotron 2 (LJSpeech + DDC + phonemes) | `tacotron2-DDC_ph_ljspeech/`          |
| Tacotron 2 (LJSpeech + DCA)            | `tacotron2-DCA_ljspeech/`             |
| VITS (base model)                      | `vits_ljspeech/`                      |
| VITS (Neon plugin)                     | `vits--neon_ljspeech/`                |
| Vevo                                   | `vevo/`                               |
| WhisperSpeech                          | `whisperspeech/`                      |
| XTTS (v1.1)                            | `xtts_v1.1/`                          |
| XTTS (v2)                              | `xtts_v2/`                            |
| YourTTS                                | `your_tts/`                           |
| Zonos                                  | `zonos/`                              |
| Tortoise-TTS                           | `tortoise-tts/`                       |

#### 🆕 New Methods (March 2026)

| AI Audio Generator                     | Folder Name                           | Model Link |
| -------------------------------------- | ------------------------------------- | ---------- |
| CosyVoice-v3                           | `cosyvoice3/`                         | [FunAudioLLM/Fun-CosyVoice3-0.5B-2512](https://huggingface.co/FunAudioLLM/Fun-CosyVoice3-0.5B-2512) |
| IndexTTS-2                             | `indextts2/`                          | [IndexTeam/IndexTTS-2](https://huggingface.co/IndexTeam/IndexTTS-2) |
| KokoClone                              | `kokoclone/`                          | [PatnaikAshish/kokoclone](https://huggingface.co/PatnaikAshish/kokoclone) |
| LuxTTS                                 | `luxtts/`                             | [YatharthS/LuxTTS](https://huggingface.co/YatharthS/LuxTTS) |
| MOSS-TTS                               | `moss-tts/`                           | [OpenMOSS-Team/MOSS-TTS](https://huggingface.co/OpenMOSS-Team/MOSS-TTS) |
| Qwen3-TTS (12Hz-1.7B-Base)            | `Qwen3-TTS-12Hz-1.7B-Base/`          | [Qwen/Qwen3-TTS-12Hz-1.7B-Base](https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base) |
| TADA (1B)                              | `tada-1b/`                            | [HumeAI/tada-1b](https://huggingface.co/HumeAI/tada-1b) |
| TADA (3B-ML)                           | `tada-3b-ml/`                         | [HumeAI/tada-3b-ml](https://huggingface.co/HumeAI/tada-3b-ml) |
| VibeVoice (1.5B)                       | `vibevoice-1.5b/`                     | [vibevoice/VibeVoice-1.5B](https://huggingface.co/vibevoice/VibeVoice-1.5B) |
| Fish Audio S2 Pro                      | `fish-s2-pro/`                        | [fishaudio/s2-pro](https://huggingface.co/fishaudio/s2-pro) |

---

## :fountain_pen: Cite us!

This dataset cannot be used for commercial purposes.

We have recently published a [summary paper on MNW](https://arxiv.org/abs/...). Please feel free to cite us!

```
@misc{MNW2025,
      title={{Introducing the MNW benchmark for AI forensics}, 
      author={Thomas Roca and Marco Postiglione and Chongyang Gao and Isabel Gortner and Zuzanna Wojciak and Pengce Wang and Mahsa Alimardani and Shirin Anlen and Kevin White and Juan Lavista Ferres and Sarit Kraus and Sam Gregory and V. S. Subrahmanian},
      year={2025},
      eprint={......},
      archivePrefix={arXiv},
}
```