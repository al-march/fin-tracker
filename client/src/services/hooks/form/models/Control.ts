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

  validate() {
    for (const v of this.validators) {
      const error = v(this.value);
      if (error) {
        this.error = error;
        return;
      }
    }
    this.error = null;
  };
}
