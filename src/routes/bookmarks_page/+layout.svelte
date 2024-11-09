<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import MainInput from '../../components/main_input/main_input.svelte';
</script>

<Toaster />

<div class="h-screen overflow-scroll">
	<slot />
	<MainInput />
</div>
