import { LyricLine } from '../types';

export const parseLRC = (lrcContent: string): LyricLine[] => {
  // Normalize line endings to \n
  const lines = lrcContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  
  // Regex explanation:
  // ^\s*           : Allow optional leading whitespace
  // \[             : Literal '['
  // (\d{1,3})      : Minutes (usually 2 digits, but allow 1-3)
  // :              : Literal ':'
  // (\d{2})        : Seconds (2 digits)
  // (?:            : Non-capturing group for milliseconds
  //   \.           : Literal '.'
  //   (\d{2,3})    : Milliseconds (2 or 3 digits)
  // )?             : Optional milliseconds group
  // \]             : Literal ']'
  // (.*)           : Capture the rest as text
  const regex = /^\s*\[(\d{1,3}):(\d{2})(?:\.(\d{2,3}))?\](.*)$/;
  
  const parsed: LyricLine[] = [];

  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      
      // Handle milliseconds logic
      const msString = match[3];
      let milliseconds = 0;
      let time = minutes * 60 + seconds;

      if (msString) {
        milliseconds = parseInt(msString, 10);
        if (msString.length === 2) {
          // 2 digits usually means centiseconds (1/100s) -> multiply by 10 to get ms
          // But dividing by 100 works for total seconds calc: 50 cs = 0.50s
          time += milliseconds / 100;
        } else {
          // 3 digits is milliseconds -> divide by 1000
          time += milliseconds / 1000;
        }
      }

      const text = match[4].trim();

      // Only add non-empty lines (or lines that might be purely instrumental marked distinctly, but for now skip empty)
      if (text) {
        parsed.push({
          time,
          text,
          // Placeholder for translation
          translation: "" 
        });
      }
    }
  }

  return parsed.sort((a, b) => a.time - b.time);
};