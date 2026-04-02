import { ref, unref, withCtx, createTextVNode, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, vModelSelect, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AdminLayout-D4Zb0PfS.js";
import "@headlessui/vue";
import "@heroicons/vue/24/outline";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    locations: Array
  },
  setup(__props) {
    const form = useForm({
      name: "",
      domain: "",
      subdomain: "",
      email: "",
      phone: "",
      location_id: "",
      lat: "",
      lng: "",
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
      form.post(route("admin.hospitals.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Create Branch" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="sm:flex sm:items-center"${_scopeId}><div class="sm:flex-auto"${_scopeId}><h1 class="text-base font-semibold leading-6 text-gray-900"${_scopeId}>Add Clinic Branch</h1><p class="mt-2 text-sm text-gray-700"${_scopeId}>Register a new physical Blink Eye location and hook it into the geo-network.</p></div><div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.hospitals.index"),
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
            _push2(`</div></div><div class="mt-8 max-w-2xl bg-white shadow sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"${_scopeId}><div class="sm:col-span-6"${_scopeId}><label for="name" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Branch Name</label><div class="mt-2"${_scopeId}><input type="text" id="name"${ssrRenderAttr("value", unref(form).name)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required placeholder="Blink Eye Chandigarh"${_scopeId}></div>`);
            if (unref(form).errors.name) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-3"${_scopeId}><label for="location_id" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Assigned City / Region</label><div class="mt-2"${_scopeId}><select id="location_id" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).location_id) ? ssrLooseContain(unref(form).location_id, "") : ssrLooseEqual(unref(form).location_id, "")) ? " selected" : ""}${_scopeId}>-- Select geographic node --</option><!--[-->`);
            ssrRenderList(__props.locations, (loc) => {
              _push2(`<option${ssrRenderAttr("value", loc.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).location_id) ? ssrLooseContain(unref(form).location_id, loc.id) : ssrLooseEqual(unref(form).location_id, loc.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(loc.name)} (${ssrInterpolate(loc.type)}) </option>`);
            });
            _push2(`<!--]--></select></div>`);
            if (unref(form).errors.location_id) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.location_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-3"${_scopeId}><label for="phone" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Local Phone</label><div class="mt-2"${_scopeId}><input type="tel" id="phone"${ssrRenderAttr("value", unref(form).phone)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" placeholder="+91 XXXXX XXXXX"${_scopeId}></div>`);
            if (unref(form).errors.phone) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-6"${_scopeId}><label for="email" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Local Email</label><div class="mt-2"${_scopeId}><input type="email" id="email"${ssrRenderAttr("value", unref(form).email)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" placeholder="chandigarh@blinkeye.in"${_scopeId}></div>`);
            if (unref(form).errors.email) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:border-t sm:border-gray-200 sm:col-span-6 sm:pt-5"${_scopeId}><h3 class="text-sm font-medium leading-6 text-gray-900"${_scopeId}>Routing &amp; Domain Setup (Optional)</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>Only needed if this branch requires custom subdomain isolated routing.</p></div><div class="sm:col-span-3"${_scopeId}><label for="subdomain" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Subdomain</label><div class="mt-2 relative rounded-md shadow-sm"${_scopeId}><input type="text" id="subdomain"${ssrRenderAttr("value", unref(form).subdomain)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" placeholder="chandigarh"${_scopeId}><div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"${_scopeId}><span class="text-gray-500 sm:text-sm"${_scopeId}>.blinkeye.in</span></div></div>`);
            if (unref(form).errors.subdomain) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.subdomain)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-3"${_scopeId}><label for="domain" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Custom Domain</label><div class="mt-2"${_scopeId}><input type="text" id="domain"${ssrRenderAttr("value", unref(form).domain)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6" placeholder="www.blinkeyechandigarh.in"${_scopeId}></div>`);
            if (unref(form).errors.domain) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.domain)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:border-t sm:border-gray-200 sm:col-span-6 sm:pt-5"${_scopeId}><h3 class="text-sm font-medium leading-6 text-gray-900"${_scopeId}>Geo Positioning (Required for Distance Matching)</h3></div><div class="sm:col-span-3"${_scopeId}><label for="lat" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Latitude</label><div class="mt-2"${_scopeId}><input type="text" id="lat"${ssrRenderAttr("value", unref(form).lat)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"${_scopeId}></div>`);
            if (unref(form).errors.lat) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.lat)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-3"${_scopeId}><label for="lng" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Longitude</label><div class="mt-2"${_scopeId}><input type="text" id="lng"${ssrRenderAttr("value", unref(form).lng)} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"${_scopeId}></div>`);
            if (unref(form).errors.lng) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.lng)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="sm:col-span-6"${_scopeId}><label for="image" class="block text-sm font-medium leading-6 text-gray-900"${_scopeId}>Branch Photo</label><div class="mt-2 flex items-center gap-x-4"${_scopeId}>`);
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
            _push2(`</div><div class="sm:col-span-6"${_scopeId}><div class="relative flex items-start"${_scopeId}><div class="flex h-6 items-center"${_scopeId}><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-medical-blue-600 focus:ring-medical-blue-600"${_scopeId}></div><div class="ml-3 text-sm leading-6"${_scopeId}><label for="is_active" class="font-medium text-gray-900"${_scopeId}>Active</label><p class="text-gray-500"${_scopeId}>Should this hospital branch receive active leads and page routing?</p></div></div></div></div><div class="mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin.hospitals.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex justify-center rounded-md bg-medical-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-medical-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue-600"${_scopeId}> Save Branch </button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "sm:flex sm:items-center" }, [
                createVNode("div", { class: "sm:flex-auto" }, [
                  createVNode("h1", { class: "text-base font-semibold leading-6 text-gray-900" }, "Add Clinic Branch"),
                  createVNode("p", { class: "mt-2 text-sm text-gray-700" }, "Register a new physical Blink Eye location and hook it into the geo-network.")
                ]),
                createVNode("div", { class: "mt-4 sm:ml-16 sm:mt-0 sm:flex-none" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("admin.hospitals.index"),
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
                        }, "Branch Name"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "name",
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            required: "",
                            placeholder: "Blink Eye Chandigarh"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ])
                        ]),
                        unref(form).errors.name ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-3" }, [
                        createVNode("label", {
                          for: "location_id",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Assigned City / Region"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("select", {
                            id: "location_id",
                            "onUpdate:modelValue": ($event) => unref(form).location_id = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            required: ""
                          }, [
                            createVNode("option", {
                              value: "",
                              disabled: ""
                            }, "-- Select geographic node --"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.locations, (loc) => {
                              return openBlock(), createBlock("option", {
                                key: loc.id,
                                value: loc.id
                              }, toDisplayString(loc.name) + " (" + toDisplayString(loc.type) + ") ", 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).location_id]
                          ])
                        ]),
                        unref(form).errors.location_id ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.location_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-3" }, [
                        createVNode("label", {
                          for: "phone",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Local Phone"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("input", {
                            type: "tel",
                            id: "phone",
                            "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            placeholder: "+91 XXXXX XXXXX"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).phone]
                          ])
                        ]),
                        unref(form).errors.phone ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-6" }, [
                        createVNode("label", {
                          for: "email",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Local Email"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("input", {
                            type: "email",
                            id: "email",
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            placeholder: "chandigarh@blinkeye.in"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ])
                        ]),
                        unref(form).errors.email ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:border-t sm:border-gray-200 sm:col-span-6 sm:pt-5" }, [
                        createVNode("h3", { class: "text-sm font-medium leading-6 text-gray-900" }, "Routing & Domain Setup (Optional)"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Only needed if this branch requires custom subdomain isolated routing.")
                      ]),
                      createVNode("div", { class: "sm:col-span-3" }, [
                        createVNode("label", {
                          for: "subdomain",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Subdomain"),
                        createVNode("div", { class: "mt-2 relative rounded-md shadow-sm" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "subdomain",
                            "onUpdate:modelValue": ($event) => unref(form).subdomain = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            placeholder: "chandigarh"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).subdomain]
                          ]),
                          createVNode("div", { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" }, [
                            createVNode("span", { class: "text-gray-500 sm:text-sm" }, ".blinkeye.in")
                          ])
                        ]),
                        unref(form).errors.subdomain ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.subdomain), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-3" }, [
                        createVNode("label", {
                          for: "domain",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Custom Domain"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "domain",
                            "onUpdate:modelValue": ($event) => unref(form).domain = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6",
                            placeholder: "www.blinkeyechandigarh.in"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).domain]
                          ])
                        ]),
                        unref(form).errors.domain ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.domain), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:border-t sm:border-gray-200 sm:col-span-6 sm:pt-5" }, [
                        createVNode("h3", { class: "text-sm font-medium leading-6 text-gray-900" }, "Geo Positioning (Required for Distance Matching)")
                      ]),
                      createVNode("div", { class: "sm:col-span-3" }, [
                        createVNode("label", {
                          for: "lat",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Latitude"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "lat",
                            "onUpdate:modelValue": ($event) => unref(form).lat = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).lat]
                          ])
                        ]),
                        unref(form).errors.lat ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.lat), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-3" }, [
                        createVNode("label", {
                          for: "lng",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Longitude"),
                        createVNode("div", { class: "mt-2" }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "lng",
                            "onUpdate:modelValue": ($event) => unref(form).lng = $event,
                            class: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-medical-blue-600 sm:text-sm sm:leading-6"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).lng]
                          ])
                        ]),
                        unref(form).errors.lng ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.lng), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "sm:col-span-6" }, [
                        createVNode("label", {
                          for: "image",
                          class: "block text-sm font-medium leading-6 text-gray-900"
                        }, "Branch Photo"),
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
                            createVNode("p", { class: "text-gray-500" }, "Should this hospital branch receive active leads and page routing?")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10 pt-6" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin.hospitals.index"),
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
                      }, " Save Branch ", 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Hospitals/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
