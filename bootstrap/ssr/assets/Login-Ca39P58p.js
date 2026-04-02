import { computed, mergeProps, useSSRContext, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./GuestLayout-BZiIDbQh.js";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5 } from "./TextInput-DO4BIY6o.js";
import { P as PrimaryButton } from "./PrimaryButton-CsMbypc4.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import "./ApplicationLogo-B2173abF.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 text-sm font-medium text-teal-600 bg-teal-50 p-4 rounded-xl border border-teal-100"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-6"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "email",
              value: "Email",
              class: "text-slate-700 font-medium mb-1.5 ml-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username",
              placeholder: "admin@blinkeye.com"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><div class="flex items-center justify-between mb-1.5 px-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              for: "password",
              value: "Password",
              class: "text-slate-700 font-medium"
            }, null, _parent2, _scopeId));
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password",
              placeholder: "••••••••"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="block"${_scopeId}><label class="flex items-center group cursor-pointer"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event,
              class: "border-slate-300 text-teal-600 focus:ring-teal-500 rounded text-base cursor-pointer"
            }, null, _parent2, _scopeId));
            _push2(`<span class="ms-3 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors"${_scopeId}>Remember me</span></label></div><div class="pt-2 flex flex-col gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["w-full text-base py-3.5", { "opacity-50 cursor-not-allowed": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sign in to Account `);
                } else {
                  return [
                    createTextVNode(" Sign in to Account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="text-center text-sm text-slate-500"${_scopeId}> Not a member? `);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("register"),
              class: "font-semibold text-teal-600 hover:text-teal-500 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Apply for care`);
                } else {
                  return [
                    createTextVNode("Apply for care")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p></div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-teal-600 bg-teal-50 p-4 rounded-xl border border-teal-100"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"]),
                class: "space-y-6"
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$3, {
                    for: "email",
                    value: "Email",
                    class: "text-slate-700 font-medium mb-1.5 ml-1"
                  }),
                  createVNode(_sfc_main$4, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username",
                    placeholder: "admin@blinkeye.com"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "flex items-center justify-between mb-1.5 px-1" }, [
                    createVNode(_sfc_main$3, {
                      for: "password",
                      value: "Password",
                      class: "text-slate-700 font-medium"
                    }),
                    __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                      key: 0,
                      href: _ctx.route("password.request"),
                      class: "text-sm font-semibold text-teal-600 hover:text-teal-500 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Forgot password? ")
                      ]),
                      _: 1
                    }, 8, ["href"])) : createCommentVNode("", true)
                  ]),
                  createVNode(_sfc_main$4, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    placeholder: "••••••••"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "block" }, [
                  createVNode("label", { class: "flex items-center group cursor-pointer" }, [
                    createVNode(_sfc_main$1, {
                      name: "remember",
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event,
                      class: "border-slate-300 text-teal-600 focus:ring-teal-500 rounded text-base cursor-pointer"
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", { class: "ms-3 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors" }, "Remember me")
                  ])
                ]),
                createVNode("div", { class: "pt-2 flex flex-col gap-4" }, [
                  createVNode(PrimaryButton, {
                    class: ["w-full text-base py-3.5", { "opacity-50 cursor-not-allowed": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Sign in to Account ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"]),
                  createVNode("p", { class: "text-center text-sm text-slate-500" }, [
                    createTextVNode(" Not a member? "),
                    createVNode(unref(Link), {
                      href: _ctx.route("register"),
                      class: "font-semibold text-teal-600 hover:text-teal-500 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Apply for care")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
