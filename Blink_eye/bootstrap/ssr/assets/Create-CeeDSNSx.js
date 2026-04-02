import { ref, unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-D4Zb0PfS.js";
import "@headlessui/vue";
import "@heroicons/vue/24/outline";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      slug: "",
      description: "",
      is_active: true,
      image: null
    });
    const previewImage = ref(null);
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      form.image = file;
      if (file) {
        previewImage.value = URL.createObjectURL(file);
      } else {
        previewImage.value = null;
      }
    };
    const submit = () => {
      form.post(route("admin.services.store"));
    };
    const updateSlug = () => {
      if (!form.slug && form.name) {
        form.slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Add Hospital Service" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:flex sm:items-center"${_scopeId}><div class="sm:flex-auto"${_scopeId}><h1 class="text-base font-semibold leading-6 text-gray-900"${_scopeId}>Add Clinical Service</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Define a new treatment or procedure taxonomy context.</p></div><div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.services.index"),
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
            _push2(`</div></div><div class="mt-8 max-w-2xl bg-white shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"${_scopeId}><div class="sm:col-span-6"${_scopeId}><label for="name" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Service Name</label><div class="mt-2"${_scopeId}><input type="text" id="name"${ssrRenderAttr("value", unref(form).name)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required placeholder="e.g. LASIK Eye Surgery"${_scopeId}></div>`);
            if (unref(form).errors.name) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-6"${_scopeId}><label for="slug" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>URL Slug</label><div class="mt-2 text-sm text-gray-500 mb-1"${_scopeId}>How this appears in URLs: blinkeye.in/treatment/<span class="font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(form).slug || "slug")}</span></div><div class="mt-1"${_scopeId}><input type="text" id="slug"${ssrRenderAttr("value", unref(form).slug)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required${_scopeId}></div>`);
            if (unref(form).errors.slug) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.slug)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-6"${_scopeId}><label for="description" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Internal Description / Notes</label><div class="mt-2"${_scopeId}><textarea id="description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div>`);
            if (unref(form).errors.description) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-6"${_scopeId}><label for="image" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Featured Image</label><div class="mt-2 flex items-center gap-x-4"${_scopeId}>`);
            if (previewImage.value) {
              _push2(`<img${ssrRenderAttr("src", previewImage.value)} alt="Preview" class="h-16 w-16 object-cover rounded-md shadow-sm"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex-1"${_scopeId}><input type="file" id="image" accept="image/*" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-medical-blue-50 file:text-medical-blue-700 hover:file:bg-medical-blue-100"${_scopeId}></div></div>`);
            if (unref(form).errors.image) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.image)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-6"${_scopeId}><div class="relative flex items-start"${_scopeId}><div class="flex h-6 items-center"${_scopeId}><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600"${_scopeId}></div><div class="ml-3 text-sm leading-6"${_scopeId}><label for="is_active" class="font-medium text-gray-900"${_scopeId}>Active</label><p class="text-gray-500"${_scopeId}>Should this entity be available for blog templates and lead tracking?</p></div></div></div></div><div class="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.services.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"${_scopeId}> Save Service </button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sm:flex sm:items-center" }, [
                createVNode("div", { class: "sm:flex-auto" }, [
                  createVNode("h1", { class: "text-base font-semibold leading-6 text-gray-900" }, "Add Clinical Service"),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Define a new treatment or procedure taxonomy context.")
                ]),
                createVNode("div", { class: "mt-4 sm:ml-16 sm:mt-0 sm:flex-none" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.services.index"),
                    class: "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Back to List ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ]),
              createVNode("div", { class: "mt-8 max-w-2xl bg-white shadow sm:rounded-lg" }, [
                createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" }, [
                      createVNode("div", { class: "sm:col-span-6" }, [
                        createVNode("label", {
                          for: "name",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Service Name"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "name",
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            onBlur: updateSlug,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            required: "",
                            placeholder: "e.g. LASIK Eye Surgery"
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ])
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-6" }, [
                        createVNode("label", {
                          for: "slug",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "URL Slug"),
                        createVNode("div", { class: "mt-2 text-sm text-gray-500 mb-1" }, [
                          createTextVNode("How this appears in URLs: blinkeye.in/treatment/"),
                          createVNode("span", { class: "font-bold text-gray-900" }, toDisplayString(unref(form).slug || "slug"), 1)
                        ]),
                        createVNode("div", { class: "mt-1" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "slug",
                            "onUpdate:modelValue": ($event) => unref(form).slug = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).slug]
                          ])
                        ]),
                        unref(form).errors.slug ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.slug), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-6" }, [
                        createVNode("label", {
                          for: "description",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Internal Description / Notes"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "3",
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ])
                        ]),
                        unref(form).errors.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-6" }, [
                        createVNode("label", {
                          for: "image",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Featured Image"),
                        createVNode("div", { class: "mt-2 flex items-center gap-x-4" }, [
                          previewImage.value ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: previewImage.value,
                            alt: "Preview",
                            class: "h-16 w-16 object-cover rounded-md shadow-sm"
                          }, null, 8, ["src"])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode("input", {
                              type: "file",
                              id: "image",
                              onChange: handleImageChange,
                              accept: "image/*",
                              class: "block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-medical-blue-50 file:text-medical-blue-700 hover:file:bg-medical-blue-100"
                            }, null, 32)
                          ])
                        ]),
                        unref(form).errors.image ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.image), 1)) : createCommentVNode("", true)
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
                            createVNode("p", { class: "text-gray-500" }, "Should this entity be available for blog templates and lead tracking?")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.services.index"),
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
                      }, " Save Service ", 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Services/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
