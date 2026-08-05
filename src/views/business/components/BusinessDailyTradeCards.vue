<script lang="ts" setup>
import { useBusinessDailyTrade } from '@/views/business/composables/useBusinessDailyTrade';

defineOptions({ name: 'BusinessDailyTradeCards' });

const { cards } = useBusinessDailyTrade();

function cardImage(index: number) {
  return `/images/business/content/bg-card-${index + 1}.png`;
}
</script>

<template>
  <ul class="business-daily-trade">
    <li v-for="(card, index) in cards" :key="card.id">
      <div class="business-daily-trade__text">
        <h2>{{ card.title }}</h2>
        <strong>{{ card.amount }}</strong>
        <section>
          <span v-for="detail in card.details" :key="detail.id">{{ detail.name }}:{{ detail.amount }}万元</span>
        </section>
      </div>
      <img :src="cardImage(index)" alt="" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.business-daily-trade {
  display: flex;
  align-items: center;
  justify-content: space-between;

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 243px;
    height: 184px;
    padding: 33px 43px 27px 23px;
    color: #fff;
    background: #19abdd;
    border-radius: 5px;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    z-index: 1;

    h2 {
      font-size: 15px;
    }

    strong {
      font-size: 45px;
      font-weight: bold;
    }

    section {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 13px;
    }
  }
}
</style>
