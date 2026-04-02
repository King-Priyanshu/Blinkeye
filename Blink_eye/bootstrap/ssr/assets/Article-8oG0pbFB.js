import { computed, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, createCommentVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderVNode, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
import "./ApplicationLogo-B2173abF.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Article",
  __ssrInlineRender: true,
  props: {
    title: String,
    content: String,
    context: Object,
    relatedPages: { type: Array, default: () => [] },
    toc: { type: Array, default: () => [] },
    hospitals: { type: Array, default: () => [] },
    seo: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const form = useForm({
      name: "",
      phone: "",
      hospital_id: props.context?.hospital?.id || "",
      disease_id: props.context?.disease?.id || "",
      location_id: props.context?.location?.id || "",
      source_url: page.props.current_url || ""
    });
    const jsonLdScript = computed(() => {
      if (!props.seo?.jsonLd) return null;
      return JSON.stringify(props.seo.jsonLd);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: __props.title }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.seo.description) {
              _push2(`<meta name="description"${ssrRenderAttr("content", __props.seo.description)} data-v-a63a6949${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.seo.keywords) {
              _push2(`<meta name="keywords"${ssrRenderAttr("content", __props.seo.keywords)} data-v-a63a6949${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.seo.description) {
              _push2(`<meta property="og:title"${ssrRenderAttr("content", __props.title)} data-v-a63a6949${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.seo.description) {
              _push2(`<meta property="og:description"${ssrRenderAttr("content", __props.seo.description)} data-v-a63a6949${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<meta property="og:type" content="article" data-v-a63a6949${_scopeId}>`);
            if (jsonLdScript.value) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.seo.description ? (openBlock(), createBlock("meta", {
                key: 0,
                name: "description",
                content: __props.seo.description
              }, null, 8, ["content"])) : createCommentVNode("", true),
              __props.seo.keywords ? (openBlock(), createBlock("meta", {
                key: 1,
                name: "keywords",
                content: __props.seo.keywords
              }, null, 8, ["content"])) : createCommentVNode("", true),
              __props.seo.description ? (openBlock(), createBlock("meta", {
                key: 2,
                property: "og:title",
                content: __props.title
              }, null, 8, ["content"])) : createCommentVNode("", true),
              __props.seo.description ? (openBlock(), createBlock("meta", {
                key: 3,
                property: "og:description",
                content: __props.seo.description
              }, null, 8, ["content"])) : createCommentVNode("", true),
              createVNode("meta", {
                property: "og:type",
                content: "article"
              }),
              jsonLdScript.value ? (openBlock(), createBlock(resolveDynamicComponent("script"), {
                key: 4,
                type: "application/ld+json",
                textContent: toDisplayString(jsonLdScript.value)
              }, null, 8, ["textContent"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="min-h-screen bg-slate-950 font-sans text-white selection:bg-teal-500 selection:text-white pb-20" data-v-a63a6949><div class="fixed inset-0 z-0 pointer-events-none" data-v-a63a6949><div class="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px]" data-v-a63a6949></div><div class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" data-v-a63a6949></div></div><header class="sticky top-0 z-50 bg-slate-950/70 backdrop-blur-2xl border-b border-white/5" data-v-a63a6949><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between" data-v-a63a6949>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-3 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center group-hover:scale-105 transition-transform" data-v-a63a6949${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-5 h-5" data-v-a63a6949${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" data-v-a63a6949${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-a63a6949${_scopeId}></path></svg></div><div data-v-a63a6949${_scopeId}><span class="block text-xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent leading-tight" data-v-a63a6949${_scopeId}>Blink Eye</span><span class="hidden sm:block text-[10px] uppercase font-bold tracking-wider text-slate-500 group-hover:text-teal-400 transition-colors" data-v-a63a6949${_scopeId}>← Back to Home</span></div>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center group-hover:scale-105 transition-transform" }, [
                (openBlock(), createBlock("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  "stroke-width": "2",
                  stroke: "white",
                  class: "w-5 h-5"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  }),
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  })
                ]))
              ]),
              createVNode("div", null, [
                createVNode("span", { class: "block text-xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent leading-tight" }, "Blink Eye"),
                createVNode("span", { class: "hidden sm:block text-[10px] uppercase font-bold tracking-wider text-slate-500 group-hover:text-teal-400 transition-colors" }, "← Back to Home")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-5" data-v-a63a6949>`);
      if (__props.context?.hospital?.phone) {
        _push(`<a${ssrRenderAttr("href", "tel:" + __props.context.hospital.phone)} class="hidden sm:flex items-center gap-2 text-slate-400 font-medium hover:text-teal-400 transition-colors text-sm" data-v-a63a6949><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4" data-v-a63a6949><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" data-v-a63a6949></path></svg> ${ssrInterpolate(__props.context.hospital.phone)}</a>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$page.props.auth?.user) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dashboard"),
          class: "rounded-full px-5 py-2 bg-white/10 text-white font-semibold hover:bg-white/20 transition-all text-sm border border-white/10"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Dashboard`);
            } else {
              return [
                createTextVNode("Dashboard")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("login"),
          class: "text-sm font-semibold text-slate-400 hover:text-teal-400 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Log in`);
            } else {
              return [
                createTextVNode("Log in")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></header><div class="border-b border-white/5 bg-white/[0.02]" data-v-a63a6949><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-sm font-medium" data-v-a63a6949>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "text-slate-500 hover:text-teal-400 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="text-slate-600" data-v-a63a6949>/</span>`);
      if (__props.context?.location) {
        _push(`<span class="flex items-center gap-1.5 text-slate-400" data-v-a63a6949><span class="w-1.5 h-1.5 rounded-full bg-emerald-400" data-v-a63a6949></span> ${ssrInterpolate(__props.context.location.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.context?.location && (__props.context?.disease || __props.context?.service)) {
        _push(`<span class="text-slate-600" data-v-a63a6949>/</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.context?.disease) {
        _push(`<span class="flex items-center gap-1.5 text-rose-300" data-v-a63a6949><span class="w-1.5 h-1.5 rounded-full bg-rose-400" data-v-a63a6949></span> ${ssrInterpolate(__props.context.disease.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.context?.service) {
        _push(`<span class="flex items-center gap-1.5 text-cyan-300" data-v-a63a6949><span class="w-1.5 h-1.5 rounded-full bg-cyan-400" data-v-a63a6949></span> ${ssrInterpolate(__props.context.service.name)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><main class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10" data-v-a63a6949><article class="lg:col-span-8 space-y-8" data-v-a63a6949>`);
      if (__props.context?.hospital) {
        _push(`<div class="flex items-center gap-4 p-5 bg-teal-500/10 rounded-2xl border border-teal-500/20 backdrop-blur-sm" data-v-a63a6949><div class="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0" data-v-a63a6949><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6" data-v-a63a6949><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-a63a6949></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" data-v-a63a6949></path></svg></div><div data-v-a63a6949><p class="text-xs font-bold uppercase tracking-wider text-teal-300 mb-0.5" data-v-a63a6949>Nearest Available Branch</p><p class="text-lg font-bold text-white" data-v-a63a6949>${ssrInterpolate(__props.context.hospital.name)}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white/[0.03] backdrop-blur-md p-8 lg:p-12 rounded-3xl border border-white/[0.06] shadow-2xl" data-v-a63a6949><h1 class="text-3xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-10 text-white" data-v-a63a6949><span class="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent" data-v-a63a6949>${ssrInterpolate(__props.title)}</span></h1><div class="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-slate-300 prose-p:text-slate-300 leading-relaxed marker:text-teal-500" data-v-a63a6949>${__props.content ?? ""}</div></div></article><aside class="lg:col-span-4 space-y-6" data-v-a63a6949><div class="sticky top-28 space-y-6" data-v-a63a6949><div class="relative group" data-v-a63a6949><div class="absolute -inset-[1px] bg-gradient-to-br from-teal-500/40 to-cyan-500/40 rounded-3xl opacity-50 blur-sm pointer-events-none" data-v-a63a6949></div><div class="relative bg-slate-900/80 p-7 rounded-3xl border border-white/10 backdrop-blur-xl" data-v-a63a6949><h3 class="text-xl font-bold text-white mb-2" data-v-a63a6949>Book an Appointment</h3><p class="text-slate-400 text-sm mb-6" data-v-a63a6949>Expert eye care is just a step away. Request a free consultation.</p><form class="space-y-4" data-v-a63a6949><div data-v-a63a6949><input type="text"${ssrRenderAttr("value", unref(form).name)} required placeholder="Full Name" class="block w-full border border-white/10 bg-white/5 focus:bg-white/10 focus:border-teal-400 focus:ring-teal-400 text-white placeholder-slate-500 rounded-xl py-3.5 px-4 transition-all" data-v-a63a6949></div><div data-v-a63a6949><input type="tel"${ssrRenderAttr("value", unref(form).phone)} required placeholder="Phone Number" class="block w-full border border-white/10 bg-white/5 focus:bg-white/10 focus:border-teal-400 focus:ring-teal-400 text-white placeholder-slate-500 rounded-xl py-3.5 px-4 transition-all" data-v-a63a6949></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full relative mt-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold hover:from-teal-400 hover:to-cyan-400 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-teal-500 disabled:opacity-50 glow-btn" data-v-a63a6949>${ssrInterpolate(unref(form).processing ? "Submitting..." : "Get Callback Now")}</button><p class="text-[11px] text-center text-slate-500 mt-3 flex items-center justify-center gap-1.5" data-v-a63a6949><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 text-teal-500" data-v-a63a6949><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" data-v-a63a6949></path></svg> Your information is 100% secure. </p></form></div></div>`);
      if (__props.toc && __props.toc.length > 0) {
        _push(`<div class="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.06] backdrop-blur-md" data-v-a63a6949><h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4" data-v-a63a6949>On This Page</h4><nav data-v-a63a6949><ul class="space-y-2.5 border-l border-white/10 pl-3" data-v-a63a6949><!--[-->`);
        ssrRenderList(__props.toc, (item) => {
          _push(`<li data-v-a63a6949><a${ssrRenderAttr("href", "#" + item.id)} class="block text-sm text-slate-400 hover:text-teal-400 transition-colors py-0.5 relative group" data-v-a63a6949><span class="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-teal-500/0 border border-teal-500/0 group-hover:bg-teal-500 group-hover:border-teal-400 transition-all" data-v-a63a6949></span> ${ssrInterpolate(item.title)}</a></li>`);
        });
        _push(`<!--]--></ul></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.relatedPages && __props.relatedPages.length > 0) {
        _push(`<div class="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.06] backdrop-blur-md" data-v-a63a6949><h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4" data-v-a63a6949>Related Guides</h4><ul class="space-y-1" data-v-a63a6949><!--[-->`);
        ssrRenderList(__props.relatedPages, (page2) => {
          _push(`<li data-v-a63a6949>`);
          _push(ssrRenderComponent(unref(Link), {
            href: page2.url,
            class: "flex items-start gap-2.5 text-sm text-slate-300 hover:text-teal-400 hover:bg-white/5 p-2 rounded-lg transition-all group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mt-0.5 text-slate-600 group-hover:text-teal-500 transition-colors flex-shrink-0" data-v-a63a6949${_scopeId}><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" data-v-a63a6949${_scopeId}></path></svg><span class="leading-snug" data-v-a63a6949${_scopeId}>${ssrInterpolate(page2.title)}</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    class: "w-4 h-4 mt-0.5 text-slate-600 group-hover:text-teal-500 transition-colors flex-shrink-0"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z",
                      "clip-rule": "evenodd"
                    })
                  ])),
                  createVNode("span", { class: "leading-snug" }, toDisplayString(page2.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.hospitals && __props.hospitals.length > 0) {
        _push(`<div class="bg-white/[0.03] p-6 rounded-3xl border border-white/[0.06] backdrop-blur-md" data-v-a63a6949><h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4" data-v-a63a6949>Our Hospital Branches</h4><div class="space-y-3" data-v-a63a6949><!--[-->`);
        ssrRenderList(__props.hospitals.slice(0, 4), (h) => {
          _push(`<div class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group" data-v-a63a6949><div class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5 border border-teal-500/20 group-hover:bg-teal-500/20 group-hover:scale-110 transition-all" data-v-a63a6949><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" data-v-a63a6949><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-a63a6949></path><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" data-v-a63a6949></path></svg></div><div data-v-a63a6949><p class="font-bold text-sm text-slate-200 group-hover:text-teal-300 transition-colors" data-v-a63a6949>${ssrInterpolate(h.name)}</p><p class="text-slate-500 text-xs" data-v-a63a6949>${ssrInterpolate(h.location?.name)}</p>`);
          if (h.phone) {
            _push(`<a${ssrRenderAttr("href", "tel:" + h.phone)} class="text-cyan-400 text-xs font-medium hover:underline mt-0.5 inline-block" data-v-a63a6949>${ssrInterpolate(h.phone)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside></main></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Frontend/Article.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Article = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a63a6949"]]);
export {
  Article as default
};
