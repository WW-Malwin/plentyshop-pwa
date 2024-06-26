<template>
  <div v-if="cart?.items?.length ?? 0 > 0" class="md:grid md:grid-cols-12 md:gap-x-6" data-testid="cart-page-content">
    <div class="col-span-7 mb-2 md:mb-0">
      <div v-for="(cartItem, index) in cart?.items" :key="cartItem.id">
        <UiCartProductCard :cart-item="cartItem" :class="{ 'border-t': index === 0 }" />
      </div>
      <Coupon class="mb-2" v-if="viewport.isLessThan('lg')" />
    </div>
    <div class="relative col-span-5 md:sticky md:top-10 h-fit" :class="{ 'pointer-events-none opacity-50': loading }">
      <SfLoaderCircular v-if="loading" class="absolute top-[130px] right-0 left-0 m-auto z-[999]" size="2xl" />
      <OrderSummary :cart="cart">
        <Coupon v-if="viewport.isGreaterOrEquals('lg')" class="mb-5" />
        <SfButton
          data-testid="checkout-button"
          :tag="NuxtLink"
          :to="goToCheckout()"
          size="lg"
          class="w-full mb-4 md:mb-0"
        >
          {{ $t('goToCheckout') }}
        </SfButton>
        <client-only>
          <PayPalExpressButton class="mt-4" type="CartPreview" />
        </client-only>
      </OrderSummary>
    </div>
  </div>
  <div v-else class="flex items-center justify-center flex-col pt-24 pb-32" data-testid="cart-page-content">
    <NuxtImg src="/images/empty-cart.svg" :alt="$t('emptyCartImgAlt')" width="192" height="192" loading="lazy" />
    <h2 class="mt-8">{{ $t('emptyCart') }}</h2>
  </div>
</template>

<script setup lang="ts">
import { SfButton, SfLoaderCircular } from '@storefront-ui/vue';
import { useCart } from '~/composables';
const viewport = useViewport();
const localePath = useLocalePath();
const { isAuthorized } = useCustomer();
const { data: cart, loading } = useCart();
const NuxtLink = resolveComponent('NuxtLink');

function goToCheckout() {
  return isAuthorized.value ? localePath(paths.checkout) : localePath(paths.guestLogin);
}
</script>
