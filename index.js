import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _regeneratorRuntime from "@babel/runtime/regenerator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var script = {
  props: {
    // The form name
    name: {
      type: String,
      required: true
    },
    // The form data
    form: {
      type: Object,
      required: true
    },
    // The endpoint to post to
    endpoint: {
      type: String,
      "default": function _default() {
        return process.env.NETLIFY_FORMS_ENDPOINT || '/';
      }
    }
  },
  data: function data() {
    return {
      submitting: false,
      submitted: false
    };
  },
  // Check for valid input config when dev-ing
  mounted: function mounted() {
    if (process.env.NODE_ENV !== 'production') {
      return setTimeout(this.validateInputs, 1000); // Wait for children to mount
    }
  },
  computed: {
    // Should fields be readonly
    readonly: function readonly() {
      return this.submitting || this.submitted;
    },
    // Combine form data with Netlify-specific fields
    formData: function formData() {
      return _objectSpread(_objectSpread({}, this.form), {}, {
        'form-name': this.name
      });
    }
  },
  methods: {
    // Check for named inputs for each form field like Netlify expects
    validateInputs: function validateInputs() {
      var key, ref, results;
      ref = this.form;
      results = [];

      for (key in ref) {
        ref[key];

        if (!this.$el.querySelector("[name='".concat(key, "']"))) {
          results.push(console.warn("Missing Netlify form field named: ".concat(key)));
        } else {
          results.push(void 0);
        }
      }

      return results;
    },
    // Submit to service
    onSubmit: function () {
      var _onSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.readonly) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                this.submitting = true;
                _context.prev = 3;
                _context.next = 6;
                return this.postToEndpoint();

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", this.submitting = false);

              case 11:
                this.submitting = false;
                return _context.abrupt("return", this.submitted = true);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 8]]);
      }));

      function onSubmit() {
        return _onSubmit.apply(this, arguments);
      }

      return onSubmit;
    }(),
    // Do the actual post
    postToEndpoint: function postToEndpoint() {
      return this.$axios({
        method: 'post',
        url: this.endpoint,
        data: new URLSearchParams(this.formData).toString(),
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}
/* script */


var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("form", {
    staticClass: "netlify-form",
    attrs: {
      "data-netlify": "data-netlify",
      name: _vm.name
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.onSubmit($event);
      }
    }
  }, [_vm._t("default", null, {
    readonly: _vm.readonly,
    submitting: _vm.submitting,
    submitted: _vm.submitted
  })], 2);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

export default __vue_component__;
