import GasCalculator from "./GasCalculator.js";
export default class Form {
    formElement;
    ethanolInput;
    gasInput;
    constructor() {
        this.formElement = document.querySelector("form");
        this.ethanolInput = this.formElement?.querySelector("#alcoolInput");
        this.gasInput = this.formElement?.querySelector("#gasInput");
        this.addSubmitEvent();
    }
    addSubmitEvent() {
        if (this.formElement) {
            this.formElement.onsubmit = this.submit.bind(this);
        }
        else {
            throw new Error("Form element was not found.");
        }
    }
    getInputsValues() {
        if (this.ethanolInput && this.gasInput) {
            const ethanolPrice = this.getFormatedValue(this.ethanolInput?.value);
            const gasPrice = this.getFormatedValue(this.gasInput?.value);
            return { ethanolPrice, gasPrice };
        }
        else {
            throw new Error("Inputs elements was not found.");
        }
    }
    submit(event) {
        event.preventDefault();
        const { ethanolPrice, gasPrice } = this.getInputsValues();
        if (this.isInputValuesValid(ethanolPrice, gasPrice)) {
            this.showResult(ethanolPrice, gasPrice);
        }
        else {
            this.clearInputs();
            throw new Error("Values inputed are not numbers.");
        }
    }
    isInputValuesValid(ethanolPrice, gasPrice) {
        const isEthanolPriceValid = !isNaN(ethanolPrice);
        const isGasPriceValid = !isNaN(gasPrice);
        return isEthanolPriceValid && isGasPriceValid;
    }
    showResult(ethanolPrice, gasPrice) {
        const gasCalculator = new GasCalculator(ethanolPrice, gasPrice);
        const resultMessage = gasCalculator.getResult();
        window.alert(resultMessage);
    }
    getFormatedValue(value) {
        return parseFloat(value.replace(",", "."));
    }
    clearInputs() {
        if (this.ethanolInput && this.gasInput) {
            this.ethanolInput.value = "";
            this.gasInput.value = "";
        }
        else {
            throw new Error("Inputs elements was not found.");
        }
    }
}
