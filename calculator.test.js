const Calculator = require('./calculator');

describe('Calculator', () => {
  let calculator;
  let outputField;
  
  beforeEach(() => {
      document.body.innerHTML = '<div id="app"></div>';
      outputField = document.createElement('div');
      outputField.id = 'output';
      document.body.appendChild(outputField);
      require('../index');
    });
  
  afterEach(() => {
      document.body.innerHTML = '';
    });
  
  test('output field is initially empty', () => {
      expect(outputField.textContent).toBe('');
    });

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('adds two numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('returns NaN when input is not a number', () => {
      expect(calculator.add('a', 'b')).toBeNaN();
    });
  });

  describe('subtract', () => {
    it('subtracts two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it('returns NaN when input is not a number', () => {
      expect(calculator.subtract('a', 'b')).toBeNaN();
    });
  });

  describe('multiply', () => {
    it('multiplies two numbers', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
    });

    it('returns NaN when input is not a number', () => {
      expect(calculator.multiply('a', 'b')).toBeNaN();
    });
  });

  describe('divide', () => {
    it('divides two numbers', () => {
      expect(calculator.divide(6, 3)).toBe(2);
    });

    it('returns NaN when input is not a number', () => {
      expect(calculator.divide('a', 'b')).toBeNaN();
    });

    it('returns Infinity when dividing by 0', () => {
      expect(calculator.divide(3, 0)).toBe(Infinity);
    });
  });
});

/* Comment: 
This code above tests the calculator.js file, which includes the `Calculator` class. 
The `Calculator` class has four methods: `add`, `subtract`, `multiply`, and `divide`. 
Each method takes two numbers as arguments and returns the result of the operation. 
The `Calculator` class also returns `NaN` when the input is not a number and `Infinity` when dividing by 0.
*/