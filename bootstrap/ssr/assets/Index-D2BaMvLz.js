import { mergeProps, useSSRContext, unref, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { _ as _sfc_main$2 } from "./AdminLayout-D4Zb0PfS.js";
import { UserGroupIcon, MapPinIcon, BuildingOfficeIcon } from "@heroicons/vue/24/outline";
import "@headlessui/vue";
const _sfc_main$1 = {
  __name: "StatCard",
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    color: {
      type: String,
      default: "medical-blue"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 transition duration-150 ease-in-out hover:shadow-md" }, _attrs))}><dt><div class="${ssrRenderClass(["absolute rounded-md p-3 text-white", `bg-${__props.color}-500`])}">`);
      ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
        _push(`<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path></svg>`);
      }, _push, _parent);
      _push(`</div><p class="ml-16 truncate text-sm font-medium text-gray-500">${ssrInterpolate(__props.title)}</p></dt><dd class="ml-16 flex items-baseline pb-6 sm:pb-7"><p class="text-2xl font-semibold text-gray-900">${ssrInterpolate(__props.value)}</p></dd></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/StatCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    stats: {
      type: Object,
      default: () => ({
        totalLeads: 0,
        newLeads: 0,
        convertedLeads: 0,
        conversionRate: 0,
        activeLocations: 0,
        activeHospitals: 0
      })
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Admin Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="md:flex md:items-center md:justify-between"${_scopeId}><div class="min-w-0 flex-1"${_scopeId}><h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"${_scopeId}> Welcome back, ${ssrInterpolate(_ctx.$page.props.auth.user.name)}! </h2><p class="text-sm text-gray-500 mt-1"${_scopeId}>Here is the high-level overview of the Blink Eye platform today.</p></div></div><dl class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              title: "Total Collected Leads",
              value: __props.stats.totalLeads,
              color: "medical-blue"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(UserGroupIcon), {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(UserGroupIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              title: "New Leads Action Required",
              value: __props.stats.newLeads,
              color: "red"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(UserGroupIcon), {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(UserGroupIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              title: "Successful Conversions",
              value: `${__props.stats.conversionRate}%`,
              color: "green"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(UserGroupIcon), {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(UserGroupIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              title: "Active Territories",
              value: __props.stats.activeLocations,
              color: "trust"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(MapPinIcon), {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(MapPinIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, {
              title: "Active Hospital Branches",
              value: __props.stats.activeHospitals,
              color: "medical-blue"
            }, {
              icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(BuildingOfficeIcon), {
                    class: "h-6 w-6",
                    "aria-hidden": "true"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(BuildingOfficeIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</dl>`);
          } else {
            return [
              createVNode("div", { class: "md:flex md:items-center md:justify-between" }, [
                createVNode("div", { class: "min-w-0 flex-1" }, [
                  createVNode("h2", { class: "text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight" }, " Welcome back, " + toDisplayString(_ctx.$page.props.auth.user.name) + "! ", 1),
                  createVNode("p", { class: "text-sm text-gray-500 mt-1" }, "Here is the high-level overview of the Blink Eye platform today.")
                ])
              ]),
              createVNode("dl", { class: "mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" }, [
                createVNode(_sfc_main$1, {
                  title: "Total Collected Leads",
                  value: __props.stats.totalLeads,
                  color: "medical-blue"
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(UserGroupIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                }, 8, ["value"]),
                createVNode(_sfc_main$1, {
                  title: "New Leads Action Required",
                  value: __props.stats.newLeads,
                  color: "red"
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(UserGroupIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                }, 8, ["value"]),
                createVNode(_sfc_main$1, {
                  title: "Successful Conversions",
                  value: `${__props.stats.conversionRate}%`,
                  color: "green"
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(UserGroupIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                }, 8, ["value"]),
                createVNode(_sfc_main$1, {
                  title: "Active Territories",
                  value: __props.stats.activeLocations,
                  color: "trust"
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(MapPinIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                }, 8, ["value"]),
                createVNode(_sfc_main$1, {
                  title: "Active Hospital Branches",
                  value: __props.stats.activeHospitals,
                  color: "medical-blue"
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(BuildingOfficeIcon), {
                      class: "h-6 w-6",
                      "aria-hidden": "true"
                    })
                  ]),
                  _: 1
                }, 8, ["value"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Dashboard/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
