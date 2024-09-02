<template>
	<section>
		<div
			v-if="status === 'pending'"
			class="overlay"
		>
			<span class="loader" />
		</div>

		<v-sheet
			class="mx-auto"
			width="500"
		>
			<h1>Currency converter</h1>

			<v-form
				style="transition: .3s"
				:class="status === 'pending' ? 'pending-status' : ''"
			>
				<div
					class="d-flex"
					style="margin-bottom: 12px;"
				>
					<v-number-input
						v-model="fromAmount"
						:reverse="false"
						control-variant="default"
						label=""
						:hide-input="false"
						inset
						variant="solo"
						style="flex-basis: 80%;"
						:rules="numberRules"
						@update:model-value="convertCurrency('from')"
					/>

					<v-select
						v-model="fromCurrency"
						:items="CURRENCY_LABELS"
						label=""
						variant="solo"
					/>
				</div>

				<div class="d-flex">
					<v-number-input
						v-model="toAmount"
						:reverse="false"
						control-variant="default"
						label=""
						:hide-input="false"
						inset
						variant="solo"
						style="flex-basis: 80%;"
						:rules="numberRules"
						@update:model-value="convertCurrency('to')"
					/>

					<v-select
						v-model="toCurrency"
						:items="CURRENCY_LABELS"
						label=""
						variant="solo"
					/>
				</div>
			</v-form>

			<div style="padding-top: 24px">
				<update-trigger :update="refresh" />
			</div>
		</v-sheet>
	</section>
</template>

<script setup lang="ts">
import type { VForm } from 'vuetify/components';
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { useCurrencyConverter } from '~/composables/useCurrencyConverter';
import { type IExchangeRates, useCurrencyStore } from '~/stores/currency';
import { useAsyncData } from '#app';
import { CURRENCY_LABELS } from '~/lib/global';

const currencyStore = useCurrencyStore();

const numberRules = [
	(v: number | null) => v !== null || 'Field should not be empty',
];

const { data: rates, error, refresh, status } = await useAsyncData(
	'currency-exchange',
	() => currencyStore.fetchExchangeRates<IExchangeRates>('strict'),
);

if (error.value) {
	console.error('Error fetching data:', error.value);
}

const { fromCurrency, toCurrency, fromAmount, toAmount, convertCurrency } = useCurrencyConverter(rates);

convertCurrency('from');
</script>

<style scoped>
section {
  position: relative;
}

.pending-status {
  opacity: 0.1;
  user-select: none;
  cursor: default;
}
</style>
