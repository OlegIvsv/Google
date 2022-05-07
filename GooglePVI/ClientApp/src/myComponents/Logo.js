import { Container } from "reactstrap";


export default function Logo(){
    var G = <a class="text-danger">G</a>;
    var o1 = <a class="text-warning">o</a>;
    var o2 = <a class="text-success">o</a>;
    var g = <a class="text-danger">g</a>;
    var l = <a class="text-info">l</a>;
    var e = <a class="text-danger">e</a>;
    var P = <a class="text-success">P</a>;
    var V = <a class="text-info">V</a>;
    var I = <a class="text-warning">I</a>;
    return(
        <div style={{whiteSpace: 'no-wrap', overflow: 'auto'}}>
            <div class="fst-italic fw-bolder d-inline-block"><p>{G}{o1}{o2}{g}{l}{e}{P}{V}{I}</p></div>
        </div>
    );
}