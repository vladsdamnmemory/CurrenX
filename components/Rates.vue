<template>
	<div>
		<h1>
			<svg-icon
				type="mdi"
				:path="mdiChartLineVariant"
				:size="45"
			/>
			<span>Exchange rates against the {{ currencyStore.baseCurrency }}</span>
		</h1>

		<div class="rate-table">
			<div
				v-if="status === 'pending'"
				class="overlay"
			>
				<span class="loader" />
			</div>

			<ul
				style="transition: .3s"
				:class="status === 'pending' ? 'pending-status' : ''"
			>
				<li
					v-for="(rate, currency) in rates"
					:key="currency"
				>
					<span>1 {{ currency.toUpperCase().split('-')[0] }}</span>
					<svg-icon
						class="gap-exchange-icon"
						type="mdi"
						:path="mdiSwapHorizontal"
						:size="'4rem'"
					/>
					<span class="rate">{{
						rate.toFixed(2)
					}} {{ currency.toUpperCase().split('-')[1] }}</span>
				</li>
			</ul>
		</div>

		<update-trigger :update="refresh" />
	</div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChartLineVariant, mdiSwapHorizontal } from '@mdi/js';
import { useAsyncData } from '#app';
import { type RatesType, useCurrencyStore } from '~/stores/currency';

const currencyStore = useCurrencyStore();

const { data: rates, error, refresh, status } = await useAsyncData(
	'currency-rates',
	() => currencyStore.fetchExchangeRates<RatesType>('default'),
);

watch(
	() => currencyStore.baseCurrency,
	() => {
		refresh();
	},
);

if (error.value) {
	console.error('Error fetching data:', error.value);
}
</script>

<style scoped>
ul {
  margin-top: 0.1em;
  font-size: calc(4vw + 16px);
  list-style: none;
  line-height: 1.5em;
}

li {
  display: flex;
  align-items: center;
}

.pending-status {
  opacity: 0.1;
  user-select: none;
  cursor: default;
  transform: scale(0.9);
  transform-origin: center;
}

.gap-exchange-icon {
  width: 120px;
}

.rate {
  color: #a85cae;
}

h1 {
  display: flex;
  align-items: center;
}

h1 svg {
  margin-right: 8px;
}

.rate-table {
  position: relative;
  padding: 2px 0 24px;
  border-radius: 8px;
  margin-top: -24px;
}
</style>
