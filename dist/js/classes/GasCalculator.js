export default class GasCalculator {
    TANK_SIZE = 57;
    GAS_TANK_KM = 400;
    ETHANOL_TANK_KM = 330;
    ethanolTankPrice;
    gasTankPrice;
    constructor(_ethanolPrice, _gasPrice) {
        this.ethanolTankPrice = this.getTankPrice(_ethanolPrice);
        this.gasTankPrice = this.getTankPrice(_gasPrice);
    }
    getTankPrice(_fuelPrice) {
        return this.TANK_SIZE * _fuelPrice;
    }
    getPriceOfGasTankKmInEthanol() {
        return (this.GAS_TANK_KM * this.ethanolTankPrice) / this.ETHANOL_TANK_KM;
    }
    getResult() {
        if (this.gasTankPrice > this.getPriceOfGasTankKmInEthanol()) {
            return "ethanol worths!";
        }
        else if (this.gasTankPrice < this.getPriceOfGasTankKmInEthanol()) {
            return "gas worths!";
        }
        else {
            return "both worths!";
        }
    }
}
