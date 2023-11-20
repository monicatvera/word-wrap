function wordWrap(text: string, columnWidth: number) {
    return wordWrapNoPrimitives(WrappableText.create(text), ColumnWidth.create(columnWidth));
}
  
class ColumnWidth {
    private constructor(private readonly width: number) {
    }
  
    static create(width: number) {
      if (width < 0) {
        throw new Error('Negative column width is not allowed');
      }
      return new ColumnWidth(width);
    }
  
    value() {
      return this.width;
    }
}
  
class WrappableText {
    private constructor(private readonly text: string) { }
  
    static create(text: string) {
      if (text == null) {
        return new WrappableText('');
      }
      return new WrappableText(text);
    }
  
    fitsIn(columnWidth: ColumnWidth) {
      return this.value().length <= columnWidth.value();
    }
  
    wrapIndex(columnWidth: ColumnWidth) {
      const indexOfSpace = this.value().indexOf(' ');
      const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth.value();
      return shallWrapBySpace ? indexOfSpace : columnWidth.value();
    }
  
    unwrapIndex(columnWidth: ColumnWidth) {
      const indexOfSpace = this.value().indexOf(' ');
      const shallWrapBySpace = indexOfSpace > -1 && indexOfSpace < columnWidth.value();
      return shallWrapBySpace ? indexOfSpace + 1 : columnWidth.value();
    }
  
    value() {
      return this.text;
    }
}
  
function wordWrapNoPrimitives(text: WrappableText, columnWidth: ColumnWidth) {
    if (text.fitsIn(columnWidth)) {
      return text.value();
    }
    const wrapIndex = text.wrapIndex(columnWidth);
    const unwrapIndex = text.unwrapIndex(columnWidth);
    const wrappedText = text.value().substring(0, wrapIndex).concat('\n');
    const unwrappedText = text.value().substring(unwrapIndex);
    return wrappedText.concat(wordWrapNoPrimitives(WrappableText.create(unwrappedText), columnWidth));
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