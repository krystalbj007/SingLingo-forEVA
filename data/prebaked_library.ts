import { LinguisticAnalysis } from "../types";

export const PREBAKED_LIBRARY_ANALYSIS: Record<string, LinguisticAnalysis & { translation: string }> = {
    // --- Beauty and the Beast ---
    "Tale as old as time": {
        translation: "古老的故事",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "True as it can be": {
        translation: "真挚如初",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "vowel-vowel" }, { fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Barely even friends": {
        translation: "甚至算不上朋友",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "vowel-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 2, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Then somebody bends": {
        translation: "直到某人开始改变",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 0 }, { wordIndex: 2, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Unexpectedly": {
        translation: "出乎意料",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Just a little change": {
        translation: "仅仅一点点改变",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Small to say the least": {
        translation: "微不足道",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 4, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Both a little scared": {
        translation: "都有一点害怕",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Neither one prepared": {
        translation: "谁都没有准备好",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 2, charIndex: 3 }],
        elisions: [],
        explanation: ""
    },
    "Beauty and the Beast": {
        translation: "美女与野兽",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "vowel-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Ever just the same": {
        translation: "始终如一",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Ever a surprise": {
        translation: "永远充满惊喜",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 4 }],
        elisions: [],
        explanation: ""
    },
    "Ever as before": {
        translation: "一如既往",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 3 }],
        elisions: [],
        explanation: ""
    },
    "And ever just as sure": {
        translation: "永远那么确信",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }, { fromWordIndex: 3, toWordIndex: 4, type: "consonant-consonant" }],
        stress: [{ wordIndex: 4, charIndex: 1 }],
        elisions: [{ wordIndex: 0, charIndex: 2 }],
        explanation: ""
    },
    "As the sun will rise": {
        translation: "就像太阳照常升起",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Tune as old as song": {
        translation: "旋律古老如歌",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Bittersweet and strange": {
        translation: "苦乐参半，感觉奇妙",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 2, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Finding you can change": {
        translation: "发现自己可以改变",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Learning you were wrong": {
        translation: "意识到自己错了",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Certain as the sun": {
        translation: "像太阳一样确凿",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Rising in the east": {
        translation: "从东方升起",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Song as old as rhyme": {
        translation: "歌谣古老如韵律",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 4, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },

    // --- Remember Me ---
    "Remember me though I have to say goodbye": {
        translation: "请记住我，虽然我要说再见",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-consonant" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 7, charIndex: 4 }],
        elisions: [],
        explanation: ""
    },
    "Remember me, don't let it make you cry": {
        translation: "请记住我，别为此哭泣",
        links: [{ fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 7, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "For even if I'm far away, I hold you in my heart": {
        translation: "即使相隔千里，我也把你放在心底",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }, { fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }],
        stress: [{ wordIndex: 5, charIndex: 0 }, { wordIndex: 11, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "I sing a secret song to you each night we are apart": {
        translation: "在分离的每个夜晚，我为你唱一首秘密的歌",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }, { fromWordIndex: 9, toWordIndex: 10, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Remember me though I have to travel far": {
        translation: "请记住我，虽然我要远行",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 7, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Remember me each time you hear a sad guitar": {
        translation: "每当听到悲伤的吉他声，请记住我",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }, { fromWordIndex: 6, toWordIndex: 7, type: "consonant-vowel" }],
        stress: [{ wordIndex: 8, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Know that I'm with you the only way that I can be": {
        translation: "要知道我正以唯一的方式陪伴着你",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Until you're in my arms again": {
        translation: "直到你再次回到我的怀抱",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }, { fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Remember me": {
        translation: "请记住我",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },

    // --- How Far I'll Go ---
    "I've been staring at the edge of the water": {
        translation: "我一直凝视着水边",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }, { fromWordIndex: 7, toWordIndex: 8, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 2 }, { wordIndex: 5, charIndex: 0 }, { wordIndex: 8, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "'Long as I can remember": {
        translation: "从我记事起",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }],
        stress: [{ wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Never really knowing why": {
        translation: "从未真正明白原因",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 2, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "I wish I could be the perfect daughter": {
        translation: "我希望我能做个完美的女儿",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 5, charIndex: 0 }, { wordIndex: 6, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "But I come back to the water": {
        translation: "但我总是回到水边",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "No matter how hard I try": {
        translation: "无论我多么努力尝试",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 0 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Every turn I take": {
        translation: "每一个转弯",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Every trail I track": {
        translation: "每一条追踪的路径",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Every path I make": {
        translation: "每一条开辟的道路",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Every road leads back": {
        translation: "每一条路都通向归途",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "To the place I know where I cannot go": {
        translation: "通向那个我熟悉却不能去的地方",
        links: [{ fromWordIndex: 4, toWordIndex: 5, type: "vowel-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 2 }, { wordIndex: 8, charIndex: 3 }],
        elisions: [],
        explanation: ""
    },
    "Where I long to be": {
        translation: "那是我渴望之地",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "See the line where the sky meets the sea?": {
        translation: "看见海天相接的那条线了吗？",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 1 }, { wordIndex: 8, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "It calls me": {
        translation: "它在呼唤我",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "And no one knows": {
        translation: "无人知晓",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "vowel-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "How far it goes": {
        translation: "它有多远",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "If the wind in my sail on the sea stays behind me": {
        translation: "如果海风一直助我前行",
        links: [{ fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 1 }, { wordIndex: 8, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "One day I'll know": {
        translation: "终有一天我会知道",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "If I go, there's just no telling how far I'll go": {
        translation: "如果我出发，谁也不知道我能走多远",
        links: [],
        stress: [{ wordIndex: 9, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "I know everybody on this island": {
        translation: "我知道岛上的每个人",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "vowel-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 0 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Seems so happy on this island": {
        translation: "在岛上看起来都很快乐",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "vowel-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Everything is by design": {
        translation: "一切都是安排好的",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 0 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Has a role on this island": {
        translation: "在岛上都有自己的角色",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "vowel-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "So maybe I can roll with mine": {
        translation: "也许我可以扮演好我的角色",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "I can lead with pride": {
        translation: "我可以骄傲地领导",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 2 }, { wordIndex: 4, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "I can make us strong": {
        translation: "我可以让我们强大",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 4, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "I'll be satisfied if I play along": {
        translation: "如果我顺从，我会感到满足",
        links: [{ fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 2 }, { wordIndex: 6, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "But the voice inside sings a different song": {
        translation: "但内心的声音唱着不同的歌",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 6, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "What is wrong with me?": {
        translation: "我到底怎么了？",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "See the light as it shines on the sea?": {
        translation: "看见那照在海上的光了吗？",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "It's blinding": {
        translation: "如此耀眼",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "But no one knows": {
        translation: "但无人知晓",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "How deep it goes": {
        translation: "它有多深",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "And it seems like it's calling out to me": {
        translation: "它似乎在呼唤我",
        links: [{ fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "So come find me": {
        translation: "来寻找我吧",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "And let me know": {
        translation: "让我知道",
        links: [],
        stress: [{ wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "What's beyond that line?": {
        translation: "那条线之后是什么？",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Will I cross that line?": {
        translation: "我会跨过那条线吗？",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "And the line where the sky meets the sea": {
        translation: "海天相接的那条线",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 1 }, { wordIndex: 8, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "How far I'll go": {
        translation: "我能走多远",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },

    // --- Try Everything ---
    "Oh, oh, oh, oh, oh": {
        translation: "哦，哦，哦",
        links: [],
        stress: [],
        elisions: [],
        explanation: ""
    },
    "I messed up tonight, I lost another fight": {
        translation: "今晚我搞砸了，又输了一场仗",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 6, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Lost to myself, but I'll just start again": {
        translation: "输给了自己，但我会重新开始",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "vowel-vowel" }, { fromWordIndex: 6, toWordIndex: 7, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 7, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "I keep falling down, I keep on hitting the ground": {
        translation: "我不断跌倒，不断撞向地面",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-consonant" }, { fromWordIndex: 6, toWordIndex: 7, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 6, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "I always get up now to see what's next": {
        translation: "但我总会站起来，看看接下来会发生什么",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 3, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Birds don't just fly, they fall down and get up": {
        translation: "鸟儿不只是飞翔，它们也会跌落然后重飞",
        links: [{ fromWordIndex: 6, toWordIndex: 7, type: "consonant-vowel" }, { fromWordIndex: 8, toWordIndex: 9, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Nobody learns without gettin' it wrong": {
        translation: "没人能不犯错就学会",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 1, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "I won't give up, no, I won't give in": {
        translation: "我不会放弃，绝不屈服",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }, { fromWordIndex: 8, toWordIndex: 9, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 8, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "'Til I reach the end, and then I'll start again": {
        translation: "直到抵达终点，然后重新开始",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }, { fromWordIndex: 9, toWordIndex: 10, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 1 }, { wordIndex: 10, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "No, I won't leave, I wanna try everything": {
        translation: "不，我不会离开，我想尝试一切",
        links: [],
        stress: [{ wordIndex: 3, charIndex: 2 }, { wordIndex: 7, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "I wanna try even though I could fail": {
        translation: "即使可能失败，我也要尝试",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "vowel-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 7, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Try everything": {
        translation: "尝试一切",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "vowel-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 1, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Look how far you've come, you filled your heart with love": {
        translation: "看你走了多远，心中充满爱",
        links: [],
        stress: [{ wordIndex: 3, charIndex: 1 }, { wordIndex: 7, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Baby, you've done enough, take a deep breath": {
        translation: "宝贝，你已经做得够好了，深呼吸",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 1 }, { wordIndex: 7, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "Don't beat yourself up, no need to run so fast": {
        translation: "别苛责自己，没必要跑得那么快",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 8, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Sometimes we come last, but we did our best": {
        translation: "有时我们最后一名，但我们尽力了",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "I'll keep on making those new mistakes": {
        translation: "我会继续犯那些新的错误",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 0 }, { wordIndex: 6, charIndex: 3 }],
        elisions: [],
        explanation: ""
    },
    "I'll keep on making them every day": {
        translation: "我会每天都犯错",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 0 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Those new mistakes": {
        translation: "那些新的错误",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 2, charIndex: 3 }],
        elisions: [],
        explanation: ""
    },

    // --- Zoo ---
    "Come on, get on up": {
        translation: "来吧，起来吧",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }, { fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 4, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "We're wild and we can't be tamed": {
        translation: "我们要狂野，无法被驯服",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 6, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "And we're turnin' the floor into": {
        translation: "我们要把地板变成",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 4, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "A Zoo-ooh-ooh": {
        translation: "动物园",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Ah-a-a-a-a-ah": {
        translation: "啊~",
        links: [],
        stress: [],
        elisions: [],
        explanation: ""
    },
    "We live in a crazy world": {
        translation: "我们生活在一个疯狂的世界",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Caught up in a rat race": {
        translation: "陷入激烈的竞争",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Concrete jungle life": {
        translation: "钢筋水泥的丛林生活",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Is sometimes a mad place": {
        translation: "有时是个疯狂的地方",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "It's you and me together": {
        translation: "你和我在一起",
        links: [],
        stress: [{ wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "At the end of a wild day": {
        translation: "在疯狂的一天结束时",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 0 }, { wordIndex: 5, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Don't keep it all bottled up": {
        translation: "别把一切都憋在心里",
        links: [{ fromWordIndex: 4, toWordIndex: 5, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "And release your energy": {
        translation: "释放你的能量",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 2 }, { wordIndex: 3, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Hey—ooh—ay": {
        translation: "嘿~哦~",
        links: [],
        stress: [],
        elisions: [],
        explanation: ""
    },
    "Only reason we are here": {
        translation: "我们在这里的唯一原因",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 1, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Is to celebrate": {
        translation: "就是为了庆祝",
        links: [],
        stress: [{ wordIndex: 2, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "In a place where anyone can be anything": {
        translation: "在一个任何人都能成为任何角色的地方",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 4, charIndex: 0 }, { wordIndex: 7, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "Hold onto this moment": {
        translation: "紧紧抓住这一刻",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Don't let it fade away": {
        translation: "别让它消逝",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Baby, keep the music playin'": {
        translation: "宝贝，让音乐继续播放",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Come on keep it up": {
        translation: "来吧，坚持下去",
        links: [{ fromWordIndex: 0, toWordIndex: 1, type: "consonant-vowel" }, { fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 2, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "It's fun if you're down to play": {
        translation: "如果你愿意玩，这会很有趣",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 6, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "We live in a heated time": {
        translation: "我们生活在一个火热的时代",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }, { fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "No chance to cool down": {
        translation: "没有机会冷静下来",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 2 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Continuously confined": {
        translation: "一直被束缚",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 2 }, { wordIndex: 1, charIndex: 3 }],
        elisions: [],
        explanation: ""
    },
    "And what do we do now?": {
        translation: "我们现在该怎么办？",
        links: [],
        stress: [{ wordIndex: 1, charIndex: 2 }, { wordIndex: 5, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "It's all about finding love": {
        translation: "一切都是为了寻找爱",
        links: [{ fromWordIndex: 1, toWordIndex: 2, type: "consonant-vowel" }],
        stress: [{ wordIndex: 3, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Sometimes hard to come by": {
        translation: "有时很难得到",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 2, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "But when it comes to us": {
        translation: "但当轮到我们时",
        links: [{ fromWordIndex: 3, toWordIndex: 4, type: "consonant-vowel" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 5, charIndex: 0 }],
        elisions: [],
        explanation: ""
    },
    "It's always a good time": {
        translation: "总是美好时光",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "consonant-vowel" }],
        stress: [{ wordIndex: 1, charIndex: 1 }, { wordIndex: 3, charIndex: 2 }],
        elisions: [],
        explanation: ""
    },
    "I'll take you higher": {
        translation: "我会带你飞得更高",
        links: [{ fromWordIndex: 2, toWordIndex: 3, type: "vowel-consonant" }],
        stress: [{ wordIndex: 2, charIndex: 1 }, { wordIndex: 3, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Baby, I'll take you higher": {
        translation: "宝贝，我会带你飞得更高",
        links: [],
        stress: [{ wordIndex: 0, charIndex: 1 }, { wordIndex: 4, charIndex: 1 }],
        elisions: [],
        explanation: ""
    },
    "Es una fiesta que sube como la espuma": {
        translation: "这是一场像泡沫一样升腾的派对",
        links: [],
        stress: [],
        elisions: [],
        explanation: "Spanish lyric."
    },
    "Yo por ti ire hasta la luna de ida y vuelta": {
        translation: "为了你，我愿意往返月球",
        links: [],
        stress: [],
        elisions: [],
        explanation: "Spanish lyric."
    }
};
