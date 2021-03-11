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
      default: function() {
        return process.env.NETLIFY_FORMS_ENDPOINT || '/';
      }
    }
  },
  data: function() {
    return {
      submitting: false,
      submitted: false
    };
  },
  // Check for valid input config when dev-ing
  mounted: function() {
    if (process.env.NODE_ENV !== 'production') {
      return setTimeout(this.validateInputs, 1000); // Wait for children to mount
    }
  },
  computed: {
    // Should fields be readonly
    readonly: function() {
      return this.submitting || this.submitted;
    },
    // Combine form data with Netlify-specific fields
    formData: function() {
      return {
        ...this.form,
        'form-name': this.name
      };
    }
  },
  methods: {
    // Check for named inputs for each form field like Netlify expects
    validateInputs: function() {
      var key, ref, results;
      ref = this.form;
      results = [];
      for (key in ref) {
        ref[key];
        if (!this.$el.querySelector(`[name='${key}']`)) {
          results.push(console.warn(`Missing Netlify form field named: ${key}`));
        } else {
          results.push(void 0);
        }
      }
      return results;
    },
    // Submit to service
    onSubmit: async function() {
      if (this.readonly) {
        return;
      }
      this.submitting = true;
      try {
        await this.postToEndpoint();
      } catch (error) {
        return this.submitting = false;
      }
      this.submitting = false;
      return this.submitted = true;
    },
    // Do the actual post
    postToEndpoint: function() {
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

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      staticClass: "netlify-form",
      attrs: { "data-netlify": "data-netlify", name: _vm.name },
      on: {
        submit: function($event) {
          $event.preventDefault();
          return _vm.onSubmit($event)
        }
      }
    },
    [
      _vm._t("default", null, {
        readonly: _vm.readonly,
        submitting: _vm.submitting,
        submitted: _vm.submitted
      })
    ],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;
