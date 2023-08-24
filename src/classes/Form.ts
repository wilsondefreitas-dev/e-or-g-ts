import GasCalculator from "./GasCalculator.js";

type QueriedHTMLElement = HTMLFormElement | null | undefined;

interface IPrices {
  ethanolPrice: number;
  gasPrice: number;
}

export default class Form {
  private formElement: QueriedHTMLElement;
  private ethanolInput: QueriedHTMLElement;
  private gasInput: QueriedHTMLElement;

  constructor() {
    this.formElement = document.querySelector("form");
    this.ethanolInput = this.formElement?.querySelector("#alcoolInput");
    this.gasInput = this.formElement?.querySelector("#gasInput");

    this.addSubmitEvent();
  }

  private addSubmitEvent(): void {
    if (this.formElement) {
      this.formElement.onsubmit = this.submit.bind(this);
    } else {
      throw new Error("Form element was not found.");
    }
  }

  private getInputsValues(): IPrices {
    if (this.ethanolInput && this.gasInput) {
      const ethanolPrice = this.getFormatedValue(this.ethanolInput?.value);
      const gasPrice = this.getFormatedValue(this.gasInput?.value);

      return { ethanolPrice, gasPrice };
    } else {
      throw new Error("Inputs elements was not found.");
    }
  }

  private submit(event: Event): void {
    event.preventDefault();
    const { ethanolPrice, gasPrice } = this.getInputsValues();

    if (this.isInputValuesValid(ethanolPrice, gasPrice)) {
      this.showResult(ethanolPrice, gasPrice);
    } else {
      this.clearInputs();
      throw new Error("Values inputed are not numbers.");
    }
  }

  private isInputValuesValid(ethanolPrice: number, gasPrice: number): boolean {
    const isEthanolPriceValid = !isNaN(ethanolPrice);
    const isGasPriceValid = !isNaN(gasPrice);

    return isEthanolPriceValid && isGasPriceValid;
  }

  private showResult(ethanolPrice: number, gasPrice: number): void {
    const gasCalculator = new GasCalculator(ethanolPrice, gasPrice);
    const resultMessage = gasCalculator.getResult();

    window.alert(resultMessage);
  }

  private getFormatedValue(value: string) {
    return parseFloat(value.replace(",", "."));
  }

  private clearInputs() {
    if (this.ethanolInput && this.gasInput) {
      this.ethanolInput.value = "";
      this.gasInput.value = "";
    } else {
      throw new Error("Inputs elements was not found.");
    }
  }
}
