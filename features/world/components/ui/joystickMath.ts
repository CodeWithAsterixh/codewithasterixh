import { VirtualInputAction } from '../../types';

export const MAX_JOYSTICK_RADIUS = 50;
export const JOYSTICK_DEADZONE = 4;

export interface JoystickDirectionState {
  xDir: 'left' | 'right' | 'none';
  yDir: 'up' | 'down' | 'none';
}

export function updateJoystickDirections(
  clampedX: number,
  clampedY: number,
  state: JoystickDirectionState,
  onVirtualInput: (action: VirtualInputAction, payload?: any) => void
) {
  if (clampedX < -JOYSTICK_DEADZONE) {
    if (state.xDir !== 'left') {
      if (state.xDir === 'right') onVirtualInput('right_stop');
      state.xDir = 'left';
      onVirtualInput('left_start');
    }
  } else if (clampedX > JOYSTICK_DEADZONE) {
    if (state.xDir !== 'right') {
      if (state.xDir === 'left') onVirtualInput('left_stop');
      state.xDir = 'right';
      onVirtualInput('right_start');
    }
  } else {
    if (state.xDir !== 'none') {
      if (state.xDir === 'left') onVirtualInput('left_stop');
      if (state.xDir === 'right') onVirtualInput('right_stop');
      state.xDir = 'none';
    }
  }

  if (clampedY < -JOYSTICK_DEADZONE) {
    if (state.yDir !== 'up') {
      if (state.yDir === 'down') onVirtualInput('down_stop');
      state.yDir = 'up';
      onVirtualInput('up_start');
    }
  } else if (clampedY > JOYSTICK_DEADZONE) {
    if (state.yDir !== 'down') {
      if (state.yDir === 'up') onVirtualInput('up_stop');
      state.yDir = 'down';
      onVirtualInput('down_start');
    }
  } else {
    if (state.yDir !== 'none') {
      if (state.yDir === 'up') onVirtualInput('up_stop');
      if (state.yDir === 'down') onVirtualInput('down_stop');
      state.yDir = 'none';
    }
  }
}

export function resetJoystickDirections(
  state: JoystickDirectionState,
  onVirtualInput: (action: VirtualInputAction, payload?: any) => void
) {
  onVirtualInput('joystick_vector', { x: 0, y: 0 });
  if (state.xDir === 'left') onVirtualInput('left_stop');
  if (state.xDir === 'right') onVirtualInput('right_stop');
  if (state.yDir === 'up') onVirtualInput('up_stop');
  if (state.yDir === 'down') onVirtualInput('down_stop');
  state.xDir = 'none';
  state.yDir = 'none';
}
