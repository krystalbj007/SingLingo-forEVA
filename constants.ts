// 默认演示音频链接 (使用更稳定的测试音频)
export const DEMO_AUDIO_URL = "/music/Taylor Swift - The Fate of Ophelia.mp3"; 

// 默认演示歌词链接
export const DEMO_LRC_URL = "/lyrics/Taylor Swift - The Fate of Ophelia.en.lrc";

// 默认演示歌词 (Taylor Swift - The Fate of Ophelia)
export const DEMO_LRC = `
[00:11.00]I heard you calling on the megaphone
[00:14.70]You wanna see me all alone
[00:20.50]As legend has it, you are quite the pyro
[00:24.40]You light the match to watch it blow
[00:28.50]And if you'd never come for me
[00:32.10]I might've drowned in the melancholy
[00:36.00]I swore my loyalty to me (Me), myself (Myself), and I (I)
[00:40.50]Right before you lit my sky up
[00:46.50]All that time
[00:47.80]I sat alone in my tower
[00:49.60]You were just honing your powers
[00:51.50]Now I can see it all (See it all)
[00:56.20]Late one night
[00:57.50]You dug me out of my grave and
[00:59.30]Saved my heart from the fate of
[01:01.30]Ophelia (Ophеlia)
[01:05.20]Keep it one hundred on the land (Land), thе sea (Sea), the sky
[01:09.30]Pledge allegiance to your hands, your team, your vibes
[01:13.10]Don't care where the hell you've been (Been) 'cause now (Now) you're mine
[01:17.10]It's 'bout to be the sleepless night you've been dreaming of
[01:21.90]The fate of Ophelia
[01:26.40]The eldest daughter of a nobleman
[01:30.20]Ophelia lived in fantasy
[01:35.40]But love was a cold bed full of scorpions
[01:39.80]The venom stole her sanity
[01:44.00]And if you'd never come for me (Come for me)
[01:47.60]I might've lingered in purgatory
[01:51.50]You wrap around me like a chain (A chain), a crown (A crown), a vine (A vine)
[01:56.10]Pulling me into the fire
[02:02.00]All that time
[02:03.30]I sat alone in my tower
[02:05.10]You were just honing your powers
[02:06.90]Now I can see it all (See it all)
[02:11.40]Late one night
[02:12.90]You dug me out of my grave and
[02:14.80]Saved my heart from the fate of
[02:16.70]Ophelia (Ophelia)
[02:20.70]Keep it one hundred on the land (Land), the sea (The sea), the sky
[02:24.90]Pledge allegiance to your hands, your team, your vibes
[02:28.60]Don't care where the hell you've been (Been) 'cause now (Now) you're mine
[02:32.40]It's 'bout to be the sleepless night you've been dreaming of
[02:37.50]The fate of Ophelia
[02:39.70]'Tis locked inside my memory
[02:41.50]And only you possess the key
[02:43.40]No longer drowning and deceived
[02:45.30]All because you came for me
[02:47.20]Locked inside my memory
[02:49.00]And only you possess the key
[02:51.00]No longer drowning and deceived
[02:53.00]All because you came for me
[02:58.20]All that time
[02:59.40]I sat alone in my tower
[03:01.10]You were just honing your powers
[03:03.10]Now I can see it all (I can see it all)
[03:07.20]Late one night
[03:09.00]You dug me out of my grave and
[03:10.90]Saved my heart from the fate of
[03:13.10]Ophelia (Ophelia)
[03:16.90]Keep it one hundred on the land (Land), the sea (The sea), the sky
[03:20.80]Pledge allegiance to your hands (Your hands), your team, your vibes
[03:24.90]Don't care where the hell you've been (You've been) 'cause now ('Cause now) you're mine
[03:28.60]It's 'bout to be the sleepless night you've been dreaming of
[03:33.90]The fate of Ophelia
[03:37.20]You saved my heart from the fate of Ophelia
`;

// 初始 Mock 数据 (仅用于 UI 展示参考)
export const MOCK_ANALYSIS_DATA = {
  links: [
    { fromWordIndex: 0, toWordIndex: 1, type: 'consonant-vowel' },
    { fromWordIndex: 3, toWordIndex: 4, type: 'consonant-vowel' }
  ],
  stress: [{ wordIndex: 1, charIndex: 0 }],
  elisions: [{ wordIndex: 2, charIndex: 2 }]
};