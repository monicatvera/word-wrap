function wordWrap(text: string, columnWidth: number) {
    if (text.length <= columnWidth) {
        return text;
    }
    
    const wrappedText = text.substring(0, columnWidth) + '\n';
    const unwrappedText = text.substring(columnWidth);
    return wrappedText + unwrappedText;
}
  
describe('The Word Wrap', () => {
    it('makes every single line of text fit column width', () => {
      expect(wordWrap('hello', 5)).toBe('hello');
      expect(wordWrap('longword', 4)).toBe('long\nword');
      expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
    });
});