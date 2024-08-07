<script>
	const s = {
  error: "error_style-module-css-module-test",
  "success-message": "success-message_style-module-css-module-test"
};
</script>

<div class={s['success-message']}>
	hello
</div>


<style>


section {
  padding: 10px;
}

.error_style-module-css-module-test {
  color: red;
}

.success-message_style-module-css-module-test {
  color: green;
}

</style>
