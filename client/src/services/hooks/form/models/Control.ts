export class Control {
  touched: boolean;
  error: string | null;
  value: any;

  get valid() {
    return !this.error;
  }

  get invalid() {
    return !this.valid;
  }

  constructor(
    public name: string | number | symbol,
    public validators: Array<(value: any) => string | null | undefined> = []
  ) {
  }

  setError(message: string) {
    this.error = message;
  }

  setValue(value: any) {
    this.value = value;
  }

  reset() {
    this.setValue(null);
    this.setError(null);
  }

  validate() {
    for (const v of this.validators) {
      const error = v(this.value);
      if (error) {
        this.setError(error);
        return;
      }
    }
    this.error = null;
  };
}
