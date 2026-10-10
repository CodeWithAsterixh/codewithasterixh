import { VirtualInputAction } from '../../types';

export class InputManager {
  public keys: { [key: string]: boolean } = {};
  public isSprintActive: boolean = false;
  public pendingAction: VirtualInputAction | null = null;
  public joystickVector: { x: number; y: number } = { x: 0, y: 0 };

  public onKeyDown(k?: string, c?: string, kc?: number): void {
    if (k) { this.keys[k] = true; this.keys[k.toLowerCase()] = true; this.keys[k.toUpperCase()] = true; }
    if (c) { this.keys[c] = true; this.keys[c.toLowerCase()] = true; }
    if (kc !== undefined) this.keys[kc] = true;
  }

  public onKeyUp(k?: string, c?: string, kc?: number): void {
    if (k) { this.keys[k] = false; this.keys[k.toLowerCase()] = false; this.keys[k.toUpperCase()] = false; }
    if (c) { this.keys[c] = false; this.keys[c.toLowerCase()] = false; }
    if (kc !== undefined) this.keys[kc] = false;
    const lk = (k || '').toLowerCase(); const lc = (c || '').toLowerCase();
    if (lk === 'a' || lc === 'keya' || kc === 65) { this.keys['a'] = false; this.keys['A'] = false; this.keys['KeyA'] = false; this.keys['virtual_left'] = false; this.keys[65] = false; }
    if (lk === 'd' || lc === 'keyd' || kc === 68) { this.keys['d'] = false; this.keys['D'] = false; this.keys['KeyD'] = false; this.keys['virtual_right'] = false; this.keys[68] = false; }
    if (lk === 'w' || lc === 'keyw' || kc === 87) { this.keys['w'] = false; this.keys['W'] = false; this.keys['KeyW'] = false; this.keys['virtual_up'] = false; this.keys[87] = false; }
    if (lk === 's' || lc === 'keys' || kc === 83) { this.keys['s'] = false; this.keys['S'] = false; this.keys['KeyS'] = false; this.keys['virtual_down'] = false; this.keys[83] = false; }
    if (lk === 'arrowleft' || lc === 'arrowleft' || kc === 37) { this.keys['ArrowLeft'] = false; this.keys['virtual_left'] = false; this.keys[37] = false; }
    if (lk === 'arrowright' || lc === 'arrowright' || kc === 39) { this.keys['ArrowRight'] = false; this.keys['virtual_right'] = false; this.keys[39] = false; }
    if (lk === 'arrowup' || lc === 'arrowup' || kc === 38) { this.keys['ArrowUp'] = false; this.keys['virtual_up'] = false; this.keys[38] = false; }
    if (lk === 'arrowdown' || lc === 'arrowdown' || kc === 40) { this.keys['ArrowDown'] = false; this.keys['virtual_down'] = false; this.keys[40] = false; }
    if (lk === ' ' || lc === 'space' || kc === 32) { this.keys[' '] = false; this.keys['Space'] = false; this.keys['virtual_jump'] = false; this.keys[32] = false; }
    if (lk === 'shift' || lc.includes('shift') || kc === 16) { this.keys['Shift'] = false; this.keys['ShiftLeft'] = false; this.keys['ShiftRight'] = false; this.keys[16] = false; }
  }

  public handleVirtualInput(act: VirtualInputAction, payload?: any): void {
    this.pendingAction = act;
    switch (act) {
      case 'left_start': this.keys['virtual_left'] = true; this.keys['virtual_right'] = false; break;
      case 'left_stop': this.keys['virtual_left'] = false; break;
      case 'right_start': this.keys['virtual_right'] = true; this.keys['virtual_left'] = false; break;
      case 'right_stop': this.keys['virtual_right'] = false; break;
      case 'up_start': this.keys['virtual_up'] = true; this.keys['virtual_down'] = false; break;
      case 'up_stop': this.keys['virtual_up'] = false; break;
      case 'down_start': this.keys['virtual_down'] = true; this.keys['virtual_up'] = false; break;
      case 'down_stop': this.keys['virtual_down'] = false; break;
      case 'sprint_start': this.isSprintActive = true; break;
      case 'sprint_stop': this.isSprintActive = false; break;
      case 'sprint_toggle': this.isSprintActive = !this.isSprintActive; break;
      case 'joystick_vector': if (payload) this.joystickVector = { x: payload.x || 0, y: payload.y || 0 }; break;
      case 'jump': case 'jump_start': this.keys['virtual_jump'] = true; break;
      case 'jump_stop': this.keys['virtual_jump'] = false; break;
      case 'stop': this.clearAll(); break;
    }
  }

