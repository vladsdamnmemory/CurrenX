import { defineStore } from 'pinia';
import type { ratesFormatType } from '~/utils/generateRatesData';
import { CURRENCY_LABELS } from '~/lib/global';

export interface ICurrencyRates {
	baseCurrency: string;
	updateAvailable: boolean;
}

export interface IExchangeRates {
	[to: string]: {
		[from: string]: number;
	};
}

export type RatesType = Record<string, number>;

const UPDATE_PERMISSION_TIME = 1000;

const timer = ref();

export const useCurrencyStore = defineStore('currency', {
	state: (): ICurrencyRates => ({
		baseCurrency: CURRENCY_LABELS[2],
		updateAvailable: false,
	}),
	actions: {
		async fetchExchangeRates<T>(format: ratesFormatType): Promise<T> {
			try {
				const { $axios } = useNuxtApp();

				clearTimeout(timer.value); // Only one such macrotask at runtime
				this.makeUpdatesAvailableManually(false);

				const response = await $axios.get(`/currency?timestamp=${Date.now()}`);

				if (import.meta.client) {
					// Postpone manual update option for client
					this.delayUpdate();
				}

				// Return the rates, so they can be used in `useAsyncData`
				return generateRatesData(format, this.baseCurrency, response.data as RatesType) as T;
			}
			catch (error) {
				// Ensure to throw error, so it can be handled by `useAsyncData`
				console.error('Error fetching exchange rates:', error);
				throw error;
			}
		},

		setBaseCurrency(currency: string) {
			this.baseCurrency = currency;
		},

		makeUpdatesAvailableManually(available: boolean) {
			this.updateAvailable = available;
		},

		/**
         * As an update remedy helps user refresh rates manually as I cannot establish SSE
         * Or configure WebSocket within the current conditions.
         * Automatic imperative refreshing may seem like server API violation.
         *
         *
         * delayUpdate() Keeps track of re-request possibility interval.
         *
         * For client-side usage.
         **/
		delayUpdate() {
			timer.value = setTimeout(this.makeUpdatesAvailableManually, UPDATE_PERMISSION_TIME, true);
		},
	},
});
