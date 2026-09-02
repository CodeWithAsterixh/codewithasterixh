declare module 'p5' {
  export default class p5 {
    constructor(sketch: (p: p5) => void, node?: HTMLElement | string);
    width: number;
    height: number;
    windowWidth: number;
    windowHeight: number;
    mouseX: number;
    mouseY: number;
    key: string;
    code: string;
    PI: number;
    TWO_PI: number;
    HALF_PI: number;
    BOLD: string;
    CENTER: string;
    
    setup(): void;
    draw(): void;
    windowResized?(): void;
    keyPressed?(e?: KeyboardEvent): void;
    keyReleased?(e?: KeyboardEvent): void;
    mousePressed?(e?: MouseEvent): void;
    mouseDragged?(e?: MouseEvent): void;
    mouseReleased?(e?: MouseEvent): void;

    createCanvas(w: number, h: number): any;
    resizeCanvas(w: number, h: number): void;
    frameRate(fps: number): void;
    background(r: number | string, g?: number, b?: number, a?: number): void;
    fill(r: number | string, g?: number, b?: number, a?: number): void;
    noFill(): void;
    stroke(r: number | string, g?: number, b?: number, a?: number): void;
    noStroke(): void;
    strokeWeight(w: number): void;
    rectMode(mode: string): void;
    ellipseMode(mode: string): void;
    textAlign(h: string, v?: string): void;
    textSize(s: number): void;
    textStyle(s: string): void;
    text(str: string, x: number, y: number): void;

    push(): void;
    pop(): void;
    translate(x: number, y: number): void;
    rotate(angle: number): void;
    scale(x: number, y?: number): void;

    rect(x: number, y: number, w: number, h: number, r?: number): void;
    ellipse(x: number, y: number, w: number, h: number): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    arc(x: number, y: number, w: number, h: number, start: number, stop: number): void;
    triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;

    sin(angle: number): number;
    cos(angle: number): number;
    lerp(start: number, stop: number, amt: number): number;
    constrain(n: number, low: number, high: number): number;
    map(value: number, start1: number, stop1: number, start2: number, stop2: number): number;

    remove(): void;
  }
}
