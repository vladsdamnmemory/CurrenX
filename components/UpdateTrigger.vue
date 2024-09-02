<template>
	<transition name="fade">
		<v-btn
			v-if="currencyStore.updateAvailable"
			@click="runUpdate"
		>
			<template #prepend>
				<svg-icon
					class="rotation"
					type="mdi"
					:path="mdiRefresh"
					:size="30"
				/>
			</template>
			Refresh rates
		</v-btn>
	</transition>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiRefresh } from '@mdi/js';
import type { AsyncDataExecuteOptions } from '#app/composables/asyncData';
import { useCurrencyStore } from '~/stores/currency';

const { update } = defineProps<{
	update: (opts?: AsyncDataExecuteOptions) => Promise<void>;
}>();

const currencyStore = useCurrencyStore();

const runUpdate = () => {
	if (currencyStore.updateAvailable) update();
};

onMounted(() => {
	currencyStore.delayUpdate();
});
</script>

<style scoped>

</style>
