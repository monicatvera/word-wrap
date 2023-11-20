function wordWrap(text: string, columnWidth: number) {
    if (columnWidth < 0) {
          throw new Error('Negative column width is not allowed');
    }
    
    if (text == null) {
        return '';
    }
    
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
    it('empty text does not need to be wrapped', () => {
        expect(wordWrap('', 5)).toBe('');
        expect(wordWrap(null, 5)).toBe('');
        expect(wordWrap(undefined, 5)).toBe('');
    });

    it('small text does not need to be wrapped', () => {
        expect(wordWrap('hello', 5)).toBe('hello');
    });
      
    it('words are wrapped when do not fit the column width', () => {
        expect(wordWrap('longword', 4)).toBe('long\nword');
        expect(wordWrap('reallylongword', 4)).toBe('real\nlylo\nngwo\nrd');
    });
      
    it('spaces are preferred for wrapping', () => {
        expect(wordWrap('abc def', 4)).toBe('abc\ndef');
        expect(wordWrap('abc def ghi', 4)).toBe('abc\ndef\nghi');
        expect(wordWrap(' abcd', 4)).toBe('\nabcd');
    });
      
    it('does not allow for negative column width', () => {
        expect(() => wordWrap('hello', -5)).toThrow('Negative column width is not allowed');
    });
});