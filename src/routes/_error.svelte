<script>
	export let status;
	export let error;
</script>

<style>
	.container {
		margin: 40px;
	}
</style>

<svelte:head>
	<title>ERROR - {status}</title>
</svelte:head>

{#if status === 404}
<div class="container">
	<article class="message is-warning">
		<div class="message-header">
			<p>Page not found :(</p>
		</div>
		<div class="message-body"><a href="/">Click here</a> to go back home</div>
	</article>
</div>
{/if}

{#if status != 404}
<div class="container">
	<article class="message is-danger">
		<div class="message-header">
			<p>ERROR</p>
		</div>
		<div class="message-body">{error.message}</div>
	</article>
</div>
{/if}