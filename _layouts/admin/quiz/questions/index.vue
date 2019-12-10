<template>
  <div id="pageId" class="q-layout-page layout-padding">
    <!---Component CRUD-->
    <div class="col-12 col-md-12 q-mb-md">
      <q-btn
              color="primary"
              icon="fas fa-question-circle"
              size="md"
              :label="$tr('qquiz.layout.goPolls')"
              @click="$router.push({name: 'qmarketplace.admin.polls.index'})"/>
    </div>
    <crud :crud-data="import('@imagina/qmarketplace/_crud/quiz/questions')" />
  </div>
</template>
<script>
  export default {
    props: {},
    components: {},
    watch: {},
    validations() {
      return {}
    },
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="stylus">
</style>
