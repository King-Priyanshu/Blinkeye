import { unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-D4Zb0PfS.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./Badge-D4IBJj9v.js";
import { PlusIcon } from "@heroicons/vue/20/solid";
import "@headlessui/vue";
import "@heroicons/vue/24/outline";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    diseases: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const columns = [
      { key: "name", label: "Disease Name" },
      { key: "slug", label: "URL Slug" },
      { key: "is_active", label: "Status" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Diseases Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:flex sm:items-center"${_scopeId}><div class="sm:flex-auto"${_scopeId}><h1 class="text-base font-semibold leading-6 text-gray-900"${_scopeId}>Medical Conditions &amp; Diseases</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Manage the core taxonomy of reportable eye conditions for SEO and Lead routing.</p></div><div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.diseases.create"),
              class: "inline-flex items-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(PlusIcon), {
                    class: "h-5 w-5 mr-1",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                  _push3(` Add Condition `);
                } else {
                  return [
                    createVNode(unref(PlusIcon), {
                      class: "h-5 w-5 mr-1",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" Add Condition ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-8 flow-root"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              columns,
              data: __props.diseases.data,
              actionLabel: "Edit",
              actionRoute: (item) => _ctx.route("admin.diseases.edit", item.id)
            }, {
              "cell(slug)": withCtx(({ value }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-gray-500 text-xs font-mono bg-gray-100 px-2 py-1 rounded"${_scopeId2}>/${ssrInterpolate(value)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-gray-500 text-xs font-mono bg-gray-100 px-2 py-1 rounded" }, "/" + toDisplayString(value), 1)
                  ];
                }
              }),
              "cell(is_active)": withCtx(({ value }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    color: value ? "green" : "gray",
                    rounded: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(value ? "Active" : "Inactive")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(value ? "Active" : "Inactive"), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      color: value ? "green" : "gray",
                      rounded: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(value ? "Active" : "Inactive"), 1)
                      ]),
                      _: 2
                    }, 1032, ["color"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.diseases.links && __props.diseases.links.length > 3) {
              _push2(`<div class="mt-4 flex justify-between items-center"${_scopeId}><div class="flex flex-1 justify-between sm:hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.diseases.prev_page_url || "#",
                class: ["relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3", { "opacity-50 pointer-events-none": !__props.diseases.prev_page_url }]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Previous`);
                  } else {
                    return [
                      createTextVNode("Previous")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.diseases.next_page_url || "#",
                class: ["relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3", { "opacity-50 pointer-events-none": !__props.diseases.next_page_url }]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Next`);
                  } else {
                    return [
                      createTextVNode("Next")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "sm:flex sm:items-center" }, [
                createVNode("div", { class: "sm:flex-auto" }, [
                  createVNode("h1", { class: "text-base font-semibold leading-6 text-gray-900" }, "Medical Conditions & Diseases"),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Manage the core taxonomy of reportable eye conditions for SEO and Lead routing.")
                ]),
                createVNode("div", { class: "mt-4 sm:ml-16 sm:mt-0 sm:flex-none" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.diseases.create"),
                    class: "inline-flex items-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(PlusIcon), {
                        class: "h-5 w-5 mr-1",
                        "aria-hidden": "true"
                      }),
                      createTextVNode(" Add Condition ")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ]),
              createVNode("div", { class: "mt-8 flow-root" }, [
                createVNode(_sfc_main$2, {
                  columns,
                  data: __props.diseases.data,
                  actionLabel: "Edit",
                  actionRoute: (item) => _ctx.route("admin.diseases.edit", item.id)
                }, {
                  "cell(slug)": withCtx(({ value }) => [
                    createVNode("span", { class: "text-gray-500 text-xs font-mono bg-gray-100 px-2 py-1 rounded" }, "/" + toDisplayString(value), 1)
                  ]),
                  "cell(is_active)": withCtx(({ value }) => [
                    createVNode(_sfc_main$3, {
                      color: value ? "green" : "gray",
                      rounded: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(value ? "Active" : "Inactive"), 1)
                      ]),
                      _: 2
                    }, 1032, ["color"])
                  ]),
                  _: 1
                }, 8, ["data", "actionRoute"]),
                __props.diseases.links && __props.diseases.links.length > 3 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-4 flex justify-between items-center"
                }, [
                  createVNode("div", { class: "flex flex-1 justify-between sm:hidden" }, [
                    createVNode(unref(Link), {
                      href: __props.diseases.prev_page_url || "#",
                      class: ["relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3", { "opacity-50 pointer-events-none": !__props.diseases.prev_page_url }]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Previous")
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    createVNode(unref(Link), {
                      href: __props.diseases.next_page_url || "#",
                      class: ["relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3", { "opacity-50 pointer-events-none": !__props.diseases.next_page_url }]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Next")
                      ]),
                      _: 1
                    }, 8, ["href", "class"])
                  ])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Diseases/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
