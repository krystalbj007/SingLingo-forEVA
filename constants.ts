// 默认演示音频链接 (使用更稳定的测试音频)
export const DEMO_AUDIO_URL = "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"; 

// 默认演示歌词 (Fly Me to the Moon - 练习版)
// 选这首歌是因为它的连读非常多，例如 "Fly me to the moon", "Let me play among"
export const DEMO_LRC = `[00:00.00]Fly me to the moon
[00:03.50]And let me play among the stars
[00:07.00]Let me see what spring is like
[00:11.00]On a-Jupiter and Mars
[00:15.00]In other words, hold my hand
[00:19.00]In other words, baby, kiss me`;

// 初始 Mock 数据 (仅用于 UI 展示参考)
export const MOCK_ANALYSIS_DATA = {
  links: [
    { fromWordIndex: 0, toWordIndex: 1, type: 'consonant-vowel' },
    { fromWordIndex: 3, toWordIndex: 4, type: 'consonant-vowel' }
  ],
  stress: [{ wordIndex: 1, charIndex: 0 }],
  elisions: [{ wordIndex: 2, charIndex: 2 }]
};