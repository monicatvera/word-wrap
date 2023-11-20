function wordWrap(text: string, columnWidth: number) {
    if (text.length <= columnWidth) {
        return text;
    }
    
    let wrappedText = text.substring(0, columnWidth) + '\n';
    let unwrappedText = text.substring(columnWidth);
    let acumulatedText = wrappedText;
    
    while (unwrappedText.length > columnWidth) {
        wrappedText = unwrappedText.substring(0, columnWidth) + '\n';
        unwrappedText = unwrappedText.substring(columnWidth);
        acumulatedText += wrappedText;
    }
    
    return acumulatedText + unwrappedText;
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