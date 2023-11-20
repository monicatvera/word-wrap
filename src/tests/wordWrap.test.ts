function wordWrap(text: string, columnWidth: number) {
    if (text.length <= columnWidth) {
      return text;
    }
    
    const wrapIndex = getWrapIndex(text, columnWidth);
    const unwrapIndex = getUnwrapIndex(text, columnWidth);
    const wrappedText = text.substring(0, wrapIndex).concat('\n');
    const unwrappedText = text.substring(unwrapIndex);
    return wrappedText.concat(wordWrap(unwrappedText, columnWidth));
}
  
function getWrapIndex(text: string, columnWidth: number) {
    const indexOfSpace = text.indexOf(' ');
    const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
    return shallWrapBySpace ? indexOfSpace : columnWidth;
}
  
function getUnwrapIndex(text: string, columnWidth: number) {
    const indexOfSpace = text.indexOf(' ');
    const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth;
    return shallWrapBySpace ? indexOfSpace + 1 : columnWidth;
}
  
describe('The Word Wrap', () => {
    it('makes every single line of text fit column width', () => {
      expect(wordWrap('hello', 5)).toBe('hello');
      expect(wordWrap('longword', 4)).toBe('long\nword');
      expect(wordWrap('longword', 3)).toBe('lon\ngwo\nrd');
      expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
      expect(wordWrap('abc def', 4)).toBe('abc\ndef');
      expect(wordWrap('abc def ghi', 4)).toBe('abc\ndef\nghi');
      expect(wordWrap(' abcd', 4)).toBe('\nabcd');
    });
});