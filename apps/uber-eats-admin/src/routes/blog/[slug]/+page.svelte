<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data: any;
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>