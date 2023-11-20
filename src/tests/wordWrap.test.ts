function wordWrap(text: string, columnWidth: number) {
    if (text.length > columnWidth) {
        return text.substring(0, columnWidth) + '\n' + text.substring(columnWidth);
    }

    return text;
}
  
describe('The Word Wrap', () => {
    it('makes every single line of text fit column width', () => {
      expect(wordWrap('hello', 5)).toBe('hello');
      expect(wordWrap('longword', 4)).toBe('long\nword');
    });
});