const scale = 20;// escala del juego

// funcion auxiliar para crear elementos de forma rapida
function createElement( type, className = undefined ){
    let element = document.createElement( type );
    className ? element.classList = className : null;
    return element;
}

// se encarga de todo lo grafico
function DOMDisplay( parent, level ){ // parent = nodo body, level = objeto level
    this.wrap = parent.appendChild( createElement( 'div', 'game'));
    this.level = level;

    //this.wrap.appentChild();

    this.wrap.appendChild( this.drawBackground() );
    this.actorsLayer = null;
    
}

    // pinta el fondo
DOMDisplay.prototype.drawBackground = function() {
    let table = createElement( 'table', 'background' );
    // longitud de cada linea del nivel
    table.style.width = this.level.width * scale + 'px';

    this.level.grid.forEach( row => {
        let rowElement = createElement( 'tr' );
        rowElement.style.height = scale + 'px';
        table.appendChild( rowElement );
        row.forEach( type => {
            rowElement.appendChild( createElement( 'td', type ))
        } );
    });

    return table;
}

DOMDisplay.prototype.drawActors = function(){
    let actorsWrap = createElement( 'div' );
    this.level.actors.map( actor => {
        let actorElement = createElement( 'div', `actor ${actor.type}` );
        let rect = actorsWrap.appendChild( actorElement );
        rect.style.width = actor.size.x * scale + 'px';
        rect.style.height = actor.size.y * scale + 'px';
        rect.style.left = actor.position.x * scale + 'px';
        rect.style.top = actor.position.y * scale + 'px';
    });
    return actorsWrap;
}

DOMDisplay.prototype.moveDisplay = function () {
    let width = this.wrap.clientWidth;
    let height = this.wrap.clientHeight;
    let margin = width / 3;

    let left = this.wrap.scrollLeft;
    let rigth = left + width;
    let top = this.wrap.scrollTop;
    let bottom = top + height;

    let player = this.level.actor;
    let playerCenter = player.position.plus(player.size.times(0.5)).times(scale);

    if (playerCenter.x < left + margin) this.wrap.scrollLeft = playerCenter.x - margin;
    else if (playerCenter.x > rigth - margin) this.wrap.scrollLeft = playerCenter.x + margin - width;
    if (playerCenter.y < top + margin) this.wrap.scrollTop = playerCenter.y - margin;
    else if (playerCenter.y > bottom - margin) this.wrap.scrollTop = playerCenter.y + margin - height;
}

DOMDisplay.prototype.drawFrame = function(){
    if( this.actorsLayer ) this.wrap.removeChild( this.actorsLayer );
    this.actorsLayer = this.wrap.appendChild( this.drawActors() );
    this.wrap.className = 'game ' + ( this.level.status || '' );
    this.moveDisplay();
}

DOMDisplay.prototype.clear = function(){
    this.wrap.parentNode.removeChild( this.wrap );// borrar el wrap;
}