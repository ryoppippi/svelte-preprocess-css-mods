<script>
	const s = {
  error: "error_class-module-css-module-test",
  success: "success_class-module-css-module-test"
};
</script>

<div class={s.error}>
	hello
</div>

<div class={s.success}>
	world
</div>

<style>


.error_class-module-css-module-test {
  color: red;
}

.success_class-module-css-module-test {
  color: green;
}

</style>
