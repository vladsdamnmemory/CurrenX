<template>
	<header>
		<v-container max-width="1000px">
			<nav>
				<NuxtLink
					to="/"
					exact-active-class="active-route"
				>
					Home
				</NuxtLink>
				<NuxtLink
					to="/convert"
					exact-active-class="active-route"
				>
					Convert
				</NuxtLink>
			</nav>

			<v-select
				:items="items"
				:model-value="currencyStore.baseCurrency"
				label="Currency"
				variant="outlined"
				@update:model-value="updateCurrency"
			/>
		</v-container>
	</header>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '~/stores/currency';
import { CURRENCY_LABELS } from '~/lib/global';

const items = CURRENCY_LABELS;

const currencyStore = useCurrencyStore();

const updateCurrency = ($: string) => {
	currencyStore.setBaseCurrency($);
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: linear-gradient(135deg, #f8f8f8, #e4e4e4);
}

nav {
  margin-bottom: 24px;
}

nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #333;
  transition: .3s;
}

nav a:hover {
  color: #b88cbc;
}

.active-route {
  color: #a85cae;
}
</style>
