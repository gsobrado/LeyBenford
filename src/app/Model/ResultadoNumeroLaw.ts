export class ResultadoNumeroLaw {
    numero : number;
    cantidadApariciones : number;
    lista : number[];
    porcentaje : number;

     constructor(numero : number, cantidadApariciones : number, lista : number[], porcentaje : number){
        this.numero = numero;
        this.cantidadApariciones = cantidadApariciones;
        this.lista = lista;
        this.porcentaje = porcentaje;
     }
}