import { mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext, computed } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
const _sfc_main$1 = {
  __name: "DataTable",
  __ssrInlineRender: true,
  props: {
    columns: {
      type: Array,
      // Array of { key: 'id', label: 'ID' }
      required: true
    },
    data: {
      type: Array,
      // Array of objects matching columns
      required: true
    },
    actionLabel: {
      type: String,
      default: "View"
    },
    actionRoute: {
      type: Function,
      // Function returning a route string given an item
      default: null
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg" }, _attrs))}><table class="min-w-full divide-y divide-gray-300"><thead class="bg-gray-50"><tr><!--[-->`);
      ssrRenderList(__props.columns, (col) => {
        _push(`<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">${ssrInterpolate(col.label)}</th>`);
      });
      _push(`<!--]-->`);
      if (__props.actionRoute) {
        _push(`<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6"><span class="sr-only">${ssrInterpolate(__props.actionLabel)}</span></th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody class="divide-y divide-gray-200 bg-white shadow-sm"><!--[-->`);
      ssrRenderList(__props.data, (row) => {
        _push(`<tr class="hover:bg-gray-50 transition-colors duration-200"><!--[-->`);
        ssrRenderList(__props.columns, (col) => {
          _push(`<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">`);
          ssrRenderSlot(_ctx.$slots, `cell(${col.key})`, {
            value: row[col.key],
            item: row
          }, () => {
            _push(`${ssrInterpolate(row[col.key])}`);
          }, _push, _parent);
          _push(`</td>`);
        });
        _push(`<!--]-->`);
        if (__props.actionRoute) {
          _push(`<td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">`);
          _push(ssrRenderComponent(unref(Link), {
            href: __props.actionRoute(row),
            class: "text-medical-blue-600 hover:text-medical-blue-900 flex items-center justify-end"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.actionLabel)}<span class="sr-only"${_scopeId}>, ${ssrInterpolate(row.id)}</span>`);
                _push2(ssrRenderComponent(unref(ChevronRightIcon), {
                  class: "h-5 w-5 ml-1",
                  "aria-hidden": "true"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(toDisplayString(__props.actionLabel), 1),
                  createVNode("span", { class: "sr-only" }, ", " + toDisplayString(row.id), 1),
                  createVNode(unref(ChevronRightIcon), {
                    class: "h-5 w-5 ml-1",
                    "aria-hidden": "true"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tr>`);
      });
      _push(`<!--]-->`);
      if (__props.data.length === 0) {
        _push(`<tr><td${ssrRenderAttr("colspan", __props.columns.length + (__props.actionRoute ? 1 : 0))} class="py-8 text-center text-sm text-gray-500"> No records found. </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/DataTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    color: {
      type: String,
      default: "gray",
      // gray, red, yellow, green, blue, indigo, purple, pink
      validator: (value) => ["gray", "red", "yellow", "green", "blue", "indigo", "purple", "pink", "medical-blue", "trust"].includes(value)
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const colorClasses = computed(() => {
      const map = {
        gray: "bg-gray-50 text-gray-600 ring-gray-500/10",
        red: "bg-red-50 text-red-700 ring-red-600/10",
        yellow: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        green: "bg-green-50 text-green-700 ring-green-600/20",
        blue: "bg-blue-50 text-blue-700 ring-blue-700/10",
        indigo: "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
        purple: "bg-purple-50 text-purple-700 ring-purple-700/10",
        pink: "bg-pink-50 text-pink-700 ring-pink-700/10",
        "medical-blue": "bg-medical-blue-50 text-medical-blue-700 ring-medical-blue-700/10",
        "trust": "bg-teal-50 text-teal-700 ring-teal-600/20"
      };
      return map[props.color] || map.gray;
    });
    const shapeClass = computed(() => props.rounded ? "rounded-full" : "rounded-md");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["inline-flex items-center px-2 py-1 text-xs font-medium ring-1 ring-inset", shapeClass.value, colorClasses.value]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/UI/Badge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
