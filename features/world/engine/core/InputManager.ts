import { VirtualInputAction } from '../../types';

export class InputManager {
  public keys: { [key: string]: boolean } = {};
  public isSprintActive: boolean = false;
  public pendingAction: VirtualInputAction | null = null;
  public joystickVector: { x: number; y: number } = { x: 0, y: 0 };

  public onKeyDown(key?: string, code?: string, keyCode?: number): void {
    if (key) { this.keys[key] = true; this.keys[key.toLowerCase()] = true; this.keys[key.toUpperCase()] = true; }
    if (code) { this.keys[code] = true; this.keys[code.toLowerCase()] = true; }
    if (keyCode !== undefined) this.keys[keyCode] = true;
  }

  public onKeyUp(key?: string, code?: string, keyCode?: number): void {
    if (key) { this.keys[key] = false; this.keys[key.toLowerCase()] = false; this.keys[key.toUpperCase()] = false; }
    if (code) { this.keys[code] = false; this.keys[code.toLowerCase()] = false; }
    if (keyCode !== undefined) this.keys[keyCode] = false;
    const lk = (key || '').toLowerCase();
    const lc = (code || '').toLowerCase();
    if (lk === 'a' || lc === 'keya' || keyCode === 65) { this.keys['a'] = false; this.keys['A'] = false; this.keys['KeyA'] = false; this.keys[65] = false; }
    if (lk === 'd' || lc === 'keyd' || keyCode === 68) { this.keys['d'] = false; this.keys['D'] = false; this.keys['KeyD'] = false; this.keys[68] = false; }
    if (lk === 'w' || lc === 'keyw' || keyCode === 87) { this.keys['w'] = false; this.keys['W'] = false; this.keys['KeyW'] = false; this.keys[87] = false; }
    if (lk === 's' || lc === 'keys' || keyCode === 83) { this.keys['s'] = false; this.keys['S'] = false; this.keys['KeyS'] = false; this.keys[83] = false; }
    if (lk === 'arrowleft' || lc === 'arrowleft' || keyCode === 37) { this.keys['ArrowLeft'] = false; this.keys[37] = false; }
    if (lk === 'arrowright' || lc === 'arrowright' || keyCode === 39) { this.keys['ArrowRight'] = false; this.keys[39] = false; }
    if (lk === 'arrowup' || lc === 'arrowup' || keyCode === 38) { this.keys['ArrowUp'] = false; this.keys[38] = false; }
    if (lk === 'arrowdown' || lc === 'arrowdown' || keyCode === 40) { this.keys['ArrowDown'] = false; this.keys[40] = false; }
    if (lk === ' ' || lc === 'space' || keyCode === 32) { this.keys[' '] = false; this.keys['Space'] = false; this.keys[32] = false; }
    if (lk === 'shift' || lc.includes('shift') || keyCode === 16) { this.keys['Shift'] = false; this.keys['ShiftLeft'] = false; this.keys['ShiftRight'] = false; this.keys[16] = false; }
  }

  public handleVirtualInput(action: VirtualInputAction, payload?: any): void {
    this.pendingAction = action;
    switch (action) {
      case 'left_start': this.keys['virtual_left'] = true; break;
      case 'left_stop': this.keys['virtual_left'] = false; break;
      case 'right_start': this.keys['virtual_right'] = true; break;
      case 'right_stop': this.keys['virtual_right'] = false; break;
      case 'up_start': this.keys['virtual_up'] = true; break;
      case 'up_stop': this.keys['virtual_up'] = false; break;
      case 'down_start': this.keys['virtual_down'] = true; break;
      case 'down_stop': this.keys['virtual_down'] = false; break;
      case 'sprint_start': this.isSprintActive = true; break;
      case 'sprint_stop': this.isSprintActive = false; break;
      case 'sprint_toggle': this.isSprintActive = !this.isSprintActive; break;
      case 'joystick_vector':
        if (payload) this.joystickVector = { x: payload.x || 0, y: payload.y || 0 };
        break;
      case 'jump':
      case 'jump_start':
        this.keys['virtual_jump'] = true;
        break;
      case 'jump_stop':
        this.keys['virtual_jump'] = false;
        break;
      case 'stop':
        this.clearAll();
        break;
    }
  }

  public getMoveVector(): { dx: number; dy: number } {
    if (Math.hypot(this.joystickVector.x, this.joystickVector.y) > 0.05) {
      return { dx: this.joystickVector.x, dy: this.joystickVector.y };
    }
    let dx = 0;
    let dy = 0;
    if (this.isMovingLeft() && !this.isMovingRight()) dx = -1;
    else if (this.isMovingRight() && !this.isMovingLeft()) dx = 1;
    if (this.isMovingUp() && !this.isMovingDown()) dy = -1;
    else if (this.isMovingDown() && !this.isMovingUp()) dy = 1;
    return { dx, dy };
  }

  public isMovingLeft(): boolean {
    return !!(this.keys['a'] || this.keys['A'] || this.keys['ArrowLeft'] || this.keys['KeyA'] || this.keys['virtual_left'] || this.keys[37] || this.keys[65]);
  }

  public isMovingRight(): boolean {
    return !!(this.keys['d'] || this.keys['D'] || this.keys['ArrowRight'] || this.keys['KeyD'] || this.keys['virtual_right'] || this.keys[39] || this.keys[68]);
  }

  public isMovingUp(): boolean {
    return !!(this.keys['w'] || this.keys['W'] || this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['virtual_up'] || this.keys[38] || this.keys[87]);
  }

  public isMovingDown(): boolean {
    return !!(this.keys['s'] || this.keys['S'] || this.keys['ArrowDown'] || this.keys['KeyS'] || this.keys['virtual_down'] || this.keys[40] || this.keys[83]);
  }

  public isJumping(): boolean {
    return !!(this.keys[' '] || this.keys['Space'] || this.keys['virtual_jump'] || this.keys[32]);
  }

  public isSprinting(): boolean {
    return this.isSprintActive || !!(this.keys['Shift'] || this.keys['ShiftLeft'] || this.keys['ShiftRight'] || this.keys[16]);
  }

  public clearAll(): void {
    this.keys = {};
    this.isSprintActive = false;
    this.pendingAction = null;
    this.joystickVector = { x: 0, y: 0 };
  }
}
