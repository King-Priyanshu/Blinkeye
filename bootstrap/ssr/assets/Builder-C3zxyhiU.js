import { watch, onBeforeUnmount, mergeProps, unref, useSSRContext, computed, ref, withCtx, createTextVNode, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, Fragment, renderList, vModelSelect, vModelCheckbox } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link as Link$1 } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./AdminLayout-D4Zb0PfS.js";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { ListBulletIcon, QueueListIcon, CodeBracketIcon, SparklesIcon } from "@heroicons/vue/20/solid";
import "@headlessui/vue";
import "@heroicons/vue/24/outline";
const _sfc_main$1 = {
  __name: "WysiwygEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        Link.configure({ openOnClick: false }),
        Image.configure({ inline: true }),
        Placeholder.configure({
          placeholder: "Start drafting your SEO template here..."
        })
      ],
      editorProps: {
        attributes: {
          class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4"
        }
      },
      onUpdate: () => {
        emit("update:modelValue", editor.value.getHTML());
      }
    });
    watch(() => props.modelValue, (val) => {
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
    __expose({ injectShortcode });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-medical-blue-600" }, _attrs))}>`);
      if (unref(editor)) {
        _push(`<div class="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2"><button type="button" class="${ssrRenderClass(["p-1.5 rounded hover:bg-gray-200 text-gray-700 font-bold", unref(editor).isActive("bold") ? "bg-gray-200" : ""])}"> B </button><button type="button" class="${ssrRenderClass(["p-1.5 rounded hover:bg-gray-200 text-gray-700 italic font-serif", unref(editor).isActive("italic") ? "bg-gray-200" : ""])}"> I </button><div class="w-px h-6 bg-gray-300 mx-1"></div><button type="button" class="${ssrRenderClass(["p-1.5 rounded hover:bg-gray-200 text-gray-700 font-semibold", unref(editor).isActive("heading", { level: 2 }) ? "bg-gray-200" : ""])}"> H2 </button><button type="button" class="${ssrRenderClass(["p-1.5 rounded hover:bg-gray-200 text-gray-700 font-medium", unref(editor).isActive("heading", { level: 3 }) ? "bg-gray-200" : ""])}"> H3 </button><div class="w-px h-6 bg-gray-300 mx-1"></div><button type="button" class="${ssrRenderClass(["p-1.5 rounded hover:bg-gray-200 text-gray-700", unref(editor).isActive("bulletList") ? "bg-gray-200" : ""])}">`);
        _push(ssrRenderComponent(unref(ListBulletIcon), { class: "h-4 w-4" }, null, _parent));
        _push(`</button><button type="button" class="${ssrRenderClass(["p-1.5 rounded hover:bg-gray-200 text-gray-700", unref(editor).isActive("orderedList") ? "bg-gray-200" : ""])}">`);
        _push(ssrRenderComponent(unref(QueueListIcon), { class: "h-4 w-4" }, null, _parent));
        _push(`</button><button type="button" class="${ssrRenderClass(["p-1.5 rounded hover:bg-gray-200 text-gray-700", unref(editor).isActive("blockquote") ? "bg-gray-200" : ""])}">`);
        _push(ssrRenderComponent(unref(CodeBracketIcon), { class: "h-4 w-4" }, null, _parent));
        _push(`</button><div class="flex-grow"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(EditorContent), {
        editor: unref(editor),
        class: "min-h-[300px]"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/WysiwygEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Builder",
  __ssrInlineRender: true,
  props: {
    template: {
      type: Object,
      default: null
    },
    groups: {
      type: Array,
      default: () => []
    },
    hospitals: {
      type: Array,
      default: () => []
    },
    locations: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const isEditing = computed(() => !!props.template);
    const form = useForm({
      title_template: props.template?.title_template || "",
      slug_template: props.template?.slug_template || "",
      content_template: props.template?.content_template || "",
      is_active: props.template?.is_active ?? true,
      hospital_id: props.template?.tenant_id || "",
      group_ids: props.template?.groups ? props.template.groups.map((g) => g.id) : []
    });
    const editorRef = ref(null);
    const selectedShortcode = ref("");
    const shortcodes = [
      { label: "Location Name (e.g., Mumbai)", value: "{{location.name}}" },
      { label: "Location Type (e.g., City)", value: "{{location.type}}" },
      { label: "Hospital Name", value: "{{hospital.name}}" },
      { label: "Hospital Phone", value: "{{hospital.phone}}" },
      { label: "Hospital Address", value: "{{hospital.address}}" },
      { label: "Disease Name", value: "{{disease.name}}" },
      { label: "Service Name", value: "{{service.name}}" },
      { label: "Current Year", value: "{{date.year}}" }
    ];
    const injectSelectedShortcode = () => {
      if (!selectedShortcode.value || !editorRef.value) return;
      editorRef.value.injectShortcode(selectedShortcode.value);
      selectedShortcode.value = "";
    };
    const updateSlug = () => {
      if (!form.slug_template && form.title_template) {
        form.slug_template = form.title_template.toLowerCase().replace(/[^a-z0-9{}]+/g, "-").replace(/(^-|-$)+/g, "");
      }
    };
    const generatedMatrix = computed(() => {
      if (!form.title_template || !form.slug_template || form.group_ids.length === 0 || !form.hospital_id) return [];
      let simulatedPages = [];
      const selectedHospital = props.hospitals.find((h) => h.id === form.hospital_id);
      const hostLocation = props.locations.find((l) => l.id === selectedHospital?.location_id);
      form.group_ids.forEach((groupId) => {
        const group = props.groups.find((g) => g.id === groupId);
        if (!group || !group.items) return;
        group.items.forEach((pivot) => {
          let slug = form.slug_template;
          let title = form.title_template;
          let baseName = "";
          if (pivot.item_type === "App\\Models\\Location") {
            const loc = props.locations.find((l) => l.id === pivot.item_id);
            baseName = loc ? loc.name : "Unknown Location";
            slug = slug.replace(/{{location\.slug}}/g, baseName.toLowerCase().replace(/\s+/g, "-"));
            title = title.replace(/{{location\.name}}/g, baseName);
          } else if (pivot.item_type === "App\\Models\\Service") {
            baseName = "Service Widget";
            slug = slug.replace(/{{service\.slug}}/g, baseName.toLowerCase().replace(/\s+/g, "-"));
            title = title.replace(/{{service\.name}}/g, baseName);
            if (hostLocation) {
              slug = slug.replace(/{{location\.slug}}/g, hostLocation.name.toLowerCase().replace(/\s+/g, "-"));
              title = title.replace(/{{location\.name}}/g, hostLocation.name);
            }
          } else if (pivot.item_type === "App\\Models\\Disease") {
            baseName = "Disease Widget";
            slug = slug.replace(/{{disease\.slug}}/g, baseName.toLowerCase().replace(/\s+/g, "-"));
            title = title.replace(/{{disease\.name}}/g, baseName);
            if (hostLocation) {
              slug = slug.replace(/{{location\.slug}}/g, hostLocation.name.toLowerCase().replace(/\s+/g, "-"));
              title = title.replace(/{{location\.name}}/g, hostLocation.name);
            }
          }
          slug = slug.replace(/{{[^}]+}}/g, "dynamic-field");
          title = title.replace(/{{[^}]+}}/g, "DynamicField");
          simulatedPages.push({
            title,
            url: `/${selectedHospital ? selectedHospital.domain : "domain.com"}/${slug}`,
            groupName: group.name
          });
        });
      });
      return simulatedPages;
    });
    const submit = () => {
      if (isEditing.value) {
        form.put(route("admin.templates.update", props.template.id));
      } else {
        form.post(route("admin.templates.store"));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: isEditing.value ? "Edit Template" : "New Template"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:flex sm:items-center"${_scopeId}><div class="sm:flex-auto"${_scopeId}><h1 class="text-base font-semibold leading-6 text-gray-900"${_scopeId}>${ssrInterpolate(isEditing.value ? "Edit Blog Template" : "Create Blog Template")}</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Write dynamic SEO content. Use shortcodes to automatically generate unique permutations across Taxonomy Groups.</p></div><div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-x-3"${_scopeId}><button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-medical-blue-600 shadow-sm ring-1 ring-inset ring-medical-blue-300 hover:bg-blue-50 transition-colors tooltip-trigger" title="Future capability: Generate content via AI" onclick="alert(&#39;AI Generation will be connected in Phase 4. Stay tuned!&#39;)"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(SparklesIcon), {
              class: "-ml-0.5 mr-1.5 h-4 w-4 text-medical-blue-500",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(` Auto Generate with AI </button>`);
            _push2(ssrRenderComponent(unref(Link$1), {
              href: _ctx.route("admin.templates.index"),
              class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Templates `);
                } else {
                  return [
                    createTextVNode(" Back to Templates ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-8 flex flex-col lg:flex-row gap-8"${_scopeId}><div class="flex-1"${_scopeId}><form id="template-builder" class="space-y-6"${_scopeId}><div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6 space-y-6"${_scopeId}><div${_scopeId}><label for="title_template" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>SEO Title Template <span class="text-red-500"${_scopeId}>*</span></label><div class="mt-2 text-sm text-gray-500 mb-1"${_scopeId}>e.g. &quot;Best {{service.name}} in {{location.name}} - Blink Eye Hospitals&quot;</div><input type="text" id="title_template"${ssrRenderAttr("value", unref(form).title_template)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required${_scopeId}>`);
            if (unref(form).errors.title_template) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.title_template)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="slug_template" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>URL Slug Pattern <span class="text-red-500"${_scopeId}>*</span></label><div class="mt-2 text-sm text-gray-500 mb-1"${_scopeId}>e.g. &quot;best-{{service.slug}}-in-{{location.slug}}&quot;</div><input type="text" id="slug_template"${ssrRenderAttr("value", unref(form).slug_template)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6 text-medical-blue-600 font-mono" required${_scopeId}>`);
            if (unref(form).errors.slug_template) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.slug_template)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><div class="flex items-center justify-between mb-2 mt-4"${_scopeId}><label class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Dynamic Content Body <span class="text-red-500"${_scopeId}>*</span></label><div class="flex items-center space-x-2 bg-blue-50 p-1.5 rounded-md border border-blue-200"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(SparklesIcon), { class: "h-4 w-4 text-blue-600" }, null, _parent2, _scopeId));
            _push2(`<select class="block w-48 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-xs text-xs"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(selectedShortcode.value) ? ssrLooseContain(selectedShortcode.value, "") : ssrLooseEqual(selectedShortcode.value, "")) ? " selected" : ""}${_scopeId}>Insert Dynamic Variable...</option><!--[-->`);
            ssrRenderList(shortcodes, (sc) => {
              _push2(`<option${ssrRenderAttr("value", sc.value)}${ssrIncludeBooleanAttr(Array.isArray(selectedShortcode.value) ? ssrLooseContain(selectedShortcode.value, sc.value) : ssrLooseEqual(selectedShortcode.value, sc.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(sc.label)}</option>`);
            });
            _push2(`<!--]--></select><button type="button"${ssrIncludeBooleanAttr(!selectedShortcode.value) ? " disabled" : ""} class="rounded bg-medical-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600 disabled:opacity-50"${_scopeId}> Insert </button></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              ref_key: "editorRef",
              ref: editorRef,
              modelValue: unref(form).content_template,
              "onUpdate:modelValue": ($event) => unref(form).content_template = $event
            }, null, _parent2, _scopeId));
            if (unref(form).errors.content_template) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.content_template)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></form></div><div class="lg:w-80 flex-shrink-0 space-y-6"${_scopeId}><div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-base font-semibold leading-6 text-gray-900 border-b border-gray-200 pb-2 mb-4"${_scopeId}>Ownership</h3>`);
            if (_ctx.$page.props.auth.user.role === "super_admin") {
              _push2(`<div class="mb-5"${_scopeId}><label for="hospital_id" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Hospital Branch</label><select id="hospital_id" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-medical-blue-600 sm:text-sm sm:leading-6"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).hospital_id) ? ssrLooseContain(unref(form).hospital_id, "") : ssrLooseEqual(unref(form).hospital_id, "")) ? " selected" : ""}${_scopeId}>-- Apply Globally --</option><!--[-->`);
              ssrRenderList(__props.hospitals, (h) => {
                _push2(`<option${ssrRenderAttr("value", h.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).hospital_id) ? ssrLooseContain(unref(form).hospital_id, h.id) : ssrLooseEqual(unref(form).hospital_id, h.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(h.name)}</option>`);
              });
              _push2(`<!--]--></select><p class="mt-2 text-xs text-gray-500"${_scopeId}>Attach this content funnel to a specific branch instead of all generic hospitals.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="relative flex items-start border-t border-gray-100 pt-4"${_scopeId}><div class="flex h-6 items-center"${_scopeId}><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600"${_scopeId}></div><div class="ml-3 text-sm leading-6"${_scopeId}><label for="is_active" class="font-medium text-gray-900"${_scopeId}>Active Template</label></div></div><button type="submit" form="template-builder"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="mt-6 w-full inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"${_scopeId}>${ssrInterpolate(isEditing.value ? "Update Template" : "Save & Publish Template")}</button></div><div class="bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-base font-semibold leading-6 text-gray-900 border-b border-gray-200 pb-2 mb-4"${_scopeId}>Target Audience Groups</h3><p class="text-xs text-gray-500 mb-4"${_scopeId}>Select the Taxonomy Groups this template should generate pages for. <br${_scopeId}><br${_scopeId}>If assigned to &quot;Tier 1 Cities&quot;, and that group has 5 cities, 5 unique pages will be generated.</p><div class="space-y-4 max-h-96 overflow-y-auto"${_scopeId}>`);
            if (__props.groups.length === 0) {
              _push2(`<div class="text-sm text-gray-500 italic"${_scopeId}>No taxonomy groups available. Create a Group first.</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.groups, (group) => {
              _push2(`<div class="relative flex items-start"${_scopeId}><div class="flex h-6 items-center"${_scopeId}><input${ssrRenderAttr("id", `group-${group.id}`)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).group_ids) ? ssrLooseContain(unref(form).group_ids, group.id) : unref(form).group_ids) ? " checked" : ""}${ssrRenderAttr("value", group.id)} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600"${_scopeId}></div><div class="ml-3 text-sm leading-6"${_scopeId}><label${ssrRenderAttr("for", `group-${group.id}`)} class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(group.name)}</label><span class="ml-1 inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600"${_scopeId}>${ssrInterpolate(group.type)}</span></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (unref(form).errors.group_ids) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.group_ids)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            if (generatedMatrix.value.length > 0) {
              _push2(`<div class="mt-8 max-w-7xl bg-white shadow sm:rounded-lg overflow-hidden"${_scopeId}><div class="bg-gradient-to-r from-medical-blue-50 to-indigo-50 px-4 py-5 sm:px-6 border-b border-gray-200"${_scopeId}><h3 class="text-base font-semibold leading-6 text-medical-blue-900 flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(SparklesIcon), { class: "h-5 w-5 mr-2 text-medical-blue-600" }, null, _parent2, _scopeId));
              _push2(` SEO Generation Matrix Simulator </h3><p class="mt-1 text-sm text-medical-blue-700"${_scopeId}>This template will automatically stamp out ${ssrInterpolate(generatedMatrix.value.length)} unique landing pages upon saving.</p></div><div class="px-4 py-5 sm:p-6 bg-slate-50 relative overflow-y-auto max-h-[400px]"${_scopeId}><ul role="list" class="divide-y divide-gray-200 bg-white rounded-md border border-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(generatedMatrix.value, (page, idx) => {
                _push2(`<li class="flex items-center justify-between gap-x-6 px-4 py-3 hover:bg-gray-50 transition-colors"${_scopeId}><div class="min-w-0"${_scopeId}><div class="flex items-start gap-x-3"${_scopeId}><p class="text-sm font-semibold leading-6 text-gray-900 truncate"${_scopeId}>${ssrInterpolate(page.title)}</p></div><div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"${_scopeId}><p class="truncate font-mono bg-gray-100 rounded px-1"${_scopeId}>${ssrInterpolate(page.url)}</p></div></div><div class="flex flex-none items-center gap-x-4"${_scopeId}><span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20"${_scopeId}>${ssrInterpolate(page.groupName)}</span></div></li>`);
              });
              _push2(`<!--]--></ul></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "sm:flex sm:items-center" }, [
                createVNode("div", { class: "sm:flex-auto" }, [
                  createVNode("h1", { class: "text-base font-semibold leading-6 text-gray-900" }, toDisplayString(isEditing.value ? "Edit Blog Template" : "Create Blog Template"), 1),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Write dynamic SEO content. Use shortcodes to automatically generate unique permutations across Taxonomy Groups.")
                ]),
                createVNode("div", { class: "mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-x-3" }, [
                  createVNode("button", {
                    type: "button",
                    class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-medical-blue-600 shadow-sm ring-1 ring-inset ring-medical-blue-300 hover:bg-blue-50 transition-colors tooltip-trigger",
                    title: "Future capability: Generate content via AI",
                    onclick: "alert('AI Generation will be connected in Phase 4. Stay tuned!')"
                  }, [
                    createVNode(unref(SparklesIcon), {
                      class: "-ml-0.5 mr-1.5 h-4 w-4 text-medical-blue-500",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Auto Generate with AI ")
                  ]),
                  createVNode(unref(Link$1), {
                    href: _ctx.route("admin.templates.index"),
                    class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Back to Templates ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ]),
              createVNode("div", { class: "mt-8 flex flex-col lg:flex-row gap-8" }, [
                createVNode("div", { class: "flex-1" }, [
                  createVNode("form", {
                    id: "template-builder",
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6 space-y-6" }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "title_template",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, [
                          createTextVNode("SEO Title Template "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("div", { class: "mt-2 text-sm text-gray-500 mb-1" }, 'e.g. "Best {{service.name}} in {{location.name}} - Blink Eye Hospitals"'),
                        withDirectives(createVNode("input", {
                          type: "text",
                          id: "title_template",
                          "onUpdate:modelValue": ($event) => unref(form).title_template = $event,
                          onBlur: updateSlug,
                          class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                          required: ""
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).title_template]
                        ]),
                        unref(form).errors.title_template ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.title_template), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "slug_template",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, [
                          createTextVNode("URL Slug Pattern "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode("div", { class: "mt-2 text-sm text-gray-500 mb-1" }, 'e.g. "best-{{service.slug}}-in-{{location.slug}}"'),
                        withDirectives(createVNode("input", {
                          type: "text",
                          id: "slug_template",
                          "onUpdate:modelValue": ($event) => unref(form).slug_template = $event,
                          class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6 text-medical-blue-600 font-mono",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).slug_template]
                        ]),
                        unref(form).errors.slug_template ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.slug_template), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "flex items-center justify-between mb-2 mt-4" }, [
                          createVNode("label", { class: "block text-sm font-medium leading-6 text-gray-900" }, [
                            createTextVNode("Dynamic Content Body "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          createVNode("div", { class: "flex items-center space-x-2 bg-blue-50 p-1.5 rounded-md border border-blue-200" }, [
                            createVNode(unref(SparklesIcon), { class: "h-4 w-4 text-blue-600" }),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => selectedShortcode.value = $event,
                              class: "block w-48 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-xs text-xs"
                            }, [
                              createVNode("option", {
                                value: "",
                                disabled: ""
                              }, "Insert Dynamic Variable..."),
                              (openBlock(), createBlock(Fragment, null, renderList(shortcodes, (sc) => {
                                return createVNode("option", {
                                  key: sc.value,
                                  value: sc.value
                                }, toDisplayString(sc.label), 9, ["value"]);
                              }), 64))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, selectedShortcode.value]
                            ]),
                            createVNode("button", {
                              type: "button",
                              onClick: injectSelectedShortcode,
                              disabled: !selectedShortcode.value,
                              class: "rounded bg-medical-blue-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600 disabled:opacity-50"
                            }, " Insert ", 8, ["disabled"])
                          ])
                        ]),
                        createVNode(_sfc_main$1, {
                          ref_key: "editorRef",
                          ref: editorRef,
                          modelValue: unref(form).content_template,
                          "onUpdate:modelValue": ($event) => unref(form).content_template = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        unref(form).errors.content_template ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.content_template), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ], 32)
                ]),
                createVNode("div", { class: "lg:w-80 flex-shrink-0 space-y-6" }, [
                  createVNode("div", { class: "bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6" }, [
                    createVNode("h3", { class: "text-base font-semibold leading-6 text-gray-900 border-b border-gray-200 pb-2 mb-4" }, "Ownership"),
                    _ctx.$page.props.auth.user.role === "super_admin" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-5"
                    }, [
                      createVNode("label", {
                        for: "hospital_id",
                        class: "block text-sm font-medium leading-6 text-gray-900"
                      }, "Hospital Branch"),
                      withDirectives(createVNode("select", {
                        id: "hospital_id",
                        "onUpdate:modelValue": ($event) => unref(form).hospital_id = $event,
                        class: "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-medical-blue-600 sm:text-sm sm:leading-6"
                      }, [
                        createVNode("option", { value: "" }, "-- Apply Globally --"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.hospitals, (h) => {
                          return openBlock(), createBlock("option", {
                            key: h.id,
                            value: h.id
                          }, toDisplayString(h.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).hospital_id]
                      ]),
                      createVNode("p", { class: "mt-2 text-xs text-gray-500" }, "Attach this content funnel to a specific branch instead of all generic hospitals.")
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "relative flex items-start border-t border-gray-100 pt-4" }, [
                      createVNode("div", { class: "flex h-6 items-center" }, [
                        withDirectives(createVNode("input", {
                          id: "is_active",
                          "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                          type: "checkbox",
                          class: "h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelCheckbox, unref(form).is_active]
                        ])
                      ]),
                      createVNode("div", { class: "ml-3 text-sm leading-6" }, [
                        createVNode("label", {
                          for: "is_active",
                          class: "font-medium text-gray-900"
                        }, "Active Template")
                      ])
                    ]),
                    createVNode("button", {
                      type: "submit",
                      form: "template-builder",
                      disabled: unref(form).processing,
                      class: "mt-6 w-full inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"
                    }, toDisplayString(isEditing.value ? "Update Template" : "Save & Publish Template"), 9, ["disabled"])
                  ]),
                  createVNode("div", { class: "bg-white shadow sm:rounded-lg px-4 py-5 sm:p-6" }, [
                    createVNode("h3", { class: "text-base font-semibold leading-6 text-gray-900 border-b border-gray-200 pb-2 mb-4" }, "Target Audience Groups"),
                    createVNode("p", { class: "text-xs text-gray-500 mb-4" }, [
                      createTextVNode("Select the Taxonomy Groups this template should generate pages for. "),
                      createVNode("br"),
                      createVNode("br"),
                      createTextVNode('If assigned to "Tier 1 Cities", and that group has 5 cities, 5 unique pages will be generated.')
                    ]),
                    createVNode("div", { class: "space-y-4 max-h-96 overflow-y-auto" }, [
                      __props.groups.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-sm text-gray-500 italic"
                      }, "No taxonomy groups available. Create a Group first.")) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.groups, (group) => {
                        return openBlock(), createBlock("div", {
                          key: group.id,
                          class: "relative flex items-start"
                        }, [
                          createVNode("div", { class: "flex h-6 items-center" }, [
                            withDirectives(createVNode("input", {
                              id: `group-${group.id}`,
                              "onUpdate:modelValue": ($event) => unref(form).group_ids = $event,
                              value: group.id,
                              type: "checkbox",
                              class: "h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600"
                            }, null, 8, ["id", "onUpdate:modelValue", "value"]), [
                              [vModelCheckbox, unref(form).group_ids]
                            ])
                          ]),
                          createVNode("div", { class: "ml-3 text-sm leading-6" }, [
                            createVNode("label", {
                              for: `group-${group.id}`,
                              class: "font-medium text-gray-900"
                            }, toDisplayString(group.name), 9, ["for"]),
                            createVNode("span", { class: "ml-1 inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600" }, toDisplayString(group.type), 1)
                          ])
                        ]);
                      }), 128))
                    ]),
                    unref(form).errors.group_ids ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-2 text-sm text-red-600"
                    }, toDisplayString(unref(form).errors.group_ids), 1)) : createCommentVNode("", true)
                  ])
                ])
              ]),
              generatedMatrix.value.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-8 max-w-7xl bg-white shadow sm:rounded-lg overflow-hidden"
              }, [
                createVNode("div", { class: "bg-gradient-to-r from-medical-blue-50 to-indigo-50 px-4 py-5 sm:px-6 border-b border-gray-200" }, [
                  createVNode("h3", { class: "text-base font-semibold leading-6 text-medical-blue-900 flex items-center" }, [
                    createVNode(unref(SparklesIcon), { class: "h-5 w-5 mr-2 text-medical-blue-600" }),
                    createTextVNode(" SEO Generation Matrix Simulator ")
                  ]),
                  createVNode("p", { class: "mt-1 text-sm text-medical-blue-700" }, "This template will automatically stamp out " + toDisplayString(generatedMatrix.value.length) + " unique landing pages upon saving.", 1)
                ]),
                createVNode("div", { class: "px-4 py-5 sm:p-6 bg-slate-50 relative overflow-y-auto max-h-[400px]" }, [
                  createVNode("ul", {
                    role: "list",
                    class: "divide-y divide-gray-200 bg-white rounded-md border border-gray-200"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(generatedMatrix.value, (page, idx) => {
                      return openBlock(), createBlock("li", {
                        key: idx,
                        class: "flex items-center justify-between gap-x-6 px-4 py-3 hover:bg-gray-50 transition-colors"
                      }, [
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("div", { class: "flex items-start gap-x-3" }, [
                            createVNode("p", { class: "text-sm font-semibold leading-6 text-gray-900 truncate" }, toDisplayString(page.title), 1)
                          ]),
                          createVNode("div", { class: "mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500" }, [
                            createVNode("p", { class: "truncate font-mono bg-gray-100 rounded px-1" }, toDisplayString(page.url), 1)
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-none items-center gap-x-4" }, [
                          createVNode("span", { class: "inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20" }, toDisplayString(page.groupName), 1)
                        ])
                      ]);
                    }), 128))
                  ])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Templates/Builder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
