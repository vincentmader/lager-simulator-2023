export class Entity {
    constructor(position) {
        this.position = position;
    }
}

class Zelt extends Entity {
    constructor(position) {
        super(position);
    }
}

export class KuechenZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class WoelflingsZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class JupfiZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class PfadiZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class RoverZelt extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class LeiterJurte extends Zelt {
    constructor(position) {
        super(position);
    }
}

export class Lagerfeuer extends Entity {
    constructor(position) {
        super(position);
    }
}
