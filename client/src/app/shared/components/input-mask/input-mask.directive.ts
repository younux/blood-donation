import {
  Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appInputMask]'
})
export class InputMaskDirective implements OnInit {
  /*
   - mask Example : ['(', '+', '3', '3', ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
   that gives : (+33)___-____
   - masked values in the above example '(','+','3','3',')','-'
   - unmasked values are those that the user will type and that will be validated by regex
   * */
  // Clears the incomplete value on blur.
  @Input() autoClear: boolean = true;
  // Placeholder character in mask, default is underscore.
  @Input() placeholderChar: string = '_';
  // the input mask
  @Input() get mask(): Array<any> {
    return this._mask;
  }

  set mask(val: Array<any>) {
    this._mask = val;
    this.initMask();
    this.writeValue('');
  }

  // Callback to invoke on when user completes the mask pattern.
  // emits the host value
  @Output() onCompleteHostValue: EventEmitter<string> = new EventEmitter();
  // Callback to invoke on when user completes the mask pattern.
  // emits the unmasked value
  @Output() onCompleteUnmaskedValue: EventEmitter<string> = new EventEmitter();

  // array conatining the mask for example ['(', '+', '3', '3', ')', /\d/, /\d/, /\d/, '-',
  //                                          /\d/, /\d/, /\d/, /\d/]
  _mask: Array<any>;
  // the value to write in input value (this.elementRef.nativeElement.value)
  value: string;
  // length of the mask
  len: number;
  // position of the first non mask element : position of first element that the user will type
  // and that sould be tested (with regex)
  firstNonMaskPos: number;
  // position of the last non mask element : position of last element that the user will type
  // and that sould be tested (with regex)
  lastRequiredNonMaskPos: number;
  // text when the element is focused
  focusText: string;
  // indicates if the input is focused or not
  focus: boolean;
  //
  caretTimeoutId: any;
  // list of the element that are displayed in the input
  buffer: Array<string>;
  // list of the regular expressions to test
  tests:  Array<any>;
  // string buffer that is displayed in the input
  defaultBuffer: string;


  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.initMask();
  }

  // when the input gets the focus
  @HostListener('focus', ['$event']) onFocus(e: any): void {
    this.focus = true;
    clearTimeout(this.caretTimeoutId);
    let pos;

    this.focusText = this.elementRef.nativeElement.value;

    pos = this.checkVal();

    this.caretTimeoutId = setTimeout(() => {
      if (this.elementRef.nativeElement !== document.activeElement) {
        return;
      }
      this.writeBuffer();
      if (pos === this._mask.length) {
        this.caret(0, pos);
      } else {
        this.caret(pos);
      }
    }, 10);

  }

  // when a user writes something in the input
  @HostListener('input', ['$event'])onInput(event) {
    setTimeout(() => {
      let pos = this.checkVal(true);
      this.caret(pos);
      if (this.isCompleted()) {
        this.onCompleteUnmaskedValue.emit(this.getUnmaskedValue());
        this.onCompleteHostValue.emit(this.elementRef.nativeElement.value);
      }
    }, 0);
  }

  // when the input loses focus
  @HostListener('blur', ['$event']) onBlur(e: any): void {
    this.focus = false;
    this.checkVal();
    if (this.elementRef.nativeElement.value !== this.focusText) {
      let event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, false);
      this.elementRef.nativeElement.dispatchEvent(event);
    }
  }

  // when the user is pressing a key
  @HostListener('keydown', ['$event']) onKeydown(e: any): void {
    let k = e.which || e.keyCode, pos, begin, end;
    // backspace, delete, and escape get special treatment
    if (k === 8 || k === 46) {
      pos = this.caret();
      begin = pos.begin;
      end = pos.end;
      if (end - begin === 0) {
        begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
        end = k === 46 ? this.seekNext(end) : end;
      }
      this.clearBuffer(begin, end);
      this.shiftL(begin, end - 1);
      e.preventDefault();
    } else if (k === 13) { // enter
      this.onBlur(e);
    } else if (k === 27) { // escape
      this.elementRef.nativeElement.value = this.focusText;
      this.caret(0, this.checkVal());
      e.preventDefault();
    }
  }

  // when the user presses a key
  @HostListener('keypress', ['$event']) onKeypress(e: any): void {
    let k = e.which || e.keyCode,
      pos = this.caret(),
      p,
      c,
      next,
      completed;

    if (e.ctrlKey || e.altKey || e.metaKey || k < 32) { // Ignore
      return;
    } else if (k && k !== 13) {
      if (pos.end - pos.begin !== 0) {
        this.clearBuffer(pos.begin, pos.end);
        this.shiftL(pos.begin, pos.end - 1);
      }

      p = this.seekNext(pos.begin - 1);
      if (p < this.len) {
        c = String.fromCharCode(k);
        if (this.tests[p].test(c)) {
          this.shiftR(p);

          this.buffer[p] = c;
          this.writeBuffer();
          next = this.seekNext(p);

          this.caret(next);
          if (pos.begin <= this.lastRequiredNonMaskPos) {
            completed = this.isCompleted();
          }
        }
      }
      e.preventDefault();
    }

    if (completed) {
      this.onCompleteUnmaskedValue.emit(this.getUnmaskedValue());
      this.onCompleteHostValue.emit(this.elementRef.nativeElement.value);

    }
  }

  // when the user pastes some content in the input
  @HostListener('paste', ['$event']) onPaste(event: any): void {
    setTimeout(() => {
      let pos = this.checkVal(true);
      this.caret(pos);
      if (this.isCompleted()) {
        this.onCompleteUnmaskedValue.emit(this.getUnmaskedValue());
        this.onCompleteHostValue.emit(this.elementRef.nativeElement.value);
      }
    }, 0);

  }

  // initialization of the mask
  initMask() {
    this.tests = [];
    this.len = this._mask.length;
    this.firstNonMaskPos = null;
    this.buffer = [];
    for (let i = 0; i < this._mask.length; i++) {
      let elt = this._mask[i];
      if (typeof(elt) === 'string') {
        // if elt is a string, we do not test it and we put it in the buffer
        this.tests.push(null);
        this.buffer.push(elt);
      } else { // elt is not a string, we test the if the object is a valid regex expressions
        try {
          // we put the try block to test if elt is a valid regex expression, if not an exception will
          // be thrown and we will catch and consider elt as a string
          this.tests.push(new RegExp(elt));
          if (this.firstNonMaskPos === null) {
            this.firstNonMaskPos = this.tests.length - 1;
          }
          if (i < this.len) {
            this.lastRequiredNonMaskPos = this.tests.length - 1;
          }
          this.buffer.push(this.placeholderChar);
        } catch (e) {
          // we cast elt to a string, and we do not add it to test array and we put it in the buffer
          this.tests.push(null);
          this.buffer.push(elt.toString());
        }
      }
    }
    this.defaultBuffer = this.buffer.join('');
  }

  // write value in the input
  writeValue(value: any): void {
    this.value = value;
    if (this.elementRef.nativeElement) {
      if (this.value === undefined || this.value == null) {
        this.elementRef.nativeElement.value = '';

      } else {
        this.elementRef.nativeElement.value = this.value;
      }
      this.checkVal();
      this.focusText = this.elementRef.nativeElement.value;
    }
  }

  // write buffer content in input value
  writeBuffer() {
    this.elementRef.nativeElement.value = this.buffer.join('');
  }

  // try to place characters where they belong
  checkVal(allow?: boolean) {
    let test = this.elementRef.nativeElement.value, lastMatch = -1, i, c, pos;

    for (i = 0, pos = 0; i < this.len; i++) {
      if (this.tests[i]) {
        this.buffer[i] = this.placeholderChar;
        while (pos++ < test.length) {
          c = test.charAt(pos - 1);
          if (this.tests[i].test(c)) {
            this.buffer[i] = c;
            lastMatch = i;
            break;
          }
        }
        if (pos > test.length) {
          this.clearBuffer(i + 1, this.len);
          break;
        }
      } else {
        if (this.buffer[i] === test.charAt(pos)) {
          pos++;
        }
        if (i < this.len) {
          lastMatch = i;
        }
      }
    }
    if (allow) {
      this.writeBuffer();
    } else if (lastMatch + 1 < this.len) {
      if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
        // Invalid value. Remove it and replace it with the
        // mask, which is the default behavior.
        if (this.elementRef.nativeElement.value) {
          this.elementRef.nativeElement.value = '';
        }
        this.clearBuffer(0, this.len);
      } else {
        // Invalid value, but we opt to show the value to the
        // user and allow them to correct their mistake.
        this.writeBuffer();
      }
    } else {
      this.writeBuffer();
      this.elementRef.nativeElement.value = this.elementRef.nativeElement.value.substring(0, lastMatch + 1);
    }
    return (this.len ? i : this.firstNonMaskPos);
  }

  // clear the buffer between the given start and end positions
  // puts placeholderChar in the values to test
  clearBuffer(start, end) {
    let i;
    for (i = start; i < end && i < this.len; i++) {
      if (this.tests[i]) {
        this.buffer[i] = this.placeholderChar;
      }
    }
  }

  // checks if all the unmasked values are filled correctly
  isCompleted(): boolean {
    let completed: boolean;
    for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
      if (this.tests[i] && this.buffer[i] === this.placeholderChar) {
        return false;
      }
    }
    return true;
  }

  caret(first?: number, last?: number) {
    let range, begin, end;

    if (!this.elementRef.nativeElement.offsetParent || this.elementRef.nativeElement !== document.activeElement) {
      return;
    }

    if (typeof first === 'number') {
      begin = first;
      end = (typeof last === 'number') ? last : begin;
      if (this.elementRef.nativeElement.setSelectionRange) {
        this.elementRef.nativeElement.setSelectionRange(begin, end);
      } else if (this.elementRef.nativeElement['createTextRange']) {
        range = this.elementRef.nativeElement['createTextRange']();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', begin);
        range.select();
      }
    } else {
      if (this.elementRef.nativeElement.setSelectionRange) {
        begin = this.elementRef.nativeElement.selectionStart;
        end = this.elementRef.nativeElement.selectionEnd;
      } else if (document['selection'] && document['selection'].createRange) {
        range = document['selection'].createRange();
        begin = 0 - range.duplicate().moveStart('character', -100000);
        end = begin + range.text.length;
      }

      return {begin: begin, end: end};
    }
  }

  // return the position of the next element to test
  seekNext(pos) {
    while (++pos < this.len && !this.tests[pos]) {
    }
    ;
    return pos;
  }

  // return the position of the previous element to test
  seekPrev(pos) {
    while (--pos >= 0 && !this.tests[pos]) {
    }
    ;
    return pos;
  }

  shiftL(begin: number, end: number) {
    let i, j;

    if (begin < 0) {
      return;
    }

    for (i = begin, j = this.seekNext(end); i < this.len; i++) {
      if (this.tests[i]) {
        if (j < this.len && this.tests[i].test(this.buffer[j])) {
          this.buffer[i] = this.buffer[j];
          this.buffer[j] = this.placeholderChar;
        } else {
          break;
        }
        j = this.seekNext(j);
      }
    }
    this.writeBuffer();
    this.caret(Math.max(this.firstNonMaskPos, begin));
  }

  shiftR(pos) {
    let i, c, j, t;

    for (i = pos, c = this.placeholderChar; i < this.len; i++) {
      if (this.tests[i]) {
        j = this.seekNext(i);
        t = this.buffer[i];
        this.buffer[i] = c;
        if (j < this.len && this.tests[j].test(t)) {
          c = t;
        } else {
          break;
        }
      }
    }
  }

  // gets the unmasked values
  getUnmaskedValue() {
    let unmaskedBuffer = [];
    for (let i = 0; i < this.buffer.length; i++) {
      let c = this.buffer[i];
      if (this.tests[i] && c !== this.placeholderChar) {
        unmaskedBuffer.push(c);
      }
    }
    return unmaskedBuffer.join('');
  }



}