  public getMoveVector(): { dx: number; dy: number } {
    if (Math.hypot(this.joystickVector.x, this.joystickVector.y) > 0.05) return { dx: this.joystickVector.x, dy: this.joystickVector.y };
    let dx = 0, dy = 0;
    const l = this.isMovingLeft(), r = this.isMovingRight(), u = this.isMovingUp(), d = this.isMovingDown();
    if (l && !r) dx = -1; else if (r && !l) dx = 1;
    if (u && !d) dy = -1; else if (d && !u) dy = 1;
    return { dx, dy };
  }

  public isMovingLeft(): boolean { return !!(this.keys['a'] || this.keys['A'] || this.keys['ArrowLeft'] || this.keys['KeyA'] || this.keys['virtual_left'] || this.keys[37] || this.keys[65]); }
  public isMovingRight(): boolean { return !!(this.keys['d'] || this.keys['D'] || this.keys['ArrowRight'] || this.keys['KeyD'] || this.keys['virtual_right'] || this.keys[39] || this.keys[68]); }
  public isMovingUp(): boolean { return !!(this.keys['w'] || this.keys['W'] || this.keys['ArrowUp'] || this.keys['KeyW'] || this.keys['virtual_up'] || this.keys[38] || this.keys[87]); }
  public isMovingDown(): boolean { return !!(this.keys['s'] || this.keys['S'] || this.keys['ArrowDown'] || this.keys['KeyS'] || this.keys['virtual_down'] || this.keys[40] || this.keys[83]); }
  public isJumping(): boolean { return !!(this.keys[' '] || this.keys['Space'] || this.keys['virtual_jump'] || this.keys[32]); }
  public isSprinting(): boolean { return this.isSprintActive || !!(this.keys['Shift'] || this.keys['ShiftLeft'] || this.keys['ShiftRight'] || this.keys[16]); }

  public getAttackAction(): 'attack1' | 'attack2' | 'attack3' | 'attack4' | null {
    if (this.pendingAction && ['attack1', 'attack2', 'attack3', 'attack4'].includes(this.pendingAction)) {
      const act = this.pendingAction as 'attack1' | 'attack2' | 'attack3' | 'attack4';
      this.pendingAction = null;
      return act;
    }
    if (this.keys['Digit1'] || this.keys['1'] || this.keys['KeyJ'] || this.keys['j'] || this.keys['J'] || this.keys['KeyF'] || this.keys['f'] || this.keys['F']) {
      this.clearKeys(['Digit1', '1', 'KeyJ', 'j', 'J', 'KeyF', 'f', 'F']); return 'attack1';
    }
    if (this.keys['Digit2'] || this.keys['2'] || this.keys['KeyK'] || this.keys['k'] || this.keys['K'] || this.keys['KeyG'] || this.keys['g'] || this.keys['G']) {
      this.clearKeys(['Digit2', '2', 'KeyK', 'k', 'K', 'KeyG', 'g', 'G']); return 'attack2';
    }
    if (this.keys['Digit3'] || this.keys['3'] || this.keys['KeyL'] || this.keys['l'] || this.keys['L'] || this.keys['KeyH'] || this.keys['h'] || this.keys['H']) {
      this.clearKeys(['Digit3', '3', 'KeyL', 'l', 'L', 'KeyH', 'h', 'H']); return 'attack3';
    }
    if (this.keys['Digit4'] || this.keys['4'] || this.keys['Semicolon'] || this.keys[';'] || this.keys['KeyU'] || this.keys['u'] || this.keys['U'] || this.keys['KeyY'] || this.keys['y'] || this.keys['Y']) {
      this.clearKeys(['Digit4', '4', 'Semicolon', ';', 'KeyU', 'u', 'U', 'KeyY', 'y', 'Y']); return 'attack4';
    }
    return null;
  }

  public isInspectPressed(): boolean {
    if (this.pendingAction === 'inspect') {
      this.pendingAction = null;
      return true;
    }
    const pressed = !!(this.keys['KeyE'] || this.keys['e'] || this.keys['E'] || this.keys['Enter']);
    if (pressed) {
      this.clearKeys(['KeyE', 'e', 'E', 'Enter']);
      return true;
    }
    return false;
  }

  private clearKeys(keyList: string[]): void { for (const k of keyList) this.keys[k] = false; }

  public clearAll(): void {
    this.keys = {};
    this.isSprintActive = false;
    this.pendingAction = null;
    this.joystickVector = { x: 0, y: 0 };
  }
}
