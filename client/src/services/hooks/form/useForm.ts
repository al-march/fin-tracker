import { batch, createMemo, observable, onCleanup, onMount } from 'solid-js';
import { distinctUntilChanged, map, Subject } from 'rxjs';
import { createStore } from 'solid-js/store';
import { Control } from '@app/services/hooks/form/models';

type Controls = Record<string, any>;

export const useForm = <C extends Controls>() => {
  type Name = keyof C;
  type Value = C[Name];

  type FormState = {
    values: Partial<C>;
    errors: Partial<Record<Name, any>>;
    isValid: boolean;
  }

  let onValuesChange$: { unsubscribe: () => void };
  const valueChange$ = new Subject<Partial<C>>();

  const controls: Partial<Record<Name, Control>> = {};

  const [state, setState] = createStore<FormState>({
    values: {},
    errors: {},
    isValid: false,
  });

  const values = createMemo(() => ({...state.values}));
  const isValid = createMemo(() => state.isValid);

  onMount(() => {
    onValuesChange$ = observable(values).subscribe(data => {
      checkIsValid();
      valueChange$.next(data);
    });
  });

  onCleanup(() => {
    onValuesChange$.unsubscribe();
    valueChange$.complete();
  });

  const register = (
    name: Name,
    validators: Array<(value: Value) => string | null | undefined> = []
  ) => {
    initControl(name, validators);
    const onInput = onInputHandler(name);

    return {
      onInput,
      name,
      value: state.values[name]
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

        setValueByName(name, value);
        setErrorByControl(control);
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

  const setError = (name: Name, message: string) => {
    const c = controls[name];
    c.setError(message);
    setErrorByControl(c);
    checkIsValid();
  };

  const setValue = (name: Name, value: any) => {
    setState('values', values => ({...values, [name]: value}));

    Promise.resolve().then(() => {
      compareValuesAndControls();
      checkIsValid();
    });
  };

  const handleSubmit = (onSubmit: (ctrl: Partial<C>) => void) => {
    return (e?: Event) => {
      if (e) {
        e.preventDefault();
      }

      Object.values(controls).forEach((c: Control) => {
        c.touched = true;
        c.validate();
        setErrorByControl(c);
      });

      checkIsValid();

      if (state.isValid) {
        onSubmit(values());
      }
    };
  };

  /* Private methods */
  const setErrorByControl = (c: Control) => {
    setState('errors', errors => ({...errors, [c.name]: c.error}));
  };

  const setValueByName = (name: Name, v: any) => {
    setState('values', values => ({...values, [name]: v}));
    Promise.resolve().then(() => {
      compareValuesAndControls();
      checkIsValid();
    });
  };

  const compareValuesAndControls = () => {
    Object.entries(state.values).forEach(([name, value]) => {
      controls[name as Name].value = value;
    });
  };

  const initControl = (name: Name, validators: Array<(value: Value) => string | null | undefined>) => {
    const control = controls[name];
    if (!control) {
      controls[name] = new Control(name, validators);
      controls[name].validate();
    }
  };

  const checkIsValid = () => {
    const valid = Object.values(controls).every((c: Control) => {
      c.validate();
      return c.valid;
    });
    setState('isValid', valid);
  };

  return {
    register,
    errors: state.errors,
    isValid,
    setError,
    watch,
    watchFor,
    setValue,
    handleSubmit
  };
};
