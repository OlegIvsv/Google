import { Container } from "reactstrap";


export default function Logo(){

    const G = <a class="text-danger">G</a>;
    const o1 = <a class="text-warning">o</a>;
    const o2 = <a class="text-success">o</a>;
    const g = <a class="text-danger">g</a>;
    const l = <a class="text-info">l</a>;
    const e = <a class="text-danger">e</a>;
    const P = <a class="text-success">P</a>;
    const V = <a class="text-info">V</a>;
    const I = <a class="text-warning">I</a>;
    return(
        <div>
            <div class="fst-italic fs-1" style={{fontWeight: '900'}}>
                <p className="my-auto">{G}{o1}{o2}{g}{l}{e}{P}{V}{I}</p>
            </div>
        </div>
    );
}