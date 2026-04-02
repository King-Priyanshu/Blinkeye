import { ref, watch, computed, unref, withCtx, createVNode, openBlock, createBlock, createTextVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
import "./ApplicationLogo-B2173abF.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
    featuredBlogs: { type: Array, default: () => [] },
    locations: { type: Array, default: () => [] },
    diseases: { type: Array, default: () => [] },
    services: { type: Array, default: () => [] },
    hospitals: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const searchQuery = ref("");
    const searchResults = ref(null);
    const searchLoading = ref(false);
    const showSearchDropdown = ref(false);
    let searchTimeout = null;
    watch(searchQuery, (val) => {
      clearTimeout(searchTimeout);
      if (val.length < 2) {
        searchResults.value = null;
        showSearchDropdown.value = false;
        return;
      }
      searchLoading.value = true;
      searchTimeout = setTimeout(async () => {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`);
          searchResults.value = await res.json();
          showSearchDropdown.value = true;
        } catch (e) {
          console.error(e);
        }
        searchLoading.value = false;
      }, 300);
    });
    const selectedLocation = ref("");
    const filteredBlogs = computed(() => {
      if (!selectedLocation.value) return props.featuredBlogs;
      const loc = props.locations.find((l) => l.id == selectedLocation.value);
      if (!loc) return props.featuredBlogs;
      return props.featuredBlogs.filter((b) => b.location === loc.name);
    });
    const activeTab = ref("all");
    const displayBlogs = computed(() => {
      let blogs = filteredBlogs.value;
      if (activeTab.value === "service") return blogs.filter((b) => b.type === "service");
      if (activeTab.value === "disease") return blogs.filter((b) => b.type === "disease");
      return blogs;
    });
    const page = usePage();
    const form = useForm({
      name: "",
      phone: "",
      source_url: page.props.current_url || ""
    });
    const cityLocations = computed(() => props.locations.filter((l) => l.type === "city"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Premium Eye Care — Blink Eye Hospitals" }, null, _parent));
      _push(`<div class="min-h-screen bg-slate-950 font-sans text-white selection:bg-teal-500 selection:text-white" data-v-fe315a9f><header class="fixed w-full top-0 z-50 bg-slate-950/70 backdrop-blur-2xl border-b border-white/5" data-v-fe315a9f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between" data-v-fe315a9f>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "flex items-center gap-3"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center" data-v-fe315a9f${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-5 h-5" data-v-fe315a9f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" data-v-fe315a9f${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-fe315a9f${_scopeId}></path></svg></div><span class="text-xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent" data-v-fe315a9f${_scopeId}>Blink Eye</span>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center" }, [
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
              createVNode("span", { class: "text-xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent" }, "Blink Eye")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-5" data-v-fe315a9f><a href="tel:1800-123-4567" class="hidden sm:flex items-center gap-2 text-slate-400 font-medium hover:text-teal-400 transition-colors text-sm" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" data-v-fe315a9f></path></svg> 1800-123-4567 </a>`);
      if (__props.canLogin) {
        _push(`<nav class="flex gap-3 items-center" data-v-fe315a9f>`);
        if (_ctx.$page.props.auth.user) {
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
            class: "text-sm font-semibold text-slate-300 hover:text-teal-400 transition-colors"
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
        _push(`</nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></header><section class="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden" data-v-fe315a9f><div class="absolute inset-0 z-0" data-v-fe315a9f><div class="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/15 blur-[120px] animate-float" data-v-fe315a9f></div><div class="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px] animate-float-delayed" data-v-fe315a9f></div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/8 blur-[80px] animate-float" data-v-fe315a9f></div></div><div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-fe315a9f><div class="text-center max-w-3xl mx-auto mb-12" data-v-fe315a9f><span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6" data-v-fe315a9f><span class="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" data-v-fe315a9f></span> ${ssrInterpolate(_ctx.$page.props.currentHospital ? _ctx.$page.props.currentHospital.name : "World-Class Eye Care")}</span><h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]" data-v-fe315a9f> Find the Best <span class="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent" data-v-fe315a9f> Eye Treatment</span><br class="hidden sm:block" data-v-fe315a9f>Near You </h1><p class="text-lg text-slate-400 mb-10 max-w-2xl mx-auto" data-v-fe315a9f>Search for any eye disease, treatment or location to find expert care, top hospitals, and detailed guides — all personalized to your area.</p></div><div class="max-w-2xl mx-auto relative" data-v-fe315a9f><div class="relative group" data-v-fe315a9f><div class="absolute -inset-[2px] bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl opacity-40 group-hover:opacity-70 blur-sm transition duration-500" data-v-fe315a9f></div><div class="relative flex items-center bg-slate-900 rounded-2xl border border-white/10 overflow-hidden" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-500 ml-5 flex-shrink-0" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" data-v-fe315a9f></path></svg><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search &quot;Cataract Surgery in Bathinda&quot; or &quot;Glaucoma&quot;..." class="flex-1 py-4 px-4 text-base text-white placeholder-slate-500 border-0 focus:ring-0 focus:outline-none bg-transparent" data-v-fe315a9f>`);
      if (searchLoading.value) {
        _push(`<div class="mr-4" data-v-fe315a9f><div class="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" data-v-fe315a9f></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (showSearchDropdown.value && searchResults.value) {
        _push(`<div class="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50 max-h-96 overflow-y-auto" data-v-fe315a9f>`);
        if (searchResults.value.pages && searchResults.value.pages.length > 0) {
          _push(`<div class="p-4" data-v-fe315a9f><p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2" data-v-fe315a9f>Suggested Pages</p><!--[-->`);
          ssrRenderList(searchResults.value.pages.slice(0, 6), (page2) => {
            _push(`<button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-500/10 transition-colors text-left group" data-v-fe315a9f><div class="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" data-v-fe315a9f></path></svg></div><span class="text-sm font-medium text-slate-300" data-v-fe315a9f>${ssrInterpolate(page2.title)}</span></button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (searchResults.value.results) {
          _push(`<div class="border-t border-white/5 p-4" data-v-fe315a9f>`);
          if (searchResults.value.results.diseases && searchResults.value.results.diseases.length > 0) {
            _push(`<div class="mb-3" data-v-fe315a9f><p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2" data-v-fe315a9f>Diseases</p><!--[-->`);
            ssrRenderList(searchResults.value.results.diseases, (d) => {
              _push(`<button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-400" data-v-fe315a9f>`);
              if (d.image) {
                _push(`<img${ssrRenderAttr("src", `/storage/${d.image}`)}${ssrRenderAttr("alt", d.name)} class="w-8 h-8 rounded-lg object-cover flex-shrink-0" data-v-fe315a9f>`);
              } else {
                _push(`<span class="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0" data-v-fe315a9f><span class="w-2 h-2 rounded-full bg-rose-400" data-v-fe315a9f></span></span>`);
              }
              _push(` ${ssrInterpolate(d.name)}</button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (searchResults.value.results.services && searchResults.value.results.services.length > 0) {
            _push(`<div class="mb-3" data-v-fe315a9f><p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2" data-v-fe315a9f>Services</p><!--[-->`);
            ssrRenderList(searchResults.value.results.services, (s) => {
              _push(`<button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-400" data-v-fe315a9f>`);
              if (s.image) {
                _push(`<img${ssrRenderAttr("src", `/storage/${s.image}`)}${ssrRenderAttr("alt", s.name)} class="w-8 h-8 rounded-lg object-cover flex-shrink-0" data-v-fe315a9f>`);
              } else {
                _push(`<span class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0" data-v-fe315a9f><span class="w-2 h-2 rounded-full bg-cyan-400" data-v-fe315a9f></span></span>`);
              }
              _push(` ${ssrInterpolate(s.name)}</button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (searchResults.value.results.hospitals && searchResults.value.results.hospitals.length > 0) {
            _push(`<div data-v-fe315a9f><p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2" data-v-fe315a9f>Hospitals</p><!--[-->`);
            ssrRenderList(searchResults.value.results.hospitals, (h) => {
              _push(`<button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-400" data-v-fe315a9f>`);
              if (h.image) {
                _push(`<img${ssrRenderAttr("src", `/storage/${h.image}`)}${ssrRenderAttr("alt", h.name)} class="w-8 h-8 rounded-lg object-cover flex-shrink-0" data-v-fe315a9f>`);
              } else {
                _push(`<span class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0" data-v-fe315a9f><span class="w-2 h-2 rounded-full bg-emerald-400" data-v-fe315a9f></span></span>`);
              }
              _push(` ${ssrInterpolate(h.name)}</button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if ((!searchResults.value.pages || searchResults.value.pages.length === 0) && (!searchResults.value.results || !searchResults.value.results.diseases?.length && !searchResults.value.results.services?.length)) {
          _push(`<div class="p-6 text-center text-slate-500 text-sm" data-v-fe315a9f>No results found. Try a different search term.</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (cityLocations.value.length > 0) {
        _push(`<div class="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-2xl mx-auto" data-v-fe315a9f><span class="text-xs font-semibold text-slate-600 uppercase tracking-wider mr-2" data-v-fe315a9f>Popular:</span><!--[-->`);
        ssrRenderList(cityLocations.value, (loc) => {
          _push(`<button class="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-400 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-300 transition-all" data-v-fe315a9f>${ssrInterpolate(loc.name)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><section class="py-16 relative" data-v-fe315a9f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-fe315a9f><div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6" data-v-fe315a9f><!--[-->`);
      ssrRenderList([{ num: "50,000+", label: "Successful Surgeries", icon: "✦" }, { num: "15+", label: "Hospital Locations", icon: "◎" }, { num: "98%", label: "Success Rate", icon: "◈" }, { num: "25+", label: "Years Experience", icon: "◇" }], (stat, i) => {
        _push(`<div class="group relative" data-v-fe315a9f><div class="absolute -inset-[1px] bg-gradient-to-b from-teal-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" data-v-fe315a9f></div><div class="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-300" data-v-fe315a9f><div class="text-2xl mb-2 opacity-60" data-v-fe315a9f>${ssrInterpolate(stat.icon)}</div><div class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent mb-1" data-v-fe315a9f>${ssrInterpolate(stat.num)}</div><div class="text-xs text-slate-500 font-medium uppercase tracking-wider" data-v-fe315a9f>${ssrInterpolate(stat.label)}</div></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-20" data-v-fe315a9f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-fe315a9f><div class="text-center max-w-3xl mx-auto mb-14" data-v-fe315a9f><h2 class="text-3xl font-extrabold sm:text-4xl" data-v-fe315a9f>Our <span class="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent" data-v-fe315a9f>Specializations</span></h2><p class="mt-4 text-lg text-slate-500" data-v-fe315a9f>From routine checkups to advanced surgical solutions — we treat every eye condition.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14" data-v-fe315a9f><div data-v-fe315a9f><h3 class="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-5 flex items-center gap-2" data-v-fe315a9f><span class="w-2 h-2 rounded-full bg-rose-400" data-v-fe315a9f></span>Eye Conditions We Treat </h3><div class="space-y-3" data-v-fe315a9f><!--[-->`);
      ssrRenderList(__props.diseases, (disease) => {
        _push(`<div class="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-rose-500/30 hover:bg-rose-500/5 transition-all cursor-pointer flex gap-4 items-start" data-v-fe315a9f>`);
        if (disease.image) {
          _push(`<img${ssrRenderAttr("src", `/storage/${disease.image}`)}${ssrRenderAttr("alt", disease.name)} class="w-16 h-16 rounded-xl object-cover flex-shrink-0 ring-1 ring-white/10 group-hover:ring-rose-500/30 transition-all" data-v-fe315a9f>`);
        } else {
          _push(`<div class="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" data-v-fe315a9f></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-fe315a9f></path></svg></div>`);
        }
        _push(`<div data-v-fe315a9f><h4 class="font-bold text-slate-200 group-hover:text-rose-300 transition-colors" data-v-fe315a9f>${ssrInterpolate(disease.name)}</h4><p class="text-sm text-slate-500 mt-1 line-clamp-2" data-v-fe315a9f>${ssrInterpolate(disease.description || "Learn more about this condition and available treatments.")}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div data-v-fe315a9f><h3 class="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5 flex items-center gap-2" data-v-fe315a9f><span class="w-2 h-2 rounded-full bg-cyan-400" data-v-fe315a9f></span>Treatments &amp; Services </h3><div class="space-y-3" data-v-fe315a9f><!--[-->`);
      ssrRenderList(__props.services, (service) => {
        _push(`<div class="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all cursor-pointer flex gap-4 items-start" data-v-fe315a9f>`);
        if (service.image) {
          _push(`<img${ssrRenderAttr("src", `/storage/${service.image}`)}${ssrRenderAttr("alt", service.name)} class="w-16 h-16 rounded-xl object-cover flex-shrink-0 ring-1 ring-white/10 group-hover:ring-cyan-500/30 transition-all" data-v-fe315a9f>`);
        } else {
          _push(`<div class="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" data-v-fe315a9f></path></svg></div>`);
        }
        _push(`<div data-v-fe315a9f><h4 class="font-bold text-slate-200 group-hover:text-cyan-300 transition-colors" data-v-fe315a9f>${ssrInterpolate(service.name)}</h4><p class="text-sm text-slate-500 mt-1 line-clamp-2" data-v-fe315a9f>${ssrInterpolate(service.description || "Expert surgical and diagnostic eye care services.")}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></section><section class="py-20 bg-slate-900/50" data-v-fe315a9f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-fe315a9f><div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4" data-v-fe315a9f><div data-v-fe315a9f><h2 class="text-3xl font-extrabold" data-v-fe315a9f>Explore Expert <span class="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent" data-v-fe315a9f>Guides</span></h2><p class="mt-2 text-slate-500" data-v-fe315a9f>Localized treatment information and hospital recommendations.</p></div><select class="rounded-xl border-white/10 bg-white/5 text-sm py-2.5 px-4 text-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 min-w-[160px]" data-v-fe315a9f><option value="" data-v-fe315a9f${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, "") : ssrLooseEqual(selectedLocation.value, "")) ? " selected" : ""}>All Locations</option><!--[-->`);
      ssrRenderList(cityLocations.value, (loc) => {
        _push(`<option${ssrRenderAttr("value", loc.id)} data-v-fe315a9f${ssrIncludeBooleanAttr(Array.isArray(selectedLocation.value) ? ssrLooseContain(selectedLocation.value, loc.id) : ssrLooseEqual(selectedLocation.value, loc.id)) ? " selected" : ""}>${ssrInterpolate(loc.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="flex gap-2 mb-8" data-v-fe315a9f><button class="${ssrRenderClass([activeTab.value === "all" ? "bg-white/10 text-white border-white/20" : "text-slate-500 border-white/5 hover:bg-white/5", "px-5 py-2 rounded-full text-sm font-semibold transition-all border"])}" data-v-fe315a9f>All</button><button class="${ssrRenderClass([activeTab.value === "service" ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" : "text-slate-500 border-white/5 hover:bg-white/5", "px-5 py-2 rounded-full text-sm font-semibold transition-all border"])}" data-v-fe315a9f>Services</button><button class="${ssrRenderClass([activeTab.value === "disease" ? "bg-rose-500/20 text-rose-300 border-rose-500/30" : "text-slate-500 border-white/5 hover:bg-white/5", "px-5 py-2 rounded-full text-sm font-semibold transition-all border"])}" data-v-fe315a9f>Diseases</button></div>`);
      if (displayBlogs.value.length > 0) {
        _push(`<div class="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scroll-bar -mx-4 px-4 sm:mx-0 sm:px-0" data-v-fe315a9f><!--[-->`);
        ssrRenderList(displayBlogs.value, (blog, index) => {
          _push(ssrRenderComponent(unref(Link), {
            key: index,
            href: blog.url,
            class: "group block w-[85vw] sm:w-[350px] flex-shrink-0 snap-start"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="h-full flex flex-col bg-white/[0.03] rounded-2xl p-7 border border-white/[0.06] hover:border-teal-500/30 hover:bg-white/[0.06] transition-all duration-300" data-v-fe315a9f${_scopeId}><div class="flex items-center gap-3 mb-4" data-v-fe315a9f${_scopeId}><div class="${ssrRenderClass([blog.type === "service" ? "bg-cyan-500/20 text-cyan-400" : "bg-rose-500/20 text-rose-400", "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"])}" data-v-fe315a9f${_scopeId}>`);
                if (blog.type === "service") {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5" data-v-fe315a9f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743" data-v-fe315a9f${_scopeId}></path></svg>`);
                } else {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5" data-v-fe315a9f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" data-v-fe315a9f${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-fe315a9f${_scopeId}></path></svg>`);
                }
                _push2(`</div>`);
                if (blog.location) {
                  _push2(`<span class="text-xs font-medium text-slate-500 bg-white/5 px-2 py-0.5 rounded-full" data-v-fe315a9f${_scopeId}>📍 ${ssrInterpolate(blog.location)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><h3 class="text-base font-bold text-slate-200 mb-2 group-hover:text-teal-300 transition-colors leading-snug" data-v-fe315a9f${_scopeId}>${ssrInterpolate(blog.title)}</h3><p class="text-slate-500 text-sm mt-auto font-medium flex items-center gap-1 group-hover:text-teal-400 transition-colors pt-3" data-v-fe315a9f${_scopeId}> Read Guide <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 group-hover:translate-x-1 transition-transform" data-v-fe315a9f${_scopeId}><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd" data-v-fe315a9f${_scopeId}></path></svg></p></div>`);
              } else {
                return [
                  createVNode("div", { class: "h-full flex flex-col bg-white/[0.03] rounded-2xl p-7 border border-white/[0.06] hover:border-teal-500/30 hover:bg-white/[0.06] transition-all duration-300" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-4" }, [
                      createVNode("div", {
                        class: [blog.type === "service" ? "bg-cyan-500/20 text-cyan-400" : "bg-rose-500/20 text-rose-400", "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"]
                      }, [
                        blog.type === "service" ? (openBlock(), createBlock("svg", {
                          key: 0,
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "w-5 h-5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743"
                          })
                        ])) : (openBlock(), createBlock("svg", {
                          key: 1,
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
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
                      ], 2),
                      blog.location ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-xs font-medium text-slate-500 bg-white/5 px-2 py-0.5 rounded-full"
                      }, "📍 " + toDisplayString(blog.location), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("h3", { class: "text-base font-bold text-slate-200 mb-2 group-hover:text-teal-300 transition-colors leading-snug" }, toDisplayString(blog.title), 1),
                    createVNode("p", { class: "text-slate-500 text-sm mt-auto font-medium flex items-center gap-1 group-hover:text-teal-400 transition-colors pt-3" }, [
                      createTextVNode(" Read Guide "),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor",
                        class: "w-4 h-4 group-hover:translate-x-1 transition-transform"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z",
                          "clip-rule": "evenodd"
                        })
                      ]))
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-16 text-slate-500" data-v-fe315a9f><p class="text-lg" data-v-fe315a9f>No guides available for this filter.</p><p class="text-sm mt-1" data-v-fe315a9f>Try selecting a different location or category.</p></div>`);
      }
      _push(`</div></section>`);
      if (__props.hospitals.length > 0) {
        _push(`<section class="py-20" data-v-fe315a9f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-fe315a9f><div class="text-center max-w-3xl mx-auto mb-14" data-v-fe315a9f><h2 class="text-3xl font-extrabold sm:text-4xl" data-v-fe315a9f>Our Hospital <span class="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent" data-v-fe315a9f>Network</span></h2><p class="mt-4 text-lg text-slate-500" data-v-fe315a9f>Find the Blink Eye branch closest to you.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-fe315a9f><!--[-->`);
        ssrRenderList(__props.hospitals, (hospital) => {
          _push(`<div class="group relative" data-v-fe315a9f><div class="absolute -inset-[1px] bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" data-v-fe315a9f></div><div class="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.06] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden" data-v-fe315a9f>`);
          if (hospital.image) {
            _push(`<div class="h-44 w-full" data-v-fe315a9f><img${ssrRenderAttr("src", `/storage/${hospital.image}`)}${ssrRenderAttr("alt", hospital.name)} class="w-full h-full object-cover" data-v-fe315a9f></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="p-8" data-v-fe315a9f>`);
          if (!hospital.image) {
            _push(`<div class="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-5" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" data-v-fe315a9f></path></svg></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<h3 class="text-xl font-bold text-white mb-1" data-v-fe315a9f>${ssrInterpolate(hospital.name)}</h3><p class="text-sm text-slate-500 mb-4" data-v-fe315a9f>${ssrInterpolate(hospital.location ? hospital.location.name : "Location TBD")}</p><div class="space-y-2 text-sm text-slate-400" data-v-fe315a9f>`);
          if (hospital.phone) {
            _push(`<a${ssrRenderAttr("href", "tel:" + hospital.phone)} class="flex items-center gap-2 hover:text-teal-400 transition-colors" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" data-v-fe315a9f></path></svg> ${ssrInterpolate(hospital.phone)}</a>`);
          } else {
            _push(`<!---->`);
          }
          if (hospital.email) {
            _push(`<a${ssrRenderAttr("href", "mailto:" + hospital.email)} class="flex items-center gap-2 hover:text-teal-400 transition-colors" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" data-v-fe315a9f></path></svg> ${ssrInterpolate(hospital.email)}</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section id="lead-form" class="py-20 relative overflow-hidden" data-v-fe315a9f><div class="absolute inset-0" data-v-fe315a9f><div class="absolute inset-0 bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950" data-v-fe315a9f></div><div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-500/10 blur-[120px]" data-v-fe315a9f></div><div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" data-v-fe315a9f></div></div><div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-v-fe315a9f><h2 class="text-3xl sm:text-4xl font-extrabold mb-4" data-v-fe315a9f>Request a <span class="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent" data-v-fe315a9f>Free Consultation</span></h2><p class="text-lg text-slate-500 mb-10" data-v-fe315a9f>Leave your details and our eye care experts will call you back within minutes.</p><form class="max-w-lg mx-auto" data-v-fe315a9f><div class="relative group" data-v-fe315a9f><div class="absolute -inset-[1px] bg-gradient-to-r from-teal-500/30 to-cyan-500/30 rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500" data-v-fe315a9f></div><div class="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06]" data-v-fe315a9f><div class="flex flex-col sm:flex-row gap-3" data-v-fe315a9f><input${ssrRenderAttr("value", unref(form).name)} type="text" required placeholder="Your Name" class="flex-1 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 px-5 py-3.5 focus:border-teal-400 focus:ring-teal-400 backdrop-blur-sm" data-v-fe315a9f><input${ssrRenderAttr("value", unref(form).phone)} type="tel" required placeholder="Phone Number" class="flex-1 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 px-5 py-3.5 focus:border-teal-400 focus:ring-teal-400 backdrop-blur-sm" data-v-fe315a9f></div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full mt-4 px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50 glow-btn" data-v-fe315a9f>${ssrInterpolate(unref(form).processing ? "Submitting..." : "📞 Call Me Back")}</button></div></div></form></div></section><section class="py-20" data-v-fe315a9f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-fe315a9f><div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" data-v-fe315a9f><!--[-->`);
      ssrRenderList([{ title: "Expert Surgeons", desc: "Board-certified specialists with decades of experience in complex eye procedures.", color: "teal" }, { title: "Advanced Technology", desc: "Equipped with the latest laser and robotic systems for unmatched precision.", color: "cyan" }, { title: "Compassionate Care", desc: "Patient-first approach ensuring comfort and peace of mind at every step.", color: "rose" }], (feat, i) => {
        _push(`<div class="group" data-v-fe315a9f><div class="relative bg-white/[0.03] rounded-2xl p-8 border border-white/[0.06] hover:bg-white/[0.06] transition-all duration-300" data-v-fe315a9f><div class="${ssrRenderClass(["mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110", feat.color === "teal" ? "bg-teal-500/20 text-teal-400" : feat.color === "cyan" ? "bg-cyan-500/20 text-cyan-400" : "bg-rose-500/20 text-rose-400"])}" data-v-fe315a9f>`);
        if (feat.color === "teal") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" data-v-fe315a9f></path></svg>`);
        } else if (feat.color === "cyan") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" data-v-fe315a9f></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" data-v-fe315a9f></path></svg>`);
        }
        _push(`</div><h3 class="text-xl font-bold text-white mb-2" data-v-fe315a9f>${ssrInterpolate(feat.title)}</h3><p class="text-slate-500 text-sm" data-v-fe315a9f>${ssrInterpolate(feat.desc)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section><footer class="border-t border-white/5 pt-12 pb-8" data-v-fe315a9f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-fe315a9f><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" data-v-fe315a9f><div data-v-fe315a9f><div class="flex items-center gap-3 mb-4" data-v-fe315a9f><div class="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center" data-v-fe315a9f><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="white" class="w-4 h-4" data-v-fe315a9f><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" data-v-fe315a9f></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" data-v-fe315a9f></path></svg></div><span class="text-lg font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent" data-v-fe315a9f>Blink Eye</span></div><p class="text-sm text-slate-600" data-v-fe315a9f>Advanced eye care across multiple locations in India. Personalized care, world-class results.</p></div><div data-v-fe315a9f><h4 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4" data-v-fe315a9f>Quick Links</h4><ul class="space-y-2 text-sm" data-v-fe315a9f><!--[-->`);
      ssrRenderList(__props.diseases.slice(0, 4), (disease) => {
        _push(`<li data-v-fe315a9f><button class="text-slate-600 hover:text-teal-400 transition-colors" data-v-fe315a9f>${ssrInterpolate(disease.name)}</button></li>`);
      });
      _push(`<!--]--></ul></div><div data-v-fe315a9f><h4 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4" data-v-fe315a9f>Our Branches</h4><ul class="space-y-2 text-sm" data-v-fe315a9f><!--[-->`);
      ssrRenderList(__props.hospitals, (hospital) => {
        _push(`<li class="text-slate-600" data-v-fe315a9f>${ssrInterpolate(hospital.name)}</li>`);
      });
      _push(`<!--]--></ul></div></div><div class="border-t border-white/5 pt-8 text-sm text-center text-slate-700" data-v-fe315a9f> © 2026 Blink Eye Hospitals. All rights reserved. </div></div></footer></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Welcome = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fe315a9f"]]);
export {
  Welcome as default
};
