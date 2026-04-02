import { computed, onMounted, ref, unref, withCtx, createTextVNode, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, vModelSelect, vModelCheckbox, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-D4Zb0PfS.js";
import { TrashIcon } from "@heroicons/vue/20/solid";
import "@headlessui/vue";
import "@heroicons/vue/24/outline";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    group: Object,
    locations: Array,
    diseases: Array,
    services: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.group.name,
      type: props.group.type,
      is_active: props.group.is_active,
      items: []
    });
    const availableOptions = computed(() => {
      switch (form.type) {
        case "Location":
          return props.locations || [];
        case "Disease":
          return props.diseases || [];
        case "Service":
          return props.services || [];
        default:
          return [];
      }
    });
    const itemTypeMap = {
      "Location": "App\\Models\\Location",
      "Disease": "App\\Models\\Disease",
      "Service": "App\\Models\\Service"
    };
    onMounted(() => {
      if (props.group.items && props.group.items.length > 0) {
        props.group.items.forEach((pivot) => {
          const opt = availableOptions.value.find((o) => o.id === pivot.item_id);
          if (opt) {
            form.items.push({
              item_id: pivot.item_id,
              item_type: pivot.item_type,
              _display_name: opt.name
            });
          }
        });
      }
    });
    const selectedItemToAdd = ref("");
    const addItem = () => {
      if (!selectedItemToAdd.value) return;
      if (form.items.some((i) => i.item_id === selectedItemToAdd.value.id)) {
        selectedItemToAdd.value = "";
        return;
      }
      form.items.push({
        item_id: selectedItemToAdd.value.id,
        item_type: itemTypeMap[form.type],
        _display_name: selectedItemToAdd.value.name
      });
      selectedItemToAdd.value = "";
    };
    const removeItem = (index) => {
      form.items.splice(index, 1);
    };
    const onTypeChange = () => {
      if (confirm("Changing the Entity Type will clear all currently assigned entities. Continue?")) {
        form.items = [];
        selectedItemToAdd.value = "";
      } else {
        form.type = props.group.type;
      }
    };
    const submit = () => {
      form.put(route("admin.groups.update", props.group.id));
    };
    const generatedPagesPreview = computed(() => {
      if (!props.group.blogs || props.group.blogs.length === 0 || form.items.length === 0) return [];
      let pages = [];
      props.group.blogs.forEach((template) => {
        form.items.forEach((item) => {
          let slug = template.slug_template;
          let title = template.title_template;
          const tokenName = item.item_type.split("\\").pop().toLowerCase();
          const safeName = item._display_name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          slug = slug.replace(new RegExp(`{{${tokenName}.slug}}`, "g"), safeName).replace(new RegExp(`{{${tokenName}.name}}`, "g"), safeName).replace(new RegExp(`{{location.slug}}`, "g"), safeName);
          title = title.replace(new RegExp(`{{${tokenName}.name}}`, "g"), item._display_name).replace(new RegExp(`{{location.name}}`, "g"), item._display_name);
          pages.push({
            template_name: template.title_template,
            generated_slug: slug,
            generated_title: title,
            status: template.is_active ? "Active" : "Draft"
          });
        });
      });
      return pages;
    });
    const destroy = () => {
      if (confirm("Are you absolutely sure you want to delete this group? Any Blog content linked to this group may become inaccessible.")) {
        form.delete(route("admin.groups.destroy", props.group.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Edit Taxonomy Group" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:flex sm:items-center"${_scopeId}><div class="sm:flex-auto"${_scopeId}><h1 class="text-base font-semibold leading-6 text-gray-900"${_scopeId}>Edit Group: ${ssrInterpolate(__props.group.name)}</h1></div><div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.groups.index"),
              class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back `);
                } else {
                  return [
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TrashIcon), { class: "h-4 w-4 mr-1" }, null, _parent2, _scopeId));
            _push2(` Delete </button></div></div><div class="mt-8 max-w-3xl bg-white shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-8"${_scopeId}><div class="sm:col-span-4"${_scopeId}><label for="name" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Group Name</label><div class="mt-2 text-sm text-gray-500 mb-1"${_scopeId}>e.g. &quot;Top Tier Cities&quot; or &quot;Laser Operations&quot;</div><div class="mt-1"${_scopeId}><input type="text" id="name"${ssrRenderAttr("value", unref(form).name)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required${_scopeId}></div>`);
            if (unref(form).errors.name) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-2"${_scopeId}><label for="type" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Entity Type</label><div class="mt-1 mt-6 sm:mt-0"${_scopeId}><select id="type" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required${_scopeId}><option value="Location"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "Location") : ssrLooseEqual(unref(form).type, "Location")) ? " selected" : ""}${_scopeId}>Locations</option><option value="Disease"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "Disease") : ssrLooseEqual(unref(form).type, "Disease")) ? " selected" : ""}${_scopeId}>Diseases</option><option value="Service"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "Service") : ssrLooseEqual(unref(form).type, "Service")) ? " selected" : ""}${_scopeId}>Services</option></select></div>`);
            if (unref(form).errors.type) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-6"${_scopeId}><div class="relative flex items-start"${_scopeId}><div class="flex h-6 items-center"${_scopeId}><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600"${_scopeId}></div><div class="ml-3 text-sm leading-6"${_scopeId}><label for="is_active" class="font-medium text-gray-900"${_scopeId}>Active</label><p class="text-gray-500"${_scopeId}>Enable this group to be used in dynamic blog templates.</p></div></div></div></div><div class="pt-4"${_scopeId}><h3 class="text-base font-semibold leading-6 text-gray-900 mb-4"${_scopeId}>Add Entities to Group</h3><div class="flex items-center space-x-3 mb-6"${_scopeId}><select class="block w-full max-w-sm rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(selectedItemToAdd.value) ? ssrLooseContain(selectedItemToAdd.value, "") : ssrLooseEqual(selectedItemToAdd.value, "")) ? " selected" : ""}${_scopeId}>-- Select ${ssrInterpolate(unref(form).type)} to Add --</option><!--[-->`);
            ssrRenderList(availableOptions.value, (opt) => {
              _push2(`<option${ssrRenderAttr("value", opt)}${ssrIncludeBooleanAttr(Array.isArray(selectedItemToAdd.value) ? ssrLooseContain(selectedItemToAdd.value, opt) : ssrLooseEqual(selectedItemToAdd.value, opt)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(opt.name)} ${ssrInterpolate(opt.type ? `(${opt.type})` : "")}</option>`);
            });
            _push2(`<!--]--></select><button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"${_scopeId}> Add </button></div>`);
            if (unref(form).items.length === 0) {
              _push2(`<div class="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>No ${ssrInterpolate(unref(form).type)}s added to this group yet.</p></div>`);
            } else {
              _push2(`<div class="border border-gray-200 rounded-md overflow-hidden"${_scopeId}><ul role="list" class="divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).items, (item, index) => {
                _push2(`<li class="flex items-center justify-between py-3 pl-4 pr-5 text-sm leading-6 hover:bg-gray-50 bg-white shadow-sm"${_scopeId}><div class="flex w-0 flex-1 items-center"${_scopeId}><div class="ml-4 flex min-w-0 flex-1 gap-2"${_scopeId}><span class="truncate font-medium text-gray-900"${_scopeId}>${ssrInterpolate(item._display_name)}</span><span class="flex-shrink-0 text-gray-400"${_scopeId}>ID: ${ssrInterpolate(item.item_id)}</span></div></div><div class="ml-4 flex-shrink-0"${_scopeId}><button type="button" class="font-medium text-red-600 hover:text-red-500 flex items-center"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(TrashIcon), { class: "h-4 w-4 mr-1" }, null, _parent2, _scopeId));
                _push2(` Remove </button></div></li>`);
              });
              _push2(`<!--]--></ul></div>`);
            }
            if (unref(form).errors.items) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.items)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.groups.index"),
              class: "text-sm font-semibold leading-6 text-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cancel`);
                } else {
                  return [
                    createTextVNode("Cancel")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"${_scopeId}> Update Group </button></div></form></div></div><div class="mt-8 max-w-5xl bg-white shadow sm:rounded-lg overflow-hidden"${_scopeId}><div class="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center"${_scopeId}><div${_scopeId}><h3 class="text-base font-semibold leading-6 text-gray-900"${_scopeId}>SEO Page Generation Matrix</h3><p class="mt-1 max-w-2xl text-sm text-gray-500"${_scopeId}> Live preview of the blog pages that will be automatically generated for this taxonomy group based on assigned Templates. </p></div><div class="text-sm font-semibold text-medical-blue-600"${_scopeId}> Total Pages: ${ssrInterpolate(generatedPagesPreview.value.length)}</div></div><div class="px-4 py-5 sm:px-6"${_scopeId}>`);
            if (generatedPagesPreview.value.length === 0) {
              _push2(`<div class="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Add entities to this group and assign Blog Templates to see the generation matrix.</p></div>`);
            } else {
              _push2(`<table class="min-w-full divide-y divide-gray-300"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"${_scopeId}>Generated URL Slug</th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"${_scopeId}>Compiled Title</th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"${_scopeId}>Source Template</th><th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"${_scopeId}>Status</th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"${_scopeId}><!--[-->`);
              ssrRenderList(generatedPagesPreview.value, (page, idx) => {
                _push2(`<tr${_scopeId}><td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-medical-blue-600 sm:pl-6"${_scopeId}> /blog/${ssrInterpolate(page.generated_slug)}</td><td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(page.generated_title)}</td><td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"${_scopeId}><span class="truncate block max-w-xs"${_scopeId}>${ssrInterpolate(page.template_name)}</span></td><td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"${_scopeId}><span class="${ssrRenderClass([page.status === "Active" ? "text-green-700 bg-green-50 ring-green-600/20" : "text-gray-600 bg-gray-50 ring-gray-500/10", "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"])}"${_scopeId}>${ssrInterpolate(page.status)}</span></td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "sm:flex sm:items-center" }, [
                createVNode("div", { class: "sm:flex-auto" }, [
                  createVNode("h1", { class: "text-base font-semibold leading-6 text-gray-900" }, "Edit Group: " + toDisplayString(__props.group.name), 1)
                ]),
                createVNode("div", { class: "mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center space-x-4" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.groups.index"),
                    class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Back ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode("button", {
                    onClick: destroy,
                    class: "inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                  }, [
                    createVNode(unref(TrashIcon), { class: "h-4 w-4 mr-1" }),
                    createTextVNode(" Delete ")
                  ])
                ])
              ]),
              createVNode("div", { class: "mt-8 max-w-3xl bg-white shadow sm:rounded-lg" }, [
                createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-8" }, [
                      createVNode("div", { class: "sm:col-span-4" }, [
                        createVNode("label", {
                          for: "name",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Group Name"),
                        createVNode("div", { class: "mt-2 text-sm text-gray-500 mb-1" }, 'e.g. "Top Tier Cities" or "Laser Operations"'),
                        createVNode("div", { class: "mt-1" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "name",
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ])
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-2" }, [
                        createVNode("label", {
                          for: "type",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Entity Type"),
                        createVNode("div", { class: "mt-1 mt-6 sm:mt-0" }, [
                          withDirectives(createVNode("select", {
                            id: "type",
                            "onUpdate:modelValue": ($event) => unref(form).type = $event,
                            onChange: onTypeChange,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            required: ""
                          }, [
                            createVNode("option", { value: "Location" }, "Locations"),
                            createVNode("option", { value: "Disease" }, "Diseases"),
                            createVNode("option", { value: "Service" }, "Services")
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).type]
                          ])
                        ]),
                        unref(form).errors.type ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.type), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-6" }, [
                        createVNode("div", { class: "relative flex items-start" }, [
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
                            }, "Active"),
                            createVNode("p", { class: "text-gray-500" }, "Enable this group to be used in dynamic blog templates.")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "pt-4" }, [
                      createVNode("h3", { class: "text-base font-semibold leading-6 text-gray-900 mb-4" }, "Add Entities to Group"),
                      createVNode("div", { class: "flex items-center space-x-3 mb-6" }, [
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedItemToAdd.value = $event,
                          class: "block w-full max-w-sm rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "-- Select " + toDisplayString(unref(form).type) + " to Add --", 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(availableOptions.value, (opt) => {
                            return openBlock(), createBlock("option", {
                              key: opt.id,
                              value: opt
                            }, toDisplayString(opt.name) + " " + toDisplayString(opt.type ? `(${opt.type})` : ""), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedItemToAdd.value]
                        ]),
                        createVNode("button", {
                          type: "button",
                          onClick: addItem,
                          class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        }, " Add ")
                      ]),
                      unref(form).items.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center p-6 border-2 border-dashed border-gray-300 rounded-lg"
                      }, [
                        createVNode("p", { class: "text-sm text-gray-500" }, "No " + toDisplayString(unref(form).type) + "s added to this group yet.", 1)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "border border-gray-200 rounded-md overflow-hidden"
                      }, [
                        createVNode("ul", {
                          role: "list",
                          class: "divide-y divide-gray-200"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).items, (item, index) => {
                            return openBlock(), createBlock("li", {
                              key: index,
                              class: "flex items-center justify-between py-3 pl-4 pr-5 text-sm leading-6 hover:bg-gray-50 bg-white shadow-sm"
                            }, [
                              createVNode("div", { class: "flex w-0 flex-1 items-center" }, [
                                createVNode("div", { class: "ml-4 flex min-w-0 flex-1 gap-2" }, [
                                  createVNode("span", { class: "truncate font-medium text-gray-900" }, toDisplayString(item._display_name), 1),
                                  createVNode("span", { class: "flex-shrink-0 text-gray-400" }, "ID: " + toDisplayString(item.item_id), 1)
                                ])
                              ]),
                              createVNode("div", { class: "ml-4 flex-shrink-0" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeItem(index),
                                  class: "font-medium text-red-600 hover:text-red-500 flex items-center"
                                }, [
                                  createVNode(unref(TrashIcon), { class: "h-4 w-4 mr-1" }),
                                  createTextVNode(" Remove ")
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])),
                      unref(form).errors.items ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "mt-2 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.items), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.groups.index"),
                        class: "text-sm font-semibold leading-6 text-gray-900"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"
                      }, " Update Group ", 8, ["disabled"])
                    ])
                  ], 32)
                ])
              ]),
              createVNode("div", { class: "mt-8 max-w-5xl bg-white shadow sm:rounded-lg overflow-hidden" }, [
                createVNode("div", { class: "px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center" }, [
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-base font-semibold leading-6 text-gray-900" }, "SEO Page Generation Matrix"),
                    createVNode("p", { class: "mt-1 max-w-2xl text-sm text-gray-500" }, " Live preview of the blog pages that will be automatically generated for this taxonomy group based on assigned Templates. ")
                  ]),
                  createVNode("div", { class: "text-sm font-semibold text-medical-blue-600" }, " Total Pages: " + toDisplayString(generatedPagesPreview.value.length), 1)
                ]),
                createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                  generatedPagesPreview.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center p-6 border-2 border-dashed border-gray-300 rounded-lg"
                  }, [
                    createVNode("p", { class: "text-sm text-gray-500" }, "Add entities to this group and assign Blog Templates to see the generation matrix.")
                  ])) : (openBlock(), createBlock("table", {
                    key: 1,
                    class: "min-w-full divide-y divide-gray-300"
                  }, [
                    createVNode("thead", { class: "bg-gray-50" }, [
                      createVNode("tr", null, [
                        createVNode("th", {
                          scope: "col",
                          class: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        }, "Generated URL Slug"),
                        createVNode("th", {
                          scope: "col",
                          class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        }, "Compiled Title"),
                        createVNode("th", {
                          scope: "col",
                          class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        }, "Source Template"),
                        createVNode("th", {
                          scope: "col",
                          class: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        }, "Status")
                      ])
                    ]),
                    createVNode("tbody", { class: "divide-y divide-gray-200 bg-white" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(generatedPagesPreview.value, (page, idx) => {
                        return openBlock(), createBlock("tr", { key: idx }, [
                          createVNode("td", { class: "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-medical-blue-600 sm:pl-6" }, " /blog/" + toDisplayString(page.generated_slug), 1),
                          createVNode("td", { class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500" }, toDisplayString(page.generated_title), 1),
                          createVNode("td", { class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500" }, [
                            createVNode("span", { class: "truncate block max-w-xs" }, toDisplayString(page.template_name), 1)
                          ]),
                          createVNode("td", { class: "whitespace-nowrap px-3 py-4 text-sm text-gray-500" }, [
                            createVNode("span", {
                              class: [page.status === "Active" ? "text-green-700 bg-green-50 ring-green-600/20" : "text-gray-600 bg-gray-50 ring-gray-500/10", "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"]
                            }, toDisplayString(page.status), 3)
                          ])
                        ]);
                      }), 128))
                    ])
                  ]))
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Groups/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
