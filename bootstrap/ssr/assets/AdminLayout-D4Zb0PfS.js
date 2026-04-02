import { ref, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, createTextVNode, toDisplayString, Fragment, renderList, Transition, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { TransitionRoot, Dialog, TransitionChild, DialogPanel, Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { HomeIcon, MapPinIcon, BuildingOfficeIcon, TagIcon, DocumentTextIcon, UserGroupIcon, ChartBarIcon, ShieldCheckIcon, XMarkIcon, Bars3Icon } from "@heroicons/vue/24/outline";
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarOpen = ref(false);
    const navigation = [
      { name: "Dashboard", href: route("admin.dashboard.index"), icon: HomeIcon, current: route().current("admin.dashboard.index") },
      { name: "Locations", href: route("admin.locations.index"), icon: MapPinIcon, current: route().current("admin.locations.*") },
      { name: "Hospitals", href: route("admin.hospitals.index"), icon: BuildingOfficeIcon, current: route().current("admin.hospitals.*") },
      { name: "Diseases", href: route("admin.diseases.index"), icon: TagIcon, current: route().current("admin.diseases.*") },
      { name: "Services", href: route("admin.services.index"), icon: TagIcon, current: route().current("admin.services.*") },
      { name: "Grouping Engine", href: route("admin.groups.index"), icon: DocumentTextIcon, current: route().current("admin.groups.*") },
      { name: "Blog Templates", href: route("admin.templates.index"), icon: DocumentTextIcon, current: route().current("admin.templates.*") },
      { name: "Leads", href: route("admin.leads.index"), icon: UserGroupIcon, current: route().current("admin.leads.*") },
      { name: "Analytics", href: "#", icon: ChartBarIcon, current: false },
      { name: "User Management", href: "#", icon: ShieldCheckIcon, current: false }
    ];
    const page = usePage();
    const user = page.props.auth.user;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(TransitionRoot), {
        as: "template",
        show: sidebarOpen.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Dialog), {
              as: "div",
              class: "relative z-50 lg:hidden",
              onClose: ($event) => sidebarOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transition-opacity ease-linear duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-gray-900/80"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-gray-900/80" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 flex"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(TransitionChild), {
                    as: "template",
                    enter: "transition ease-in-out duration-300 transform",
                    "enter-from": "-translate-x-full",
                    "enter-to": "translate-x-0",
                    leave: "transition ease-in-out duration-300 transform",
                    "leave-from": "translate-x-0",
                    "leave-to": "-translate-x-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(DialogPanel), { class: "relative mr-16 flex w-full max-w-xs flex-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(TransitionChild), {
                                as: "template",
                                enter: "ease-in-out duration-300",
                                "enter-from": "opacity-0",
                                "enter-to": "opacity-100",
                                leave: "ease-in-out duration-300",
                                "leave-from": "opacity-100",
                                "leave-to": "opacity-0"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="absolute left-full top-0 flex w-16 justify-center pt-5"${_scopeId5}><button type="button" class="-m-2.5 p-2.5"${_scopeId5}><span class="sr-only"${_scopeId5}>Close sidebar</span>`);
                                    _push6(ssrRenderComponent(unref(XMarkIcon), {
                                      class: "h-6 w-6 text-white",
                                      "aria-hidden": "true"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`</button></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "absolute left-full top-0 flex w-16 justify-center pt-5" }, [
                                        createVNode("button", {
                                          type: "button",
                                          class: "-m-2.5 p-2.5",
                                          onClick: ($event) => sidebarOpen.value = false
                                        }, [
                                          createVNode("span", { class: "sr-only" }, "Close sidebar"),
                                          createVNode(unref(XMarkIcon), {
                                            class: "h-6 w-6 text-white",
                                            "aria-hidden": "true"
                                          })
                                        ], 8, ["onClick"])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-medical-blue-900 px-6 pb-4"${_scopeId4}><div class="flex h-16 shrink-0 items-center"${_scopeId4}><h1 class="text-2xl font-bold text-white"${_scopeId4}>Blink Eye</h1></div><nav class="flex flex-1 flex-col"${_scopeId4}><ul role="list" class="flex flex-1 flex-col gap-y-7"${_scopeId4}><li${_scopeId4}><ul role="list" class="-mx-2 space-y-1"${_scopeId4}><!--[-->`);
                              ssrRenderList(navigation, (item) => {
                                _push5(`<li${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(Link), {
                                  href: item.href,
                                  class: [item.current ? "bg-medical-blue-800 text-white" : "text-medical-blue-100 hover:text-white hover:bg-medical-blue-800", "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"]
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      ssrRenderVNode(_push6, createVNode(resolveDynamicComponent(item.icon), {
                                        class: [item.current ? "text-white" : "text-medical-blue-200 group-hover:text-white", "h-6 w-6 shrink-0"],
                                        "aria-hidden": "true"
                                      }, null), _parent6, _scopeId5);
                                      _push6(` ${ssrInterpolate(item.name)}`);
                                    } else {
                                      return [
                                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                          class: [item.current ? "text-white" : "text-medical-blue-200 group-hover:text-white", "h-6 w-6 shrink-0"],
                                          "aria-hidden": "true"
                                        }, null, 8, ["class"])),
                                        createTextVNode(" " + toDisplayString(item.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</li>`);
                              });
                              _push5(`<!--]--></ul></li></ul></nav></div>`);
                            } else {
                              return [
                                createVNode(unref(TransitionChild), {
                                  as: "template",
                                  enter: "ease-in-out duration-300",
                                  "enter-from": "opacity-0",
                                  "enter-to": "opacity-100",
                                  leave: "ease-in-out duration-300",
                                  "leave-from": "opacity-100",
                                  "leave-to": "opacity-0"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "absolute left-full top-0 flex w-16 justify-center pt-5" }, [
                                      createVNode("button", {
                                        type: "button",
                                        class: "-m-2.5 p-2.5",
                                        onClick: ($event) => sidebarOpen.value = false
                                      }, [
                                        createVNode("span", { class: "sr-only" }, "Close sidebar"),
                                        createVNode(unref(XMarkIcon), {
                                          class: "h-6 w-6 text-white",
                                          "aria-hidden": "true"
                                        })
                                      ], 8, ["onClick"])
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-medical-blue-900 px-6 pb-4" }, [
                                  createVNode("div", { class: "flex h-16 shrink-0 items-center" }, [
                                    createVNode("h1", { class: "text-2xl font-bold text-white" }, "Blink Eye")
                                  ]),
                                  createVNode("nav", { class: "flex flex-1 flex-col" }, [
                                    createVNode("ul", {
                                      role: "list",
                                      class: "flex flex-1 flex-col gap-y-7"
                                    }, [
                                      createVNode("li", null, [
                                        createVNode("ul", {
                                          role: "list",
                                          class: "-mx-2 space-y-1"
                                        }, [
                                          (openBlock(), createBlock(Fragment, null, renderList(navigation, (item) => {
                                            return createVNode("li", {
                                              key: item.name
                                            }, [
                                              createVNode(unref(Link), {
                                                href: item.href,
                                                class: [item.current ? "bg-medical-blue-800 text-white" : "text-medical-blue-100 hover:text-white hover:bg-medical-blue-800", "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"]
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                    class: [item.current ? "text-white" : "text-medical-blue-200 group-hover:text-white", "h-6 w-6 shrink-0"],
                                                    "aria-hidden": "true"
                                                  }, null, 8, ["class"])),
                                                  createTextVNode(" " + toDisplayString(item.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["href", "class"])
                                            ]);
                                          }), 64))
                                        ])
                                      ])
                                    ])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(DialogPanel), { class: "relative mr-16 flex w-full max-w-xs flex-1" }, {
                            default: withCtx(() => [
                              createVNode(unref(TransitionChild), {
                                as: "template",
                                enter: "ease-in-out duration-300",
                                "enter-from": "opacity-0",
                                "enter-to": "opacity-100",
                                leave: "ease-in-out duration-300",
                                "leave-from": "opacity-100",
                                "leave-to": "opacity-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "absolute left-full top-0 flex w-16 justify-center pt-5" }, [
                                    createVNode("button", {
                                      type: "button",
                                      class: "-m-2.5 p-2.5",
                                      onClick: ($event) => sidebarOpen.value = false
                                    }, [
                                      createVNode("span", { class: "sr-only" }, "Close sidebar"),
                                      createVNode(unref(XMarkIcon), {
                                        class: "h-6 w-6 text-white",
                                        "aria-hidden": "true"
                                      })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-medical-blue-900 px-6 pb-4" }, [
                                createVNode("div", { class: "flex h-16 shrink-0 items-center" }, [
                                  createVNode("h1", { class: "text-2xl font-bold text-white" }, "Blink Eye")
                                ]),
                                createVNode("nav", { class: "flex flex-1 flex-col" }, [
                                  createVNode("ul", {
                                    role: "list",
                                    class: "flex flex-1 flex-col gap-y-7"
                                  }, [
                                    createVNode("li", null, [
                                      createVNode("ul", {
                                        role: "list",
                                        class: "-mx-2 space-y-1"
                                      }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(navigation, (item) => {
                                          return createVNode("li", {
                                            key: item.name
                                          }, [
                                            createVNode(unref(Link), {
                                              href: item.href,
                                              class: [item.current ? "bg-medical-blue-800 text-white" : "text-medical-blue-100 hover:text-white hover:bg-medical-blue-800", "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"]
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                  class: [item.current ? "text-white" : "text-medical-blue-200 group-hover:text-white", "h-6 w-6 shrink-0"],
                                                  "aria-hidden": "true"
                                                }, null, 8, ["class"])),
                                                createTextVNode(" " + toDisplayString(item.name), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["href", "class"])
                                          ]);
                                        }), 64))
                                      ])
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "transition-opacity ease-linear duration-300",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "transition-opacity ease-linear duration-300",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-gray-900/80" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 flex" }, [
                      createVNode(unref(TransitionChild), {
                        as: "template",
                        enter: "transition ease-in-out duration-300 transform",
                        "enter-from": "-translate-x-full",
                        "enter-to": "translate-x-0",
                        leave: "transition ease-in-out duration-300 transform",
                        "leave-from": "translate-x-0",
                        "leave-to": "-translate-x-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DialogPanel), { class: "relative mr-16 flex w-full max-w-xs flex-1" }, {
                            default: withCtx(() => [
                              createVNode(unref(TransitionChild), {
                                as: "template",
                                enter: "ease-in-out duration-300",
                                "enter-from": "opacity-0",
                                "enter-to": "opacity-100",
                                leave: "ease-in-out duration-300",
                                "leave-from": "opacity-100",
                                "leave-to": "opacity-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "absolute left-full top-0 flex w-16 justify-center pt-5" }, [
                                    createVNode("button", {
                                      type: "button",
                                      class: "-m-2.5 p-2.5",
                                      onClick: ($event) => sidebarOpen.value = false
                                    }, [
                                      createVNode("span", { class: "sr-only" }, "Close sidebar"),
                                      createVNode(unref(XMarkIcon), {
                                        class: "h-6 w-6 text-white",
                                        "aria-hidden": "true"
                                      })
                                    ], 8, ["onClick"])
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-medical-blue-900 px-6 pb-4" }, [
                                createVNode("div", { class: "flex h-16 shrink-0 items-center" }, [
                                  createVNode("h1", { class: "text-2xl font-bold text-white" }, "Blink Eye")
                                ]),
                                createVNode("nav", { class: "flex flex-1 flex-col" }, [
                                  createVNode("ul", {
                                    role: "list",
                                    class: "flex flex-1 flex-col gap-y-7"
                                  }, [
                                    createVNode("li", null, [
                                      createVNode("ul", {
                                        role: "list",
                                        class: "-mx-2 space-y-1"
                                      }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(navigation, (item) => {
                                          return createVNode("li", {
                                            key: item.name
                                          }, [
                                            createVNode(unref(Link), {
                                              href: item.href,
                                              class: [item.current ? "bg-medical-blue-800 text-white" : "text-medical-blue-100 hover:text-white hover:bg-medical-blue-800", "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"]
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                  class: [item.current ? "text-white" : "text-medical-blue-200 group-hover:text-white", "h-6 w-6 shrink-0"],
                                                  "aria-hidden": "true"
                                                }, null, 8, ["class"])),
                                                createTextVNode(" " + toDisplayString(item.name), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["href", "class"])
                                          ]);
                                        }), 64))
                                      ])
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Dialog), {
                as: "div",
                class: "relative z-50 lg:hidden",
                onClose: ($event) => sidebarOpen.value = false
              }, {
                default: withCtx(() => [
                  createVNode(unref(TransitionChild), {
                    as: "template",
                    enter: "transition-opacity ease-linear duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "transition-opacity ease-linear duration-300",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-gray-900/80" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 flex" }, [
                    createVNode(unref(TransitionChild), {
                      as: "template",
                      enter: "transition ease-in-out duration-300 transform",
                      "enter-from": "-translate-x-full",
                      "enter-to": "translate-x-0",
                      leave: "transition ease-in-out duration-300 transform",
                      "leave-from": "translate-x-0",
                      "leave-to": "-translate-x-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(DialogPanel), { class: "relative mr-16 flex w-full max-w-xs flex-1" }, {
                          default: withCtx(() => [
                            createVNode(unref(TransitionChild), {
                              as: "template",
                              enter: "ease-in-out duration-300",
                              "enter-from": "opacity-0",
                              "enter-to": "opacity-100",
                              leave: "ease-in-out duration-300",
                              "leave-from": "opacity-100",
                              "leave-to": "opacity-0"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "absolute left-full top-0 flex w-16 justify-center pt-5" }, [
                                  createVNode("button", {
                                    type: "button",
                                    class: "-m-2.5 p-2.5",
                                    onClick: ($event) => sidebarOpen.value = false
                                  }, [
                                    createVNode("span", { class: "sr-only" }, "Close sidebar"),
                                    createVNode(unref(XMarkIcon), {
                                      class: "h-6 w-6 text-white",
                                      "aria-hidden": "true"
                                    })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-medical-blue-900 px-6 pb-4" }, [
                              createVNode("div", { class: "flex h-16 shrink-0 items-center" }, [
                                createVNode("h1", { class: "text-2xl font-bold text-white" }, "Blink Eye")
                              ]),
                              createVNode("nav", { class: "flex flex-1 flex-col" }, [
                                createVNode("ul", {
                                  role: "list",
                                  class: "flex flex-1 flex-col gap-y-7"
                                }, [
                                  createVNode("li", null, [
                                    createVNode("ul", {
                                      role: "list",
                                      class: "-mx-2 space-y-1"
                                    }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(navigation, (item) => {
                                        return createVNode("li", {
                                          key: item.name
                                        }, [
                                          createVNode(unref(Link), {
                                            href: item.href,
                                            class: [item.current ? "bg-medical-blue-800 text-white" : "text-medical-blue-100 hover:text-white hover:bg-medical-blue-800", "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"]
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                class: [item.current ? "text-white" : "text-medical-blue-200 group-hover:text-white", "h-6 w-6 shrink-0"],
                                                "aria-hidden": "true"
                                              }, null, 8, ["class"])),
                                              createTextVNode(" " + toDisplayString(item.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["href", "class"])
                                        ]);
                                      }), 64))
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"><div class="flex grow flex-col gap-y-5 overflow-y-auto bg-medical-blue-900 px-6 pb-4"><div class="flex h-16 shrink-0 items-center"><h1 class="text-2xl font-bold text-white tracking-tight">Blink Eye Admin</h1></div><nav class="flex flex-1 flex-col"><ul role="list" class="flex flex-1 flex-col gap-y-7"><li><ul role="list" class="-mx-2 space-y-1"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: item.href,
          class: [item.current ? "bg-medical-blue-800 text-white" : "text-medical-blue-100 hover:text-white hover:bg-medical-blue-800", "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), {
                class: [item.current ? "text-white" : "text-medical-blue-200 group-hover:text-white", "h-6 w-6 shrink-0"],
                "aria-hidden": "true"
              }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(item.name)}`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                  class: [item.current ? "text-white" : "text-medical-blue-200 group-hover:text-white", "h-6 w-6 shrink-0"],
                  "aria-hidden": "true"
                }, null, 8, ["class"])),
                createTextVNode(" " + toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></li></ul></nav></div></div><div class="lg:pl-72 flex flex-col min-h-screen bg-slate-50"><div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"><button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden"><span class="sr-only">Open sidebar</span>`);
      _push(ssrRenderComponent(unref(Bars3Icon), {
        class: "h-6 w-6",
        "aria-hidden": "true"
      }, null, _parent));
      _push(`</button><div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true"></div><div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6"><div class="flex flex-1"></div><div class="flex items-center gap-x-4 lg:gap-x-6">`);
      _push(ssrRenderComponent(unref(Menu), {
        as: "div",
        class: "relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(MenuButton), { class: "-m-1.5 flex items-center p-1.5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="sr-only"${_scopeId2}>Open user menu</span><div class="h-8 w-8 rounded-full bg-medical-blue-500 flex items-center justify-center text-white font-semibold"${_scopeId2}>${ssrInterpolate(unref(user).name.charAt(0))}</div><span class="hidden lg:flex lg:items-center"${_scopeId2}><span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true"${_scopeId2}>${ssrInterpolate(unref(user).name)}</span></span>`);
                } else {
                  return [
                    createVNode("span", { class: "sr-only" }, "Open user menu"),
                    createVNode("div", { class: "h-8 w-8 rounded-full bg-medical-blue-500 flex items-center justify-center text-white font-semibold" }, toDisplayString(unref(user).name.charAt(0)), 1),
                    createVNode("span", { class: "hidden lg:flex lg:items-center" }, [
                      createVNode("span", {
                        class: "ml-4 text-sm font-semibold leading-6 text-gray-900",
                        "aria-hidden": "true"
                      }, toDisplayString(unref(user).name), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(``);
            _push2(ssrRenderComponent(unref(MenuItems), { class: "absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(MenuItem), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Link), {
                          href: _ctx.route("profile.edit"),
                          class: [active ? "bg-gray-50" : "", "block px-3 py-1 text-sm leading-6 text-gray-900"]
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Profile`);
                            } else {
                              return [
                                createTextVNode("Profile")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Link), {
                            href: _ctx.route("profile.edit"),
                            class: [active ? "bg-gray-50" : "", "block px-3 py-1 text-sm leading-6 text-gray-900"]
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Profile")
                            ]),
                            _: 1
                          }, 8, ["href", "class"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(MenuItem), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Link), {
                          href: _ctx.route("logout"),
                          method: "post",
                          as: "button",
                          class: [active ? "bg-gray-50" : "", "block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900"]
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sign out`);
                            } else {
                              return [
                                createTextVNode("Sign out")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Link), {
                            href: _ctx.route("logout"),
                            method: "post",
                            as: "button",
                            class: [active ? "bg-gray-50" : "", "block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900"]
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sign out")
                            ]),
                            _: 1
                          }, 8, ["href", "class"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(MenuItem), null, {
                      default: withCtx(({ active }) => [
                        createVNode(unref(Link), {
                          href: _ctx.route("profile.edit"),
                          class: [active ? "bg-gray-50" : "", "block px-3 py-1 text-sm leading-6 text-gray-900"]
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Profile")
                          ]),
                          _: 1
                        }, 8, ["href", "class"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MenuItem), null, {
                      default: withCtx(({ active }) => [
                        createVNode(unref(Link), {
                          href: _ctx.route("logout"),
                          method: "post",
                          as: "button",
                          class: [active ? "bg-gray-50" : "", "block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900"]
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Sign out")
                          ]),
                          _: 1
                        }, 8, ["href", "class"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(MenuButton), { class: "-m-1.5 flex items-center p-1.5" }, {
                default: withCtx(() => [
                  createVNode("span", { class: "sr-only" }, "Open user menu"),
                  createVNode("div", { class: "h-8 w-8 rounded-full bg-medical-blue-500 flex items-center justify-center text-white font-semibold" }, toDisplayString(unref(user).name.charAt(0)), 1),
                  createVNode("span", { class: "hidden lg:flex lg:items-center" }, [
                    createVNode("span", {
                      class: "ml-4 text-sm font-semibold leading-6 text-gray-900",
                      "aria-hidden": "true"
                    }, toDisplayString(unref(user).name), 1)
                  ])
                ]),
                _: 1
              }),
              createVNode(Transition, {
                "enter-active-class": "transition ease-out duration-100",
                "enter-from-class": "transform opacity-0 scale-95",
                "enter-to-class": "transform opacity-100 scale-100",
                "leave-active-class": "transition ease-in duration-75",
                "leave-from-class": "transform opacity-100 scale-100",
                "leave-to-class": "transform opacity-0 scale-95"
              }, {
                default: withCtx(() => [
                  createVNode(unref(MenuItems), { class: "absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none" }, {
                    default: withCtx(() => [
                      createVNode(unref(MenuItem), null, {
                        default: withCtx(({ active }) => [
                          createVNode(unref(Link), {
                            href: _ctx.route("profile.edit"),
                            class: [active ? "bg-gray-50" : "", "block px-3 py-1 text-sm leading-6 text-gray-900"]
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Profile")
                            ]),
                            _: 1
                          }, 8, ["href", "class"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(MenuItem), null, {
                        default: withCtx(({ active }) => [
                          createVNode(unref(Link), {
                            href: _ctx.route("logout"),
                            method: "post",
                            as: "button",
                            class: [active ? "bg-gray-50" : "", "block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900"]
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sign out")
                            ]),
                            _: 1
                          }, 8, ["href", "class"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><main class="py-10"><div class="px-4 sm:px-6 lg:px-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
