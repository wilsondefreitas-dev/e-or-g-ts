export default class GasCalculator {
  private TANK_SIZE: number = 57;
  private GAS_TANK_KM: number = 400;
  private ETHANOL_TANK_KM: number = 330;

  private ethanolTankPrice: number;
  private gasTankPrice: number;

  constructor(_ethanolPrice: number, _gasPrice: number) {
    this.ethanolTankPrice = this.getTankPrice(_ethanolPrice);
    this.gasTankPrice = this.getTankPrice(_gasPrice);
  }

  private getTankPrice(_fuelPrice: number): number {
    return this.TANK_SIZE * _fuelPrice;
  }

  private getPriceOfGasTankKmInEthanol(): number {
    return (this.GAS_TANK_KM * this.ethanolTankPrice) / this.ETHANOL_TANK_KM;
  }

  getResult(): string {
    if (this.gasTankPrice > this.getPriceOfGasTankKmInEthanol()) {
      return "ethanol worths!";
    } else if (this.gasTankPrice < this.getPriceOfGasTankKmInEthanol()) {
      return "gas worths!";
    } else {
      return "both worths!";
    }
  }
}
