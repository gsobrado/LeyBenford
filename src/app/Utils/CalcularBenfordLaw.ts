import { ResultadoNumeroLaw } from "../Model/ResultadoNumeroLaw";
import { ResultadoLaw } from '../Model/ResultadoLaw'

export class CalcularBenfortLaw {

    static calcularBenfond = (lista : number[]) : Promise<ResultadoLaw> => {
        return new Promise((resolve, reject) => {
            CalcularBenfortLaw.crearResultadosLaw().then(resp => {
                resp.lista = lista;
                lista.forEach(numero => {
                    let primerDigito = CalcularBenfortLaw.math(0, numero);
                    // console.log("Numero: " + numero + " Primer Digito = " + primerDigito);
                    if(primerDigito != 0){
                        resp.resultadosNumbers[primerDigito - 1].lista.push(numero);
                        resp.resultadosNumbers[primerDigito - 1].cantidadApariciones++;
                        resp.cantidadTotal++; 
                    }
                });
                let porcentajeTotal = 0;
                resp.resultadosNumbers.forEach(numero => {
                    numero.porcentaje = (numero.cantidadApariciones * 100) / resp.cantidadTotal;
                    numero.porcentaje = new Number(numero.porcentaje.toFixed(3)).valueOf();
                    porcentajeTotal += numero.porcentaje;
                })
                resp.porcentajeTotal =  new Number(porcentajeTotal.toFixed(2)).valueOf();;
                resolve(resp);
            });
        });
    }

    static math(ntn, number){
        var len = Math.floor( Math.log(number) / Math.LN10 ) - ntn;
        return ( (number / Math.pow(10, len)) % 10) | 0;
    }
    
    static crearResultadosLaw = () : Promise<ResultadoLaw> => {
        return new Promise((resolve, reject) => {
            let respuesta = new ResultadoLaw();
            respuesta.cantidadTotal = 0;
            respuesta.lista = [];
            let respuestaNumeros = new Array<ResultadoNumeroLaw>();
            for (let index = 1; index < 10; index++) {
                respuestaNumeros.push(new ResultadoNumeroLaw(index, 0, [], 0));
            }
            respuesta.resultadosNumbers = respuestaNumeros;
            resolve(respuesta);
        })
    }

}