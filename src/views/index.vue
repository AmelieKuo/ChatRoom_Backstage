<script setup>
const devTeam = [
  {
    name: 'Amelie',
    role: 'Front-end Developer',
    image: 'images/devTeam/amelie.png',
    '104': 'https://pda.104.com.tw/profile/share/8tNcgBNuGq7eQ923m5qQqb78hOOSff0d',
    cake: 'https://www.cake.me/s--T60kHA0WhCfVGrv0BDIhMA--/ameliekuo',
    linkedin: 'https://www.linkedin.com/in/ameliekuo/',
    github: 'https://github.com/AmelieKuo',
    email: 'amelie.chihyu.kuo@gmail.com',
    phone: '0978101246',
    line: 'https://line.me/ti/p/Ndv_hA3HcW',
  },
  {
    name: 'Neil',
    role: 'Back-end Developer',
    image: 'images/devTeam/neil.png',
    '104': 'https://www.linkedin.com/in/jhiaen-jhang-3b3521219',
    cake: 'https://www.linkedin.com/in/jhiaen-jhang-3b3521219',
    linkedin: 'https://www.linkedin.com/in/jhiaen-jhang-3b3521219',
    github: 'https://github.com/bbn718',
    email: 'vanishing0718@gmail.com',
    phone: '0978170505',
    line: 'https://line.me/ti/p/I5p9Pu-Ot8',
  }
]

</script>

<template>
  <section class="w-full h-full p-5 box-border">
    <h1 class="color-text_dark font-bold text-h1 mb-8px w-fit">開發團隊</h1>
      <ul class="w-full h-[calc(100%-26px)] flex justify-center items-center gap-2 md:gap-10 lg:gap-60px">
        <li v-for="item in devTeam" class="bg-#F8F9FA border-1px border-solid border-border_gray rounded-11px p-5px md:p-22px box-border">
          <ul class="flex flex-col items-center gap-25px">
            <li>
              <div class="max-w-150px lg:max-w-235px">
                <img :src="item.image" :alt="item.name" class="w-full">
              </div>
            </li>
            <li class="text-text_dark font-700 text-16px text-center">
              <p>{{ item.name }}</p>
              <span class="text-14px">{{ item.role }}</span>
            </li>
            <li class="flex items-center justify-center gap-10px">
              <a :href="item['104']" target="_blank" class="w-40px h-40px rounded-full overflow-hidden hover:outline-main_green hover:outline-3px hover:outline-solid">
                <img src="/images/jobBankLogo/104.png" alt="104" class="w-full">
              </a>
              <a :href="item.cake" target="_blank" class="w-40px h-40px rounded-full overflow-hidden hover:outline-main_green hover:outline-3px hover:outline-solid">
                <img src="/images/jobBankLogo/cake.jpg" alt="cake" class="w-full">
              </a>
              <a :href="item.linkedin" target="_blank" class="w-40px h-40px rounded-full overflow-hidden hover:outline-main_green hover:outline-3px hover:outline-solid">
                <img src="/images/jobBankLogo/linkedin.png" alt="linkedin" class="w-full">
              </a>
              <a :href="item.github" target="_blank" class="w-40px h-40px rounded-full overflow-hidden hover:outline-main_green hover:outline-3px hover:outline-solid">
                <img src="/images/jobBankLogo/github.png" alt="github" class="w-full">
              </a>
            </li>
            <li class="text-text_dark text-12px flex flex-col items-center gap-8px">
              <a :href="`mailto:${item.email}`" target="_blank" class="text-text_dark text-15px hover:text-main_green duration-150">{{ item.email }}</a>
              <a :href="`tel:+886-${item.phone.slice(1)}`" target="_blank" class="text-text_dark text-15px hover:text-main_green duration-150">{{ item.phone }}</a>
              <a :href="item.line" target="_blank" class="text-text_dark text-15px hover:text-main_green duration-150">line.me.{{ item.name }}</a>
            </li>
          </ul>
        </li>
      </ul>
  </section>
</template>