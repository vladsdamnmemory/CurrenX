import { type Ref, ref, watch } from 'vue';
import Decimal from 'decimal.js';
import type { IExchangeRates } from '~/stores/currency';
import { CURRENCY_LABELS } from '~/lib/global';

export const useCurrencyConverter = (exchangeRates: Ref<IExchangeRates | null>) => {
	const fromCurrency = ref(CURRENCY_LABELS[0]);
	const toCurrency = ref(CURRENCY_LABELS[2]);
	const fromAmount = ref<number>(1);
	const toAmount = ref<number>(0);

	const convertCurrency = (direction: 'from' | 'to') => {
		const validNumbers = (direction === 'from' && fromAmount.value !== null)
			|| (direction === 'to' && toAmount.value !== null);

		if (exchangeRates.value && validNumbers) {
			if (direction === 'from') {
				const rate = new Decimal(exchangeRates.value[fromCurrency.value][toCurrency.value]);
				const amount = new Decimal(fromAmount.value);
				toAmount.value = parseFloat(rate.mul(amount).toFixed(2));
			}
			else {
				const rate = new Decimal(exchangeRates.value[toCurrency.value][fromCurrency.value]);
				const amount = new Decimal(toAmount.value);
				fromAmount.value = parseFloat(rate.mul(amount).toFixed(2));
			}
		}
	};

	watch(exchangeRates, () => {
		convertCurrency('from');
	});

	// Watch currency change
	watch([fromCurrency, toCurrency], (value, oldValue) => {
		if (value[0] === value[1]) {
			fromCurrency.value = oldValue[1];
			toCurrency.value = oldValue[0];
		}
		else {
			convertCurrency('from');
		}
	});

	return {
		fromCurrency,
		toCurrency,
		fromAmount,
		toAmount,
		convertCurrency,
	};
};
