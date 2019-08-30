import {
  trigger,
  style,
  transition,
  animate,
  state,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  // the "in" style determines the "resting" state of the element when it is visible.
  state('in', style({ opacity: 1 })),

  // fade in when created. this could also be written as transition('void => *')
  transition(':enter', [style({ opacity: 0 }), animate(300)]),

  // fade out when destroyed. this could also be written as transition('void => *')
  transition(':leave', animate(200, style({ opacity: 0 }))),
]);

export const fadeIn = trigger('fadeIn', [
  // the "in" style determines the "resting" state of the element when it is visible.
  state('in', style({ opacity: 1 })),

  // fade in when created. this could also be written as transition('void => *')
  transition(':enter', [style({ opacity: 0 }), animate(300)]),
]);

export const fadeOut = trigger('fadeOut', [
  // the "in" style determines the "resting" state of the element when it is visible.
  state('in', style({ opacity: 1 })),

  // fade out when destroyed. this could also be written as transition('void => *')
  transition(':leave', animate(200, style({ opacity: 0 }))),
]);
