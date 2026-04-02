import { ref, watch, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, createVNode, withModifiers, withDirectives, vModelSelect, vModelText, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-D4Zb0PfS.js";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./Badge-D4IBJj9v.js";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import "@headlessui/vue";
import "@heroicons/vue/24/outline";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    leads: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const searchStatus = ref(props.filters.status || "");
    const searchCampaign = ref(props.filters.campaign || "");
    const getStatusColor = (status) => {
      const map = {
        "new": "blue",
        "contacted": "yellow",
        "converted": "green",
        "lost": "red"
      };
      return map[status] || "gray";
    };
    let timeoutId = null;
    const applyFilters = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        router.get(
          route("admin.leads.index"),
          {
            status: searchStatus.value,
            campaign: searchCampaign.value
          },
          { preserveState: true, replace: true }
        );
      }, 400);
    };
    watch(searchStatus, applyFilters);
    watch(searchCampaign, applyFilters);
    const statusForm = useForm({
      status: ""
    });
    const updateLeadStatus = (leadId, newStatus) => {
      statusForm.status = newStatus;
      statusForm.patch(route("admin.leads.update-status", leadId), {
        preserveScroll: true
      });
    };
    const columns = [
      { key: "created_at", label: "Date Received" },
      { key: "name", label: "Patient Name" },
      { key: "phone", label: "Phone" },
      { key: "disease", label: "Condition" },
      { key: "hospital", label: "Branch / Location" },
      { key: "status", label: "Status" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Lead Management" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:flex sm:items-center"${_scopeId}><div class="sm:flex-auto"${_scopeId}><h1 class="text-base font-semibold leading-6 text-gray-900"${_scopeId}>Lead Pipeline</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Monitor and manage patient inquiries flowing in from SEO properties and campaigns.</p></div><div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-4"${_scopeId}><div class="relative rounded-md shadow-sm"${_scopeId}><select class="form-select block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-medical-blue-600 sm:text-sm sm:leading-6"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchStatus.value) ? ssrLooseContain(searchStatus.value, "") : ssrLooseEqual(searchStatus.value, "")) ? " selected" : ""}${_scopeId}>All Statuses</option><option value="new"${ssrIncludeBooleanAttr(Array.isArray(searchStatus.value) ? ssrLooseContain(searchStatus.value, "new") : ssrLooseEqual(searchStatus.value, "new")) ? " selected" : ""}${_scopeId}>New</option><option value="contacted"${ssrIncludeBooleanAttr(Array.isArray(searchStatus.value) ? ssrLooseContain(searchStatus.value, "contacted") : ssrLooseEqual(searchStatus.value, "contacted")) ? " selected" : ""}${_scopeId}>Contacted</option><option value="converted"${ssrIncludeBooleanAttr(Array.isArray(searchStatus.value) ? ssrLooseContain(searchStatus.value, "converted") : ssrLooseEqual(searchStatus.value, "converted")) ? " selected" : ""}${_scopeId}>Converted</option><option value="lost"${ssrIncludeBooleanAttr(Array.isArray(searchStatus.value) ? ssrLooseContain(searchStatus.value, "lost") : ssrLooseEqual(searchStatus.value, "lost")) ? " selected" : ""}${_scopeId}>Lost</option></select></div><div class="relative rounded-md shadow-sm"${_scopeId}><div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(MagnifyingGlassIcon), {
              class: "h-5 w-5 text-gray-400",
              "aria-hidden": "true"
            }, null, _parent2, _scopeId));
            _push2(`</div><input type="text"${ssrRenderAttr("value", searchCampaign.value)} class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" placeholder="Filter Campaign..."${_scopeId}></div></div></div><div class="mt-8 flow-root"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              columns,
              data: __props.leads.data,
              actionLabel: "View Details",
              actionRoute: () => "#"
            }, {
              "cell(disease)": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col"${_scopeId2}><span class="font-medium text-gray-900"${_scopeId2}>${ssrInterpolate(item.disease || "General Query")}</span><span class="text-xs text-gray-500"${_scopeId2}>${ssrInterpolate(item.campaign_type || "Organic SEO")}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col" }, [
                      createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(item.disease || "General Query"), 1),
                      createVNode("span", { class: "text-xs text-gray-500" }, toDisplayString(item.campaign_type || "Organic SEO"), 1)
                    ])
                  ];
                }
              }),
              "cell(hospital)": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col"${_scopeId2}><span class="font-medium text-gray-900 text-sm"${_scopeId2}>${ssrInterpolate(item.hospital)}</span><span class="text-xs text-medical-blue-600"${_scopeId2}>${ssrInterpolate(item.location)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col" }, [
                      createVNode("span", { class: "font-medium text-gray-900 text-sm" }, toDisplayString(item.hospital), 1),
                      createVNode("span", { class: "text-xs text-medical-blue-600" }, toDisplayString(item.location), 1)
                    ])
                  ];
                }
              }),
              "cell(status)": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative group"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    color: getStatusColor(item.status),
                    class: "cursor-pointer border border-transparent group-hover:border-gray-300 transition-colors"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(item.status.toUpperCase())} <svg class="ml-1 h-3 w-3 inline" fill="currentColor" viewBox="0 0 20 20"${_scopeId3}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(item.status.toUpperCase()) + " ", 1),
                          (openBlock(), createBlock("svg", {
                            class: "ml-1 h-3 w-3 inline",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div class="absolute left-0 mt-1 hidden group-hover:block z-10 w-32 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"${_scopeId2}><div class="py-1"${_scopeId2}><button type="button" class="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"${_scopeId2}>Mark as New</button><button type="button" class="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"${_scopeId2}>Mark as Contacted</button><button type="button" class="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 border-t border-gray-100"${_scopeId2}>Sale Won / Converted</button><button type="button" class="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-red-50 hover:text-red-700"${_scopeId2}>Lost / Dropped</button></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative group" }, [
                      createVNode(_sfc_main$3, {
                        color: getStatusColor(item.status),
                        class: "cursor-pointer border border-transparent group-hover:border-gray-300 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.status.toUpperCase()) + " ", 1),
                          (openBlock(), createBlock("svg", {
                            class: "ml-1 h-3 w-3 inline",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ]),
                        _: 2
                      }, 1032, ["color"]),
                      createVNode("div", { class: "absolute left-0 mt-1 hidden group-hover:block z-10 w-32 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden" }, [
                        createVNode("div", { class: "py-1" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: withModifiers(($event) => updateLeadStatus(item.id, "new"), ["stop"]),
                            class: "block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }, "Mark as New", 8, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            onClick: withModifiers(($event) => updateLeadStatus(item.id, "contacted"), ["stop"]),
                            class: "block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"
                          }, "Mark as Contacted", 8, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            onClick: withModifiers(($event) => updateLeadStatus(item.id, "converted"), ["stop"]),
                            class: "block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 border-t border-gray-100"
                          }, "Sale Won / Converted", 8, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            onClick: withModifiers(($event) => updateLeadStatus(item.id, "lost"), ["stop"]),
                            class: "block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-red-50 hover:text-red-700"
                          }, "Lost / Dropped", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.leads.links && __props.leads.links.length > 3) {
              _push2(`<div class="mt-4 flex justify-between items-center"${_scopeId}><div class="flex flex-1 justify-between sm:hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: __props.leads.prev_page_url || "#",
                class: ["relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3", { "opacity-50 pointer-events-none": !__props.leads.prev_page_url }]
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
                href: __props.leads.next_page_url || "#",
                class: ["relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3", { "opacity-50 pointer-events-none": !__props.leads.next_page_url }]
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
                  createVNode("h1", { class: "text-base font-semibold leading-6 text-gray-900" }, "Lead Pipeline"),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Monitor and manage patient inquiries flowing in from SEO properties and campaigns.")
                ]),
                createVNode("div", { class: "mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center gap-4" }, [
                  createVNode("div", { class: "relative rounded-md shadow-sm" }, [
                    withDirectives(createVNode("select", {
                      "onUpdate:modelValue": ($event) => searchStatus.value = $event,
                      class: "form-select block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-medical-blue-600 sm:text-sm sm:leading-6"
                    }, [
                      createVNode("option", { value: "" }, "All Statuses"),
                      createVNode("option", { value: "new" }, "New"),
                      createVNode("option", { value: "contacted" }, "Contacted"),
                      createVNode("option", { value: "converted" }, "Converted"),
                      createVNode("option", { value: "lost" }, "Lost")
                    ], 8, ["onUpdate:modelValue"]), [
                      [vModelSelect, searchStatus.value]
                    ])
                  ]),
                  createVNode("div", { class: "relative rounded-md shadow-sm" }, [
                    createVNode("div", { class: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" }, [
                      createVNode(unref(MagnifyingGlassIcon), {
                        class: "h-5 w-5 text-gray-400",
                        "aria-hidden": "true"
                      })
                    ]),
                    withDirectives(createVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": ($event) => searchCampaign.value = $event,
                      class: "block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                      placeholder: "Filter Campaign..."
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, searchCampaign.value]
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "mt-8 flow-root" }, [
                createVNode(_sfc_main$2, {
                  columns,
                  data: __props.leads.data,
                  actionLabel: "View Details",
                  actionRoute: () => "#"
                }, {
                  "cell(disease)": withCtx(({ item }) => [
                    createVNode("div", { class: "flex flex-col" }, [
                      createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(item.disease || "General Query"), 1),
                      createVNode("span", { class: "text-xs text-gray-500" }, toDisplayString(item.campaign_type || "Organic SEO"), 1)
                    ])
                  ]),
                  "cell(hospital)": withCtx(({ item }) => [
                    createVNode("div", { class: "flex flex-col" }, [
                      createVNode("span", { class: "font-medium text-gray-900 text-sm" }, toDisplayString(item.hospital), 1),
                      createVNode("span", { class: "text-xs text-medical-blue-600" }, toDisplayString(item.location), 1)
                    ])
                  ]),
                  "cell(status)": withCtx(({ item }) => [
                    createVNode("div", { class: "relative group" }, [
                      createVNode(_sfc_main$3, {
                        color: getStatusColor(item.status),
                        class: "cursor-pointer border border-transparent group-hover:border-gray-300 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.status.toUpperCase()) + " ", 1),
                          (openBlock(), createBlock("svg", {
                            class: "ml-1 h-3 w-3 inline",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                              "clip-rule": "evenodd"
                            })
                          ]))
                        ]),
                        _: 2
                      }, 1032, ["color"]),
                      createVNode("div", { class: "absolute left-0 mt-1 hidden group-hover:block z-10 w-32 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden" }, [
                        createVNode("div", { class: "py-1" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: withModifiers(($event) => updateLeadStatus(item.id, "new"), ["stop"]),
                            class: "block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          }, "Mark as New", 8, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            onClick: withModifiers(($event) => updateLeadStatus(item.id, "contacted"), ["stop"]),
                            class: "block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-yellow-50 hover:text-yellow-700"
                          }, "Mark as Contacted", 8, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            onClick: withModifiers(($event) => updateLeadStatus(item.id, "converted"), ["stop"]),
                            class: "block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 border-t border-gray-100"
                          }, "Sale Won / Converted", 8, ["onClick"]),
                          createVNode("button", {
                            type: "button",
                            onClick: withModifiers(($event) => updateLeadStatus(item.id, "lost"), ["stop"]),
                            class: "block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-red-50 hover:text-red-700"
                          }, "Lost / Dropped", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["data"]),
                __props.leads.links && __props.leads.links.length > 3 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-4 flex justify-between items-center"
                }, [
                  createVNode("div", { class: "flex flex-1 justify-between sm:hidden" }, [
                    createVNode(unref(Link), {
                      href: __props.leads.prev_page_url || "#",
                      class: ["relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3", { "opacity-50 pointer-events-none": !__props.leads.prev_page_url }]
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Previous")
                      ]),
                      _: 1
                    }, 8, ["href", "class"]),
                    createVNode(unref(Link), {
                      href: __props.leads.next_page_url || "#",
                      class: ["relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 mb-3", { "opacity-50 pointer-events-none": !__props.leads.next_page_url }]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Leads/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
