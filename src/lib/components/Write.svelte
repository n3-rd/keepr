<script lang="ts">
	import { marked } from 'marked';
	import { Textarea } from '$lib/components/ui/textarea';
	import '@github/markdown-toolbar-element';
	import dayjs from 'dayjs';
	import {
		Heading,
		Bold,
		Italic,
		Quote,
		Code,
		Link,
		Image,
		List,
		ListOrdered,
		AtSign,
		Hash,
		Strikethrough,
		Send
	} from 'lucide-svelte';
	import {
		saveArticleToLocalStorage,
		type date,
		saveCurrentArticleToLocalStorage,
		type article,
		determineNextID
	} from '@/helpers/tools';
	import Input from './ui/input/input.svelte';
	import { onMount } from 'svelte';
	import Button from './ui/button/button.svelte';
	let text: string = ``;
	let source: string = ``;
	let title: string = ``;

	let today: date = {
		day: dayjs().get('date'),
		month: dayjs().get('month'),
		year: dayjs().get('year')
	};

	let article: article;

	$: {
		source = text;
		article = {
			title: title,
			content: source,
			date: today,
			id: determineNextID()
		};
	}

	console.log(dayjs().get('date'));

	function handleKeydown(event: KeyboardEvent) {
		console.log(article);
		saveCurrentArticleToLocalStorage(article);
	}

	onMount(() => {
		const localArticle = localStorage.getItem('n3rd.diary.currentArticle');
		if (localArticle) {
			const parsedArticle = JSON.parse(localArticle);
			text = parsedArticle.content;
			title = parsedArticle.title;
		}
	});
</script>

<div class="flex h-screen w-screen overflow-hidden">
	<div class="editor flex w-1/2 flex-col gap-3">
		<div class="toolbar flex w-full items-center justify-between">
			<markdown-toolbar for="editor">
				<md-bold><Bold class="inline cursor-pointer" /></md-bold>
				<md-header><Heading class="inline cursor-pointer" /></md-header>
				<md-italic><Italic class="inline cursor-pointer" /></md-italic>
				<md-quote><Quote class="inline cursor-pointer" /></md-quote>
				<md-code><Code class="inline cursor-pointer" /></md-code>
				<md-link><Link class="inline cursor-pointer" /></md-link>
				<md-image><Image class="inline cursor-pointer" /></md-image>
				<md-unordered-list><List class="inline cursor-pointer" /></md-unordered-list>
				<md-ordered-list><ListOrdered class="inline cursor-pointer" /></md-ordered-list>
				<md-mention><AtSign class="inline cursor-pointer" /></md-mention>
				<md-ref><Hash class="inline cursor-pointer" /></md-ref>
				<md-strikethrough><Strikethrough class="inline cursor-pointer" /></md-strikethrough>
			</markdown-toolbar>

			<Button
				class="rounded-full bg-secondary-500 text-white"
				on:click={() => {
					saveArticleToLocalStorage(article);
					title = '';
					text = '';
				}}
				>Save
				<Send class="ml-2 inline" />
			</Button>
		</div>
		<Input bind:value={title} placeholder="Title" class="text-2xl" on:keyup={handleKeydown} />
		<Textarea
			class="h-[80vh]"
			id="editor"
			bind:value={text}
			placeholder="Enter markdown here"
			on:keyup={handleKeydown}
		/>
	</div>
	<div class="viewer h-screen w-1/2 overflow-hidden">
		<div class="preview h-full overflow-auto px-6">{@html marked(source)}</div>
	</div>
</div>

<style>
	:global(.preview *) {
		all: initial;
	}

	:global(.preview h1, .preview h2, .preview h3, .preview h4, .preview h5, .preview h6) {
		display: block;
		font-family: sans-serif;
		font-weight: 700;
		margin: 1rem 0;
	}

	:global(.preview h1) {
		font-size: 3rem;
	}

	:global(.preview h2) {
		font-size: 2rem;
	}

	:global(.preview h3) {
		font-size: 1.5rem;
	}

	:global(.preview h4) {
		font-size: 1.25rem;
	}

	:global(.preview h5) {
		font-size: 1rem;
	}

	:global(.preview h6) {
		font-size: 0.875rem;
	}

	:global(.preview p) {
		font-size: 1rem;
		line-height: 1.5;
		color: #333;
		display: block;
		white-space: pre-wrap;
	}

	:global(.preview a) {
		color: #1a0dab;
		text-decoration: none;
		display: inline;
	}

	:global(.preview a:hover) {
		text-decoration: underline;
	}

	:global(.preview img) {
		max-width: 100%;
		height: auto;
		display: inline-block;
	}

	:global(.preview ul, .preview ol) {
		padding-left: 2rem;
		display: block;
	}

	:global(.preview li) {
		margin-bottom: 0.5rem;
		display: list-item;
	}

	:global(.preview blockquote) {
		margin: 1rem 0;
		padding-left: 1.5rem;
		border-left: 4px solid #ccc;
		color: #666;
		display: block;
	}

	:global(.preview u) {
		text-decoration: underline;
	}
	:global(.preview i, .preview em) {
		font-style: italic;
	}
</style>
