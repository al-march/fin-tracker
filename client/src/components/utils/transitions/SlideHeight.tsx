import { ParentProps } from 'solid-js';
import { Transition } from 'solid-transition-group';

export type HeightProps = {
  duration?: number;
  appear?: boolean;
}

export const SlideHeight = (props: ParentProps<HeightProps>) => {
  const duration = props.duration ?? 200;
  const appear = props.appear ?? true;

  return (
    <Transition
      appear={appear}
      onBeforeEnter={(el) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.height = '0';
      }}
      onEnter={(el, done) => {
        const a = el.animate([{
          opacity: 0,
          height: 0 + 'px',
        }, {
          opacity: 1,
          height: el.scrollHeight + 'px'
        }], {
          duration
        });
        a.finished.then(done);
      }}
      onAfterEnter={(el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.height = 'auto';
      }}
      onExit={(el, done) => {
        const a = el.animate([{height: el.scrollHeight + 'px'}, {height: 0}], {
          duration
        });
        a.finished.then(done);
      }}
    >
      {props.children}
    </Transition>
  );
};
