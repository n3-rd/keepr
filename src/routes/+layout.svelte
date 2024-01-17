<script>
	import '../app.pcss';
	import { FirebaseApp } from 'sveltefire';
	import { initializeApp } from 'firebase/app';
	import { getFirestore } from 'firebase/firestore';
	import { getAuth } from 'firebase/auth';
	import { firebaseConfig } from '@/firebase';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	const app = initializeApp(firebaseConfig);
	const firestore = getFirestore(app);
	const auth = getAuth(app);

	const options = {
		reversed: true,
		intro: { y: 192 }
	};
</script>

<SvelteToast {options} />

{#if !firebaseConfig.projectId}
	<strong>Step 0</strong>
	Create a
	<a href="https://firebase.google.com/">Firebase Project</a>
	and paste your web config into
	<code>App.svelte</code>
	.
{/if}
<FirebaseApp {auth} {firestore}>
	<slot />
</FirebaseApp>
