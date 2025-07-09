![image](HeaderGitHubRepo.png)

<div align="center"> 
<font size="6"><b>MNW Benchmark Dataset</b></font>
<br>
</div>



## 📣 Announcements

### V 1.0: We have launched !


## 👋 Welcome to MNW Benchmark Dataset
This repository contains the MNW dataset (*Microsoft-Northwestern-Witness*) and/or associated code for benchmarking AI-detection models across images, video, and audio.

### :warning: Notice
**This dataset is intended for evaluation purposes and cannot be used for training or for commercial purposes.**

### Why do we need a new benchmark?
The detection of AI generated media and deepfake has been an active area of research for almost a decade. But in the past few years, a new paradigm has emerged with the diffusion architecture, showing impressive achievements in audio, image and video generation. Previous approaches to detection are now obsolete and the detection scene must re-invent itself. From only a few methods and models, we moved to a multitude of them pushing the state of the art constantly. With such a dynamic environment, detection models need to generalize better and stay up to date to maintain high performance across the board. 
Historically, evaluation of deepfake models were based on large datasets opened up during ‘detection challenges’. These datasets (see Meta 2020, gov.uk 2024 ) typically had a lot of depth but almost no breadth. They were suitable for the previous era (the GAN era) but are not up to the challenge brought by the new generative AI landscape and the evolving type of harm it brings: scams, non-consensual intimate image generation, disinformation, etc.

### The evaluation of detection tools must reflect the evolution of the generative AI landscape.
What we need is breadth and regular updates
Evaluation sets must be regularly updated and cover as many generators as possible. We argue that depth is less important than breadth and we propose the creation of an evaluation set that contains small samples of as many generators and ‘in the wild’ cases as possible- rather than millions of samples from a few generators.

### ‘In the lab’ and ‘in the wild’: two different beasts
We must recognize that too often, the performance of detectors, ‘in the wild’, does not match their performance ‘in the lab’. Content compression as a result of sharing on social networks and apps, but also manipulations and adversarial attacks makes it harder for models to consistently detect AI-generated media. Far too often, we boast great performance on testing sets, just to fail and real-world examples. Such real-world examples must co-exist in evaluation sets to provide a more realistic picture of the performance of our tools.

## :fountain_pen: Cite us!
We have recently published a [summary paper on MNW](https://arxiv.org/abs/...). Please feel free to cite us!

```
@misc{MNW2025,
      title={{Introducing the MNW benchmark for AI forensics}, 
      author={Thomas Roca and Marco Postiglione and Chongyang Gao and Isabel Gortner and Zuzanna Wojciak and Pengce Wang and Masah Alimardani and Shirin Anlen and Kevin White and Juan Lavista and Sarit Kraus and Sam Gregory and V.S. Subrahmanian},
      year={2025},
      eprint={......},
      archivePrefix={arXiv},
}
```

## 🤝 Existing Collaborators and Contributors

**Founding collaborators:**
- Microsoft AI for Good Lab: https://www.microsoft.com/en-us/research/group/ai-for-good-research-lab/ 
- Northwestern University Mc Cormick School of engineering: https://www.mccormick.northwestern.edu/computer-science/ 
- Witness: https://www.witness.org/ 