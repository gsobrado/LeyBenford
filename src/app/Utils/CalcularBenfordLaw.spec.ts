import { CalcularBenfordLaw } from './CalcularBenfordLaw';
import { ResultadoLaw } from '../Model/ResultadoLaw';
import { ResultadoNumeroLaw } from '../Model/ResultadoNumeroLaw'; // May not be directly needed if checking through ResultadoLaw

describe('CalcularBenfordLaw', () => {

  describe('getFirstDigit', () => {
    it('should return the first digit for single-digit positive numbers (ntn=0)', () => {
      expect(CalcularBenfordLaw.getFirstDigit(0, 5)).toBe(5);
      expect(CalcularBenfordLaw.getFirstDigit(0, 1)).toBe(1);
      expect(CalcularBenfordLaw.getFirstDigit(0, 9)).toBe(9);
    });

    it('should return the first digit for multi-digit positive numbers (ntn=0)', () => {
      expect(CalcularBenfordLaw.getFirstDigit(0, 123)).toBe(1);
      expect(CalcularBenfordLaw.getFirstDigit(0, 987)).toBe(9);
      expect(CalcularBenfordLaw.getFirstDigit(0, 56)).toBe(5);
    });

    it('should return the Nth digit based on ntn parameter', () => {
      expect(CalcularBenfordLaw.getFirstDigit(1, 123)).toBe(2); // Second digit
      expect(CalcularBenfordLaw.getFirstDigit(2, 987)).toBe(7); // Third digit
      expect(CalcularBenfordLaw.getFirstDigit(0, 1)).toBe(1);   // First digit of single digit number
      expect(CalcularBenfordLaw.getFirstDigit(1, 1)).toBe(0);   // Second digit of single digit number (effectively out of bounds, current logic returns 0)
    });
    
    it('should return 0 for zero or negative numbers', () => {
      expect(CalcularBenfordLaw.getFirstDigit(0, 0)).toBe(0);
      expect(CalcularBenfordLaw.getFirstDigit(0, -10)).toBe(0);
      expect(CalcularBenfordLaw.getFirstDigit(0, -123)).toBe(0);
    });
  });

  describe('calcularBenford', () => {
    it('should correctly process a simple list of numbers', () => {
      const numberList = [1, 10, 11, 2, 25, 300, 199];
      const result = CalcularBenfordLaw.calcularBenford(numberList);

      expect(result.cantidadTotal).toBe(7);

      // Check counts
      expect(result.resultadosNumbers[0].cantidadApariciones).toBe(4); // Digit 1
      expect(result.resultadosNumbers[1].cantidadApariciones).toBe(2); // Digit 2
      expect(result.resultadosNumbers[2].cantidadApariciones).toBe(1); // Digit 3
      for (let i = 3; i < 9; i++) {
        expect(result.resultadosNumbers[i].cantidadApariciones).toBe(0);
      }

      // Check percentages (use toBeCloseTo for floating point comparisons)
      expect(result.resultadosNumbers[0].porcentaje).toBeCloseTo((4 / 7) * 100, 2);
      expect(result.resultadosNumbers[1].porcentaje).toBeCloseTo((2 / 7) * 100, 2);
      expect(result.resultadosNumbers[2].porcentaje).toBeCloseTo((1 / 7) * 100, 2);
      for (let i = 3; i < 9; i++) {
        expect(result.resultadosNumbers[i].porcentaje).toBeCloseTo(0, 2);
      }
      
      // Check lists within resultadosNumbers
      expect(result.resultadosNumbers[0].lista).toEqual([1, 10, 11, 199]);
      expect(result.resultadosNumbers[1].lista).toEqual([2, 25]);
      expect(result.resultadosNumbers[2].lista).toEqual([300]);

      // Check overall list
      expect(result.lista).toEqual(numberList);
    });

    it('should return an empty result for an empty list', () => {
      const result = CalcularBenfordLaw.calcularBenford([]);
      expect(result.cantidadTotal).toBe(0);
      result.resultadosNumbers.forEach(digitResult => {
        expect(digitResult.cantidadApariciones).toBe(0);
        expect(digitResult.porcentaje).toBe(0); // or toBeCloseTo(0,2)
        expect(digitResult.lista.length).toBe(0);
      });
      expect(result.lista.length).toBe(0);
    });

    it('should ignore numbers that result in a first digit of 0', () => {
      // Current getFirstDigit returns 0 for these due to Math.log behavior
      const numberList = [0.1, 0.5, 0, -5]; 
      const result = CalcularBenfordLaw.calcularBenford(numberList);
      expect(result.cantidadTotal).toBe(0); // Because all these numbers give firstDigit = 0 and are ignored
       result.resultadosNumbers.forEach(digitResult => {
        expect(digitResult.cantidadApariciones).toBe(0);
      });
    });

    it('should correctly sum percentages', () => {
      const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1]; // 10 numbers
      const result = CalcularBenfordLaw.calcularBenford(numberList);
      expect(result.cantidadTotal).toBe(10);
      let sumOfPercentages = 0;
      result.resultadosNumbers.forEach(digitResult => {
        sumOfPercentages += digitResult.porcentaje;
      });
      // The sum of individual percentages (which are rounded) might not be exactly 100
      // but the stored 'porcentajeTotal' in ResultadoLaw should be close to 100 if calculated correctly.
      expect(result.porcentajeTotal).toBeCloseTo(100, 1); // Allow some leeway for rounding sum
    });
  });
});
