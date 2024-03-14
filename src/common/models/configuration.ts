export interface Configuration {
  id: string;
  scrawlingOrderStartTime: string;
  scrawlingOrderEndTime: string;
  scrawlingMoneyExchangeToKitchenCenter: string;
  scrawlingMoneyExchangeToStore: string;
}

export interface ConfigurationToUpdate {
  scrawlingOrderStartTime: Date;
  scrawlingOrderEndTime: Date;
  scrawlingMoneyExchangeToKitchenCenter: Date;
  scrawlingMoneyExchangeToStore: Date;
}
