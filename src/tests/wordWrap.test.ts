function wordWrap(text: string, columnWidth: number) {
    return undefined;
  }
  
  describe('The Word Wrap', () => {
    it('makes every single line of text fit column width', () => {
      expect(wordWrap('hello', 5)).toBe('hello');
    });
  });