import { batch, createSignal, observable, onCleanup, onMount } from 'solid-js';
import { distinctUntilChanged, map, Subject } from 'rxjs';
import { createStore } from 'solid-js/store';
import { Control } from '@app/services/hooks/form/models';

type Controls = Record<string, any>;

export const useForm = <Ctrl extends Controls>() => {
  type Name = keyof Ctrl;
  type Value = Ctrl[Name];

  let observer$: { unsubscribe(): void };

  const valueChange$ = new Subject<Partial<Ctrl>>();

  const controls: Partial<Record<Name, Control>> = {};
  const [errors, setErrors] = createStore<Partial<Record<Name, any>>>({});
  const [values, setValue] = createSignal<Partial<Ctrl>>({});

  onMount(() => {
    observer$ = observable(values).subscribe(values => {
      valueChange$.next(values);
    });
  });

  onCleanup(() => {
    observer$.unsubscribe();
    valueChange$.complete();
  });

  const register = (
    name: Name,
    validators: Array<(value: Value) => string | null | undefined> = []
  ) => {
    const control = controls[name];
    if (!control) {
      controls[name] = new Control(name, validators);
    }

    return {
      onInput: onInputHandler(name),
      name
    };
  };

  const onInputHandler = (name: Name) => {
    return (e: Event) => {
      batch(() => {
        const value = getControlValue(e);
        const control = controls[name];

        control.touched = true;
        control.value = value;
        control.validate();

        setValue(prev => ({...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: control.error}));
      });
    };
  };

  const getControlValue = (evt: unknown): Value => {
    if (evt instanceof Event) {
      const input = evt.target as HTMLInputElement;
      return getInputValue(input);
    }
    return evt as any;
  };

  const getInputValue = (input: HTMLInputElement): Value => {
    switch (input.type) {
      case 'checkbox':
        return input.checked as Value;
      default:
        return input.value as Value;
    }
  };

  const watch = () => {
    return valueChange$.pipe(
      distinctUntilChanged()
    );
  };

  const watchFor = (name: Name) => {
    return valueChange$.pipe(
      map(v => v[name]),
      distinctUntilChanged()
    );
  };

  const handleSubmit = (cb: (ctrl: Partial<Ctrl>) => void) => {
    Object.values(controls).forEach((control: Control) => {
      control.touched = true;
      control.validate();
      setErrors(prev => ({...prev, [control.name]: control.error}))
    });

    const isValid = Object.values(controls).every((c: Control) => c.valid);

    if (isValid) {
      cb(values());
    }
  };

  return {
    register,
    errors,
    watch,
    watchFor,
    handleSubmit
  };
};
