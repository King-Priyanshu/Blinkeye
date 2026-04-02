<script setup>
import { watch, onBeforeUnmount } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import {
    ListBulletIcon,
    QueueListIcon,
    CodeBracketIcon,
} from '@heroicons/vue/20/solid';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        Link.configure({ openOnClick: false }),
        Image.configure({ inline: true }),
        Placeholder.configure({
            placeholder: 'Start drafting your SEO template here...',
        }),
    ],
    editorProps: {
        attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4',
        },
    },
    onUpdate: () => {
        emit('update:modelValue', editor.value.getHTML());
    },
});

watch(() => props.modelValue, (val) => {
    // Check if the update is from external override, not the editor itself
    if (editor.value && editor.value.getHTML() !== val) {
        editor.value.commands.setContent(val, false);
    }
});

onBeforeUnmount(() => {
    if (editor.value) {
        editor.value.destroy();
    }
});

const injectShortcode = (shortcode) => {
    if (editor.value) {
        editor.value.chain().focus().insertContent(shortcode).run();
    }
};

defineExpose({ injectShortcode });
</script>

<template>
    <div class="border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-medical-blue-600">
        <!-- Toolbar -->
        <div v-if="editor" class="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
            <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="[ 'p-1.5 rounded hover:bg-gray-200 text-gray-700 font-bold', editor.isActive('bold') ? 'bg-gray-200' : '' ]">
                B
            </button>
            <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="[ 'p-1.5 rounded hover:bg-gray-200 text-gray-700 italic font-serif', editor.isActive('italic') ? 'bg-gray-200' : '' ]">
                I
            </button>
            <div class="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="[ 'p-1.5 rounded hover:bg-gray-200 text-gray-700 font-semibold', editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : '' ]">
                H2
            </button>
            <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="[ 'p-1.5 rounded hover:bg-gray-200 text-gray-700 font-medium', editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : '' ]">
                H3
            </button>
            <div class="w-px h-6 bg-gray-300 mx-1"></div>
            <button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="[ 'p-1.5 rounded hover:bg-gray-200 text-gray-700', editor.isActive('bulletList') ? 'bg-gray-200' : '' ]">
                <ListBulletIcon class="h-4 w-4" />
            </button>
            <button type="button" @click="editor.chain().focus().toggleOrderedList().run()" :class="[ 'p-1.5 rounded hover:bg-gray-200 text-gray-700', editor.isActive('orderedList') ? 'bg-gray-200' : '' ]">
                <QueueListIcon class="h-4 w-4" />
            </button>
            <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" :class="[ 'p-1.5 rounded hover:bg-gray-200 text-gray-700', editor.isActive('blockquote') ? 'bg-gray-200' : '' ]">
                <CodeBracketIcon class="h-4 w-4" />
            </button>

            <div class="flex-grow"></div>
        </div>

        <!-- Editor Area -->
        <editor-content :editor="editor" class="min-h-[300px]" />
    </div>
</template>

<style>
/* Tiptap Tailwind Prose Fixes */
.ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #9ca3af; /* text-gray-400 */
    pointer-events: none;
    height: 0;
}
.ProseMirror:focus {
    outline: none;
}
</style>
