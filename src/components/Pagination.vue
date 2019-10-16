<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !propsPage.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click="updatePage(propsPage.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in propsPage.total_pages"
          :key="page"
          :class="{'active': propsPage.current_page === page}"
        >
          <a class="page-link" href="#" @click="updatePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !propsPage.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click="updatePage(propsPage.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['propsPage'],

  methods: {
    updatePage (page) {
      this.$emit('emitPage', page)
    }
  }
}
</script>
