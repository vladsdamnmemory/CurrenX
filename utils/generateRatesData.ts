import type { IExchangeRates, RatesType } from '~/stores/currency';
import { CURRENCY_LABELS } from '~/lib/global';

export type ratesFormatType = 'default' | 'strict';

export default function (format: ratesFormatType = 'default', currency: string, data: RatesType): RatesType | IExchangeRates {
	if (format === 'strict') {
		const rates: IExchangeRates = {};

		for (const [rate, value] of Object.entries(data)) {
			const relations = rate.split('-');
			const baseCurrency = relations[0];
			const relativeCurrency = relations[1];

			if (
				CURRENCY_LABELS.includes(baseCurrency)
				&& CURRENCY_LABELS.includes(relativeCurrency)
			) {
				if (rates[baseCurrency]) {
					rates[baseCurrency][relativeCurrency] = value;
				}
				else {
					rates[baseCurrency] = { [relativeCurrency]: value };
				}
			}
		}

		return rates;
	}
	else {
		const currencies = CURRENCY_LABELS.filter($ => $ !== currency);
		const filteredRates: RatesType = {};
		currencies.forEach(($) => {
			const prop = $ + '-' + currency;
			filteredRates[prop] = data[prop];
		});

		return filteredRates;
	}
}
