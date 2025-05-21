import { ResultadoNumeroLaw } from "../Model/ResultadoNumeroLaw";
import { ResultadoLaw } from '../Model/ResultadoLaw'

export class CalcularBenfordLaw {

    static calcularBenford = (numberList : number[]) : ResultadoLaw => {
            let benfordResult = CalcularBenfordLaw.crearResultadosLaw();
                benfordResult.lista = numberList;
                numberList.forEach(currentNumber => {
                    let firstDigit = CalcularBenfordLaw.getFirstDigit(0, currentNumber);
                    // console.log("Number: " + currentNumber + " First Digit = " + firstDigit);
                    if(firstDigit != 0){
                        benfordResult.resultadosNumbers[firstDigit - 1].lista.push(currentNumber);
                        benfordResult.resultadosNumbers[firstDigit - 1].cantidadApariciones++;
                        benfordResult.cantidadTotal++; 
                    }
                });
                let currentTotalPercentage = 0;
                benfordResult.resultadosNumbers.forEach(digitData => {
                    digitData.porcentaje = (digitData.cantidadApariciones * 100) / benfordResult.cantidadTotal;
                    digitData.porcentaje = parseFloat(digitData.porcentaje.toFixed(3));
                    currentTotalPercentage += digitData.porcentaje;
                })
                benfordResult.porcentajeTotal = parseFloat(currentTotalPercentage.toFixed(2));
                return benfordResult;
    }

    static getFirstDigit(ntn, number){
        var len = Math.floor( Math.log(number) / Math.LN10 ) - ntn;
        return ( (number / Math.pow(10, len)) % 10) | 0;
    }
    
    static crearResultadosLaw = () : ResultadoLaw => {

            let newResult = new ResultadoLaw();
            newResult.cantidadTotal = 0;
            newResult.lista = [];
            let initialDigitResults = new Array<ResultadoNumeroLaw>();
            for (let index = 1; index < 10; index++) {
                initialDigitResults.push(new ResultadoNumeroLaw(index, 0, [], 0));
            }
            newResult.resultadosNumbers = initialDigitResults;
            return newResult;
    }

}