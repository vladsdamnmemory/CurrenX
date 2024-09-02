<template>
	<NuxtLoadingIndicator />
	<Header />
	<v-app theme="customTheme">
		<v-container max-width="1000px">
			<NuxtPage />
		</v-container>
	</v-app>
</template>

<script setup lang="ts">

</script>

<style lang="css">
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s;
}

.page-enter, .page-leave-to {
  opacity: 0;
}

/* CSS transition classes */

/* Entering and leaving states */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

/* Initial state before entering */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* State after entering */
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

.rotation {
  transition: .3s ease-in;
}

.v-btn:hover .rotation {
  transform: rotate(360deg);
}

@keyframes scaleOut {
  100% {
    transform: skewX(-12deg) rotateX(50deg);
  }
}

h1 {
  padding: 24px 0;
  font-size: calc(2vw + 3px);
}

.loader {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #a85cae;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.v-list-item-title, .v-select__selection-text {
  text-transform: uppercase;
}

.overlay {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
