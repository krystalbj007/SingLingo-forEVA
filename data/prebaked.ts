import { LinguisticAnalysis } from "../types";

// Key: Line Text (trimmed) -> Analysis
// This serves as the "Pre-baked" cache for the demo song.
export const PREBAKED_DEMO_ANALYSIS: Record<string, LinguisticAnalysis & { translation: string }> = {
    "I heard you calling on the megaphone": {
        translation: "我听见你拿着扩音器在呼喊",
        links: [
            { fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" },
            { fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }
        ],
        stress: [
            { wordIndex: 1, charIndex: 2 },
            { wordIndex: 3, charIndex: 1 },
            { wordIndex: 6, charIndex: 2 }
        ],
        elisions: [],
        explanation: "'Heard you' often connects as /hɜːrdʒu/."
    },
    "You wanna see me all alone": {
        translation: "你想看我孤身一人",
        links: [
            { fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }
        ],
        stress: [
            { wordIndex: 1, charIndex: 1 },
            { wordIndex: 2, charIndex: 1 },
            { wordIndex: 5, charIndex: 1 }
        ],
        elisions: [],
        explanation: "'Wanna' is a reduction of 'want to'."
    },
    "As legend has it, you are quite the pyro": {
        translation: "传说中，你是个不折不扣的纵火狂",
        links: [
            { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" },
            { fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }
        ],
        stress: [
            { wordIndex: 1, charIndex: 0 },
            { wordIndex: 7, charIndex: 0 }
        ],
        elisions: [],
        explanation: "Pyro /pai-ro/ means someone who loves fire."
    },
    "You light the match to watch it blow": {
        translation: "你点燃火柴，只为看它爆炸",
        links: [
            { fromWordIndex: 5, toWordIndex: 6, type: "consonant-vowel" }
        ],
        stress: [
            { wordIndex: 1, charIndex: 2 },
            { wordIndex: 3, charIndex: 1 },
            { wordIndex: 7, charIndex: 2 }
        ],
        elisions: [],
        explanation: "Notice the plosive sounds in light, match, blow."
    },
    "And if you'd never come for me": {
        translation: "如果你从未为我而来",
        links: [
            { fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" },
            { fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }
        ],
        stress: [
            { wordIndex: 3, charIndex: 0 },
            { wordIndex: 4, charIndex: 1 }
        ],
        elisions: [
            { wordIndex: 0, charIndex: 2 }
        ],
        explanation: "'And' often drops the 'd' sound before a vowel."
    },
    "I might've drowned in the melancholy": {
        translation: "我或许早已沉溺于忧郁之中",
        links: [
            { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" },
        ],
        stress: [
            { wordIndex: 2, charIndex: 2 },
            { wordIndex: 5, charIndex: 0 }
        ],
        elisions: [],
        explanation: "Melancholy: /ˈmɛlənkɒli/"
    },
    "I swore my loyalty to me (Me), myself (Myself), and I (I)": {
        translation: "我曾发誓效忠于我（我），我自己（我自己），和我（我）",
        links: [],
        stress: [
            { wordIndex: 1, charIndex: 2 },
            { wordIndex: 3, charIndex: 0 }
        ],
        elisions: [],
        explanation: "A play on the phrase 'Me, Myself and I'."
    },
    "Right before you lit my sky up": {
        translation: "就在你点亮我的天空之前",
        links: [
            { fromWordIndex: 5, toWordIndex: 6, type: "consonant-vowel" }
        ],
        stress: [
            { wordIndex: 3, charIndex: 1 },
            { wordIndex: 5, charIndex: 2 }
        ],
        elisions: [
             { wordIndex: 1, charIndex: 5 }
        ],
        explanation: "Lit is the past tense of light."
    },
    "All that time": {
        translation: "一直以来",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-consonant" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 2, charIndex: 1 }],
        elisions: [],
        explanation: "Link 'that' and 'time' smoothly."
    },
    "I sat alone in my tower": {
        translation: "我独自坐在塔楼里",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "You were just honing your powers": {
        translation: "你只是在磨练你的力量",
        links: [],
        stress: [{ wordIndex: 3, charIndex: 0 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: "Honing: sharpening or refining."
    },
    "Now I can see it all (See it all)": {
        translation: "现在我看清了一切",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "vowel-vowel" }, { fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 1 }, { wordIndex: 5, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Late one night": {
        translation: "深夜",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-consonant" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 2, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "You dug me out of my grave and": {
        translation: "你将我从坟墓中掘出",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-consonant" }, { fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 6, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Saved my heart from the fate of": {
        translation: "拯救了我的心，免于...",
        links: [{ fromWordIndex: 5, toWordIndex: 6, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 2, charIndex: 2 }, { wordIndex: 5, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Ophelia (Ophеlia)": {
        translation: "奥菲莉亚",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Keep it one hundred on the land (Land), thе sea (Sea), the sky": {
        translation: "无论陆地、海洋还是天空，都保持百分百的真诚",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }, { fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 3, charIndex: 0 }, { wordIndex: 7, charIndex: 1 }, { wordIndex: 11, charIndex: 1 }, { wordIndex: 15, charIndex: 2 }],
        elisions: [],
        explanation: "Keep it 100: slang for being real/truthful."
    },
    "Pledge allegiance to your hands, your team, your vibes": {
        translation: "宣誓效忠于你的双手、团队和氛围",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 1, charIndex: 2 }, { wordIndex: 4, charIndex: 2 }, { wordIndex: 7, charIndex: 1 }, { wordIndex: 10, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Don't care where the hell you've been (Been) 'cause now (Now) you're mine": {
        translation: "不在乎你曾去过何处，因为现在你是我的",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-consonant" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }, { wordIndex: 6, charIndex: 1 }, { wordIndex: 11, charIndex: 1 }, { wordIndex: 14, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "It's 'bout to be the sleepless night you've been dreaming of": {
        translation: "这将是你梦寐以求的不眠之夜",
        links: [{ fromWordIndex: 9, toWordIndex: 10, type: "consonant-vowel" }],
        stress: [{ wordIndex: 5, charIndex: 0 }, { wordIndex: 6, charIndex: 2 }, { wordIndex: 9, charIndex: 0 }],
        elisions: [{ wordIndex: 1, charIndex: 0 }],
        explanation: "'bout is short for about."
    },
    "The fate of Ophelia": {
        translation: "奥菲莉亚的命运",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "The eldest daughter of a nobleman": {
        translation: "贵族的长女",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }, { fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 0 }, { wordIndex: 2, charIndex: 0 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Ophelia lived in fantasy": {
        translation: "奥菲莉亚活在幻想中",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 1, charIndex: 2 }, { wordIndex: 3, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "But love was a cold bed full of scorpions": {
        translation: "但爱是一张爬满蝎子的冰冷之床",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }, { fromWordIndex: 6, toWordIndex: 7, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }, { wordIndex: 5, charIndex: 1 }, { wordIndex: 8, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "The venom stole her sanity": {
        translation: "毒液夺走了她的理智",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-consonant" }],
        stress: [{ wordIndex: 1, charIndex: 0 }, { wordIndex: 2, charIndex: 2 }, { wordIndex: 4, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "I might've lingered in purgatory": {
        translation: "我本可能在炼狱中徘徊",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 0 }, { wordIndex: 4, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "You wrap around me like a chain (A chain), a crown (A crown), a vine (A vine)": {
        translation: "你像锁链、皇冠、藤蔓般缠绕着我",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-consonant" }],
        stress: [{ wordIndex: 1, charIndex: 2 }, { wordIndex: 6, charIndex: 2 }, { wordIndex: 10, charIndex: 2 }, { wordIndex: 14, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Pulling me into the fire": {
        translation: "将我拉入火海",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "vowel-consonant" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "'Tis locked inside my memory": {
        translation: "这被锁在我的记忆深处",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 2 }, { wordIndex: 4, charIndex: 0 }],
        elisions: [],
        explanation: "'Tis = It is."
    },
    "And only you possess the key": {
        translation: "唯有你拥有钥匙",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "consonant-consonant" }],
        stress: [{ wordIndex: 1, charIndex: 0 }, { wordIndex: 3, charIndex: 3 }, { wordIndex: 5, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "No longer drowning and deceived": {
        translation: "不再沉溺，不再受骗",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 0 }, { wordIndex: 2, charIndex: 0 }, { wordIndex: 4, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "All because you came for me": {
        translation: "只因你为我而来",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 2 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Locked inside my memory": {
        translation: "被锁在我的记忆深处",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 3, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Now I can see it all (I can see it all)": {
         translation: "现在我看清了一切",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "vowel-vowel" }, { fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 1 }, { wordIndex: 5, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "You saved my heart from the fate of Ophelia": {
        translation: "你拯救了我的心，免于奥菲莉亚的命运",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-consonant" }, { fromWordIndex: 6, toWordIndex: 7, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 2 }, { wordIndex: 3, charIndex: 2 }, { wordIndex: 6, charIndex: 1 }, { wordIndex: 8, charIndex: 2 }],
        elisions: [],
        explanation: ""
    }
};
