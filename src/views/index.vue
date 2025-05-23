<script setup>
const devTeam = [
  {
    name: 'Amelie',
    role: '前端工程師',
    '104': 'https://github.com/AmelieKuo',
    github: 'https://github.com/AmelieKuo',
    cake: 'https://github.com/AmelieKuo',
    email: 'amelie.chihyu.kuo@gmail.com',
    phone: '0978101246',
    image: '/images/devTeam/amelie.png',
  },
  {
    name: 'Neil',
    role: '後端工程師',
    '104': 'https://github.com/AmelieKuo',
    github: 'https://github.com/AmelieKuo',
    cake: 'https://github.com/AmelieKuo',
    email: 'amelie.chihyu.kuo@gmail.com',
    phone: '0978101246',
    image: '/images/devTeam/neil.png',
  }
]

</script>

<template>
  <section class="w-full p-5">
    <h1 class="color-text_dark font-bold text-h1 mb-8px w-fit">開發團隊</h1>
      <ul class="w-full h-full flex justify-center items-center gap-60px pb-10%">
        <li v-for="item in devTeam" class="bg-#F8F9FA border-1px border-solid border-border_gray rounded-11px p-22px">
          <ul class="flex flex-col items-center gap-22px">
            <li>
              <img :src="item.image" :alt="item.name">
            </li>
            <li class="text-text_dark font-700 text-16px">
              {{ item.name }}
            </li>
            <li class="flex items-center justify-center gap-10px">
              <a :href="item['104']" class="w-40px h-40px rounded-full overflow-hidden hover:outline-main_green hover:outline-3px hover:outline-solid">
                <img src="/images/jobBankLogo/104.png" alt="104" class="w-full">
              </a>
              <a :href="item.cake" class="w-40px h-40px rounded-full overflow-hidden hover:outline-main_green hover:outline-3px hover:outline-solid">
                <img src="/images/jobBankLogo/github.png" alt="github" class="w-full">
              </a>
              <a :href="item.cake" class="w-40px h-40px rounded-full overflow-hidden hover:outline-main_green hover:outline-3px hover:outline-solid">
                <img src="/images/jobBankLogo/cake.jpg" alt="cake" class="w-full">
              </a>
            </li>
            <li class="text-text_dark text-12px">
              <a :href="`mailto:${item.email}`" class="text-text_dark text-15px hover:text-main_green duration-150">{{ item.email }}</a>
            </li>
            <li class="text-text_dark text-12px">
              <a :href="`tel:+886-${item.email.slice[1]}`" class="text-text_dark text-15px hover:text-main_green duration-150">{{ item.phone }}</a>
            </li>
          </ul>
        </li>
      </ul>
  </section>
</template>