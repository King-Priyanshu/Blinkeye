import { computed, ref, unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, vModelSelect, vModelCheckbox, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-D4Zb0PfS.js";
import { TrashIcon } from "@heroicons/vue/20/solid";
import "@headlessui/vue";
import "@heroicons/vue/24/outline";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    locations: Array,
    diseases: Array,
    services: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: "",
      type: "Location",
      is_active: true,
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
      form.items = [];
      selectedItemToAdd.value = "";
    };
    const submit = () => {
      form.post(route("admin.groups.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Create Taxonomy Group" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:flex sm:items-center"${_scopeId}><div class="sm:flex-auto"${_scopeId}><h1 class="text-base font-semibold leading-6 text-gray-900"${_scopeId}>Create Taxonomy Group</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Cluster entities together to create dynamic SEO landing pages or lead segments.</p></div><div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.groups.index"),
              class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to List `);
                } else {
                  return [
                    createTextVNode(" Back to List ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-8 max-w-3xl bg-white shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-gray-900/10 pb-8"${_scopeId}><div class="sm:col-span-4"${_scopeId}><label for="name" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Group Name</label><div class="mt-2 text-sm text-gray-500 mb-1"${_scopeId}>e.g. &quot;Top Tier Cities&quot; or &quot;Laser Operations&quot;</div><div class="mt-1"${_scopeId}><input type="text" id="name"${ssrRenderAttr("value", unref(form).name)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required${_scopeId}></div>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"${_scopeId}> Save Group </button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sm:flex sm:items-center" }, [
                createVNode("div", { class: "sm:flex-auto" }, [
                  createVNode("h1", { class: "text-base font-semibold leading-6 text-gray-900" }, "Create Taxonomy Group"),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Cluster entities together to create dynamic SEO landing pages or lead segments.")
                ]),
                createVNode("div", { class: "mt-4 sm:ml-16 sm:mt-0 sm:flex-none" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.groups.index"),
                    class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Back to List ")
                    ]),
                    _: 1
                  }, 8, ["href"])
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
                      }, " Save Group ", 8, ["disabled"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Groups/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
