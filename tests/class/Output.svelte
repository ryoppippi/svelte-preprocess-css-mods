<script>
	const s = {
  success: "success_class-module-css-module-test",
  error: "error_class-module-css-module-test"
};
const s1 = {
  error: "error_style-module-css-module-test",
  successMessage: "success-message_style-module-css-module-test"
};
</script>

<div class={s.error}>
	hello
</div>

<div class={s.success}>
	world
</div>

<div class={s1.suceessMessage}>
  foo
</div>

<style>


.error_class-module-css-module-test {
  color: red;
}

.success_class-module-css-module-test {
  color: green;
}



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
